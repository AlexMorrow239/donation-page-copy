import React, { useEffect } from "react";
import { useState } from "react";

import goalService from "../../services/goalService";

export default function Progressbar() {
  const [currentDonations, setCurrentDonations] = useState(0);
  const [donationGoal, setDonationGoal] = useState(2500);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await goalService.fetchCurrentGoal();
        setCurrentDonations(response.data.currentTotal);
        setDonationGoal(response.data.goalAmount);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchGoals();
  }, []);

  if (currentDonations < 0) setCurrentDonations(0);
  if (currentDonations > 2500) setCurrentDonations(2500);

  let lineLength = 500; // Length of the dotted line in pixels
  let arrowLength =
    ((currentDonations === 0 ? 1 : currentDonations) / donationGoal) *
    lineLength;

  const arrowEnd = 10 + arrowLength;
  const arrowLineX2 = arrowLength > 0 ? arrowEnd : 270;
  const circleVisible = currentDonations > 0;

  return (
    <div className="mt-5">
      <div style={{ width: "100%" }}>
        <svg
          id="svg"
          width="100%"
          height="200"
          viewBox="2 0 620 35"
          xmlns="http://www.w3.org/2000/svg"
          // style={{border: "2px red solid"}}
        >
          <circle cx="10" cy="25" r="7" fill="black" />
          <line
            x1="10"
            y1="25"
            x2="580"
            y2="25"
            className="dotted-line"
            style={{
              strokeDasharray: "15, 10",
              stroke: "black",
              strokeWidth: 4,
            }}
          ></line>
          <line
            x1="10"
            y1="25"
            x2={arrowLineX2}
            y2="25"
            className="arrow-line"
            style={{ stroke: "black", strokeWidth: 4 }}
          ></line>
          <image
            x="420"
            y="-190"
            width="300"
            height="300"
            href={`${process.env.PUBLIC_URL}/treasure.svg`}
          />
          <image
            x={arrowEnd - 40}
            y="-80"
            width="140"
            height="140"
            href={`${process.env.PUBLIC_URL}/ship.svg`}
            clipPath="url(#clipCircle)"
          />
          <text x={arrowEnd - 5} y="80" style={{ fontSize: "large", fontWeight: "bold" }}>
            {currentDonations}
          </text>

          <text x="540" y="70" style={{ fontSize: "large", fontWeight: "bold" }}>
            {donationGoal}
          </text>
        </svg>
      </div>
    </div>
  );
}
