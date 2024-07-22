import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// import "./index.css";
import ProgressIndicator from "../ProgressIndicator";
import DonateAmtCard from "../DonateAmtCard";
import PaymentInfoCard from "../PaymentInfoCard";
import MessageCard from "../MessageCard";

export default function DonationBox({
  baseDonationAmount,
  setBaseDonationAmount,
  selectedButton,
  setSelectedButton,
  setIsMessageUpdated,
}) {
  const { step } = useParams(); // Used to control page direction via url for payfast return and cancel urls
  const [progressStep, setProgressStep] = useState("1");
  const [cardTitle, setCardTitle] = useState("Sponsor A Pirate!");
  const [donationMethod, setDonationMethod] = useState("credit card");
  const [userEmail, setUserEmail] = useState("");
  const [donationAmount, setDonationAmount] = useState(baseDonationAmount);

  // Set the progress step based on the url parameter
  useEffect(() => {
    if (step) {
      setProgressStep(step);
    }
  }, [step]);

  // Set the card title based on the progress step
  useEffect(() => {
    if (progressStep === "1") {
      setBaseDonationAmount(50);
    }
    switch (progressStep) {
      case "1":
        setCardTitle("Sponsor A Pirate!");
        break;
      case "2":
        setCardTitle("Payment Information");
        break;
      case "3":
        setCardTitle("Your Donation Has Been Sent!");
        break;
      default:
        setCardTitle("Sponsor A Pirate!");
    }
  }, [progressStep]);

  return (
    <div
      className="card bg-grey-trans mb-3 align-items-center donate-card"
      id="donate-card"
    >
      <ProgressIndicator
        progressStep={progressStep}
        setProgressStep={setProgressStep}
      />

      <div className="card-body d-flex flex-column align-items-center w-90">
        <h5 className="card-title text-center mb-2">{cardTitle}</h5>

        {progressStep === "1" && (
          <DonateAmtCard
            setProgressStep={setProgressStep}
            setBaseDonationAmount={setBaseDonationAmount}
            baseDonationAmount={baseDonationAmount}
            selectedButton={selectedButton}
            setSelectedButton={setSelectedButton}
            donationAmount={donationAmount}
            setDonationAmount={setDonationAmount}
          />
        )}
        {progressStep === "2" && (
          <PaymentInfoCard
            setProgressStep={setProgressStep}
            donationAmount={donationAmount}
            userEmail={userEmail}
            setUserEmail={setUserEmail}
          />
        )}
        {progressStep === "3" && (
          <MessageCard
            donationMethod={donationMethod}
            setProgressStep={setProgressStep}
            setIsMessageUpdated={setIsMessageUpdated}
          />
        )}
      </div>
    </div>
  );
}
