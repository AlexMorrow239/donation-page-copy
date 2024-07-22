import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import data from "../../assets/currencies.json";
import CurrencyDropdown from "../CurrencyDropdown";
import exchangeRatesService from "../../services/exchangeRatesService";
import Loading from "../Loading";

export default function DonateAmtCard({
  setProgressStep,
  setBaseDonationAmount,
  baseDonationAmount,
  selectedButton,
  setSelectedButton,
  donationAmount,
  setDonationAmount,
}) {
  const navigate = useNavigate();
  const customAmountRef = useRef(null);

  const [selectedCurrency, setSelectedCurrency] = useState("EUR");
  const [amounts, setAmounts] = useState([50, 250, 500]);
  const [exchangeRates, setExchangeRates] = useState(null);
  const [tipEnabled, setTipEnabled] = useState(false);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await exchangeRatesService.updateExchangeRates();
        setExchangeRates(response.data.rates);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };
    fetchExchangeRates();
  }, []);

  useEffect(() => {
    setTipEnabled(false);
    setDonationAmount(baseDonationAmount);
    if (exchangeRates) {
      const baseAmounts = [50, 250, 500];
      const convertedAmounts = baseAmounts.map((amount) =>
        Math.round(amount * (exchangeRates[selectedCurrency] || 1))
      );
      setAmounts(convertedAmounts);
      switch (selectedButton) {
        case "donate-amt1":
          setBaseDonationAmount(convertedAmounts[0]);
          break;
        case "donate-amt2":
          setBaseDonationAmount(convertedAmounts[1]);
          break;
        case "donate-amt3":
          setBaseDonationAmount(convertedAmounts[2]);
          break;
        case "":
          customAmountRef.current.value = baseDonationAmount;
          break;
        default:
          setBaseDonationAmount(convertedAmounts[0]);
          break;
      }
    }
  }, [selectedCurrency, exchangeRates]);

  useEffect(() => {
    if (tipEnabled) {
      const totalAmount = baseDonationAmount * 1.01;
      setDonationAmount(totalAmount.toFixed(2));
    } else {
      setDonationAmount(baseDonationAmount);
    }
  }, [tipEnabled, baseDonationAmount]);

  useEffect(() => {
    if (customAmountRef.current && selectedButton === "") {
      customAmountRef.current.value = baseDonationAmount;
    } else if (customAmountRef.current) {
      customAmountRef.current.value = "";
    }
  }, [selectedButton]);

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
  };

  const onAmountChange = (e) => {
    const { id, value } = e.target;
    setTipEnabled(false);
    if (id === "donate-amt-custom") {
      setSelectedButton("");
      setBaseDonationAmount(parseFloat(value) || 0);
    } else {
      setSelectedButton(id);
      const newAmount =
        amounts[["donate-amt1", "donate-amt2", "donate-amt3"].indexOf(id)];
      setBaseDonationAmount(newAmount);
    }
    setDonationAmount(baseDonationAmount.toFixed(2));
  };

  const handleTipToggle = () => {
    setTipEnabled((prevTipEnabled) => !prevTipEnabled);
  };

  const convertToZar = () => {
    const euroAmount = donationAmount / (exchangeRates[selectedCurrency] || 1);
    return euroAmount * (exchangeRates["ZAR"] || 1);
  };

  const handleSubmission = (e) => {
    e.preventDefault();
    const zarAmount = convertToZar();
    setDonationAmount(zarAmount.toFixed(2));
    setProgressStep("2");
    navigate("/donate/2");
  };

  if (!exchangeRates) {
    return <Loading />;
  }

  return (
    <>
      <div
        className="btn-group my-1"
        role="group"
        aria-label="Basic radio toggle button group"
      >
        {["donate-amt1", "donate-amt2", "donate-amt3"].map((id, index) => (
          <div className="mx-1" key={id}>
            <input
              type="radio"
              className="btn-check"
              hidden
              name="btnradio"
              id={id}
              autoComplete="off"
              checked={selectedButton === id}
              onChange={onAmountChange}
            />
            <label
              className="btn btn-outline-inspire-green"
              htmlFor={id}
              id={id}
            >
              {amounts[index]}{" "}
              {data[selectedCurrency].symbol_native ||
                data[selectedCurrency].symbol ||
                selectedCurrency}
            </label>
          </div>
        ))}
      </div>
      <div className="d-flex my-3">
        <CurrencyDropdown onChange={handleCurrencyChange} />
        <input
          type="number"
          pattern="\d*"
          title="Only numbers allowed in this field"
          className="form-control ms-2 no-arrows"
          id="donate-amt-custom"
          placeholder="Custom Amount"
          min="0"
          ref={customAmountRef}
          style={{ margin: "0" }}
          onChange={onAmountChange}
        />
      </div>

      <div className="card-text my-3">
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="messageSwitch"
            checked={tipEnabled}
            onChange={handleTipToggle}
          />
          <label
            className="form-check-label mx-1 text-muted"
            htmlFor="messageSwitch"
          >
            Add a 1% tip to your donation to cover transaction fees
          </label>
        </div>
        <div className="text-center mt-4">
          <button
            className="btn btn-inspire-green fw-bold"
            id="donate-btn"
            onClick={handleSubmission}
          >
            DONATE YOUR TREASURE
          </button>
        </div>
        <div className="text-center mt-4">
          <span className="text-muted">
            You are donating {donationAmount} in {selectedCurrency} which is
            equivalent to {convertToZar().toFixed(2)} in South African Rands
          </span>
        </div>
      </div>
    </>
  );
}
