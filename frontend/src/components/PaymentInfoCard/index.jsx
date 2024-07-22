import React, { useState, useRef } from "react";

export default function PaymentInfoCard({
  donationAmount,
  userEmail,
  setUserEmail,
}) {
  const payfastButtonRef = useRef(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userCountry, setUserCountry] = useState("");
  const [userState, setUserState] = useState("");
  const [userZip, setUserZip] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!firstName) newErrors.firstName = "First name is required";
    if (!lastName) newErrors.lastName = "Last name is required";
    if (!userEmail) newErrors.userEmail = "Email address is required";
    if (!userPhone) newErrors.userPhone = "Phone number is required";
    if (!userAddress) newErrors.userAddress = "Address is required";
    if (!userCountry) newErrors.userCountry = "Country is required";
    if (!userState) newErrors.userState = "State/Province is required";
    if (!userZip) newErrors.userZip = "Zip Code is required";

    return newErrors;
  };

  const handleSubmission = (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});
      if (payfastButtonRef.current) {
        localStorage.setItem("email", userEmail);
        payfastButtonRef.current.click();
        setTimeout(() => {
          alert("Redirecting to secure payment page...");
        }, 1);
      }
    }
  };

  return (
    <div className="payment">
      <form
        name="PayFastPayNowForm"
        action="https://payment.payfast.io/eng/process"
        method="post"
      >
        <input type="hidden" name="cmd" value="_paynow" />
        <input type="hidden" name="receiver" pattern="[0-9]" value="24730296" />
        <input
          type="hidden"
          name="return_url"
          value="http://localhost:3000/donate/3"
        />
        <input
          type="hidden"
          name="cancel_url"
          value="http://localhost:3000/donate/1"
        />
        <input
          type="hidden"
          name="notify_url"
          value="https://cb49-102-36-15-130.ngrok-free.app/api/payfast/itn"
        />

        {/* Custom input fields for additional user info */}
        <div className="input-group mb-1 payment-info-group">
          <div className="d-flex flex-column payment-input">
            <input
              placeholder="First Name"
              className="form-control"
              type="text"
              name="name_first"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {errors.firstName && (
              <span className="error">{errors.firstName}</span>
            )}
          </div>
          <div className="d-flex flex-column payment-input">
            <input
              placeholder="Last Name"
              className="form-control"
              type="text"
              name="name_last"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {errors.lastName && (
              <span className="error">{errors.lastName}</span>
            )}
          </div>
        </div>
        <div className="input-group payment-info-group">
          <div className="d-flex flex-column payment-input">
            <input
              placeholder="Email Address"
              className="form-control"
              type="email"
              name="email_address"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            {errors.userEmail && (
              <span className="error">{errors.userEmail}</span>
            )}
          </div>
          <div className="d-flex flex-column payment-input">
            <input
              placeholder="Phone Number"
              className="form-control"
              type="tel"
              name="custom_int1"
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
            />
            {errors.userPhone && (
              <span className="error">{errors.userPhone}</span>
            )}
          </div>
        </div>
        <div className="input-group payment-info-single">
          <div className="d-flex flex-column payment-input">
            <input
              placeholder="Address"
              className="form-control"
              type="text"
              name="custom_str1"
              value={userAddress}
              onChange={(e) => setUserAddress(e.target.value)}
            />
            {errors.userAddress && (
              <span className="error">{errors.userAddress}</span>
            )}
          </div>
        </div>
        <div className="input-group payment-info-group">
          <div className="d-flex flex-column payment-input">
            <input
              placeholder="Country"
              className="form-control"
              type="text"
              name="custom_str2"
              value={userCountry}
              onChange={(e) => setUserCountry(e.target.value)}
            />
            {errors.userCountry && (
              <span className="error">{errors.userCountry}</span>
            )}
          </div>
          <div className="d-flex flex-column payment-input">
            <input
              placeholder="Zip Code"
              className="form-control no-arrows"
              type="number"
              name="custom_int2"
              value={userZip}
              onChange={(e) => setUserZip(e.target.value)}
            />
            {errors.userZip && <span className="error">{errors.userZip}</span>}
          </div>
        </div>
        <div className="input-group payment-info-single">
          <div className="d-flex flex-column payment-input">
            <input
              placeholder="State/Province"
              className="form-control"
              type="text"
              name="custom_str3"
              value={userState}
              onChange={(e) => setUserState(e.target.value)}
            />
            {errors.userState && (
              <span className="error">{errors.userState}</span>
            )}
          </div>
        </div>

        <input
          required
          id="PayFastAmount"
          type="number"
          step=".01"
          name="amount"
          min="5.00"
          placeholder="5.00"
          value={donationAmount}
          style={{ display: "none" }}
          readOnly
        />
        <input
          type="hidden"
          name="item_name"
          maxLength="255"
          value="Donation-btn"
          style={{ display: "none" }}
        />

        <input
          type="image"
          src="https://my.payfast.io/images/buttons/DonateNow/Dark-Large-DonateNow.png"
          alt="Donate Now"
          title="Donate Now with Payfast"
          ref={payfastButtonRef}
          style={{ display: "none" }}
        />

        <div className="text-center mt-4">
          <button
            type="submit"
            className="btn btn-inspire-green"
            id="donate-btn"
            onClick={handleSubmission}
          >
            SUBMIT DONATION
          </button>
        </div>
      </form>
    </div>
  );
}
