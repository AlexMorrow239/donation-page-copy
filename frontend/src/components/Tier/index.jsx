import React from "react";
import PropTypes from "prop-types";

export default function Tier({
  title,
  description,
  src,
  amount,
  index,
  setBaseDonationAmount,
  setSelectedButton,
  donationBoxRef,
}) {
  const handleClick = (e) => {
    e.preventDefault();
    updatePayment(index);
    if (donationBoxRef && donationBoxRef.current) {
      donationBoxRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const updatePayment = (index) => {
    switch (index) {
      case "1":
        setBaseDonationAmount(5);
        setSelectedButton("");
        return;
      case "2":
        setSelectedButton("");
        setBaseDonationAmount(25);
        return;
      case "3":
        setSelectedButton("");
        setBaseDonationAmount(125);
        return;
      case "4":
        setSelectedButton("");
        setBaseDonationAmount(2500);
        return;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="tierBlock">
            <img width="340" height="340" src={src} alt="donate option"></img>
            {/* Title of the Option */}
            <div className="titleblock">
              <h4> {title} </h4>
              <p className="text-soapboxgrey"> {description} </p>
              <button
                id="tierButton"
                className="btn btn-outline-success"
                onClick={handleClick}
              >
                Donate ${amount}
              </button>
            </div>
      </div>
    </>
  );
}

Tier.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};
