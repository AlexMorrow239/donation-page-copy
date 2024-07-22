import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

// import "./index.css";

export default function ProgressIndicator({ progressStep, setProgressStep }) {
  const navigate = useNavigate();

  const handleSetProgressStep = (progressStep, nextStep) => {
    if (Math.abs(Number(progressStep) - Number(nextStep)) === 1) {
      setProgressStep(nextStep);
      navigate(`/donate/${nextStep}`);
    } else if (Number(progressStep) > Number(nextStep)) {
      setProgressStep(nextStep);
      navigate(`/donate/${nextStep}`);
    }
  };
  if (progressStep === "1") {
    return (
      <div className="progress-indicator d-flex align-items-center justify-content-center my-3">
        <button
          className="step in-progress"
          onClick={() => {
            handleSetProgressStep(progressStep, "1");
          }}
        ></button>

        <div className="step-line"></div>
        <button
          className="step"
          onClick={() => {
            handleSetProgressStep(progressStep, "2");
          }}
        ></button>
        <div className="step-line"></div>
        <button
          className="step"
          onClick={() => {
            handleSetProgressStep(progressStep, "3");
          }}
        ></button>
      </div>
    );
  } else if (progressStep === "2") {
    return (
      <div className="progress-indicator d-flex align-items-center justify-content-center my-2">
        <div className="position-relative btn-container">
          <i
            className="fa fa-check-circle fa-lg text-inspire-green cursor-pointer"
            aria-hidden="true"
            onClick={() => {
              handleSetProgressStep(progressStep, "1");
            }}
          ></i>
        </div>
        <div className="step-line in-progress"></div>
        <button
          className="step in-progress"
          onClick={() => {
            handleSetProgressStep(progressStep, "2");
          }}
        ></button>
        <div className="step-line"></div>
        <button
          className="step"
          onClick={() => {
            handleSetProgressStep(progressStep, "3");
          }}
        ></button>
      </div>
    );
  } else if (progressStep === "3") {
    return (
      <div className="progress-indicator d-flex align-items-center justify-content-center my-2">
        <i
          className="fa fa-check-circle fa-lg text-inspire-green cursor-pointer"
          aria-hidden="true"
          onClick={() => {
            handleSetProgressStep(progressStep, "1");
          }}
        ></i>
        <div className="step-line completed"></div>
        <i
          className="fa fa-check-circle fa-lg text-inspire-green cursor-pointer"
          aria-hidden="true"
          onClick={() => {
            handleSetProgressStep(progressStep, "2");
          }}
        ></i>
        <div className="step-line in-progress"></div>
        <button
          className="step in-progress"
          onClick={() => {
            handleSetProgressStep(progressStep, "3");
          }}
        ></button>
      </div>
    );
  }
}

ProgressIndicator.propTypes = {
  progressStep: PropTypes.string.isRequired,
  setProgressStep: PropTypes.func.isRequired,
};
