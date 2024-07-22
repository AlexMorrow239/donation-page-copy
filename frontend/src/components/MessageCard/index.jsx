import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import PaymentsService from "../../services/paymentsService";

export default function MessageCard({
  donationMethod,
  setProgressStep,
  setIsMessageUpdated,
}) {
  const navigate = useNavigate();
  const anonymousSwitchRef = useRef(null);
  const email = localStorage.getItem("email");

  const [hasMessage, setHasMessage] = useState(false);
  const [userMessage, setUserMessage] = useState("");

  useEffect(() => {
    if (!email) {
      setProgressStep("1");
      navigate("/donate/1");
    }
  }, [email, navigate, setProgressStep]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userMessage.trim() === "" && hasMessage) {
      alert("Message cannot be empty.");
    } else if (hasMessage) {
      try {
        const updatedPayment = {
          email: email,
          method: donationMethod,
          message: userMessage,
          anonymous: anonymousSwitchRef.current.checked,
        };
        const response = await PaymentsService.updatePayment(updatedPayment);
        localStorage.removeItem("email");
        setIsMessageUpdated(true);
        alert("Success!");
        setTimeout(() => {
          navigate("/donate/1");
        }, 1000);
      } catch (error) {
        console.error("Failed to update payment:", error);
        alert(
          "An error occurred while updating your message. Please try again."
        );
      }
    } else {
      alert("Thank you for Donating!");
      setTimeout(() => {
        navigate("/donate/1");
      }, 2000);
    }
  };

  return (
    <>
      <p className="card-text text-center">
        Your donation has been received! Thank you for supporting our plastic
        pirates! Would you like to leave a personalized message for the crew?
      </p>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="mb-3">
          <textarea
            className="form-control"
            id="message"
            rows="3"
            placeholder="Write your message here!"
            maxLength="200"
            style={{ resize: "none" }}
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
          ></textarea>
        </div>
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="anonymousSwitch"
            ref={anonymousSwitchRef}
          />
          <label class="form-check-label mx-1" for="anonymousSwitch">
            Make message anonymous
          </label>
        </div>
        <div className="d-flex justify-content-evenly mt-4">
          <button
            type="submit"
            className="btn btn-inspire-green btn-sm w-40"
            onClick={() => {
              setHasMessage(true);
            }}
          >
            SUBMIT MESSAGE
          </button>
          <button className="btn btn-inspire-green w-40 btn-sm" type="submit">
            NO THANKS
          </button>
        </div>
      </form>
    </>
  );
}
