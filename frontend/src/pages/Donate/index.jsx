import React, { useState, useRef } from "react";

import "./index.css";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Progressbar from "../../components/Progressbar";
import DonationBox from "../../components/DonationBox";
import Slider from "../../components/Swiper";
import BoxMessages from "../../components/BoxMessages";

export default function DonatePage() {
  const donationBoxRef = useRef(null);

  const [baseDonationAmount, setBaseDonationAmount] = useState(50);
  const [selectedButton, setSelectedButton] = useState("donate-amt1");
  const [isMessageUpdated, setIsMessageUpdated] = useState(false);

  return (
    <>
        <Navbar />
        <Header />
        {/* location of title and description of page */}
        <div className="container-fluid intro-row my-5 text-left">
          <div className="titleblock">
            <h3>donate and</h3>
            <h1 className="text-soapboxblue">Join our crew!</h1>
            <p>
              Help us steer our ship to new horizons in South Africa, so that we
              connect children to their environment, help them fight plastic
              pollution and enable them to manage waste. Every time we get to{" "}
              <b>$2,500</b>, we’ll hoist our pirate flag at a new school.
            </p>

            {/* pirate ship progress report */}
            <Progressbar />
          </div>

          <div ref={donationBoxRef} className="donate-box align-items-center ps-5">
            <DonationBox
              baseDonationAmount={baseDonationAmount}
              setBaseDonationAmount={setBaseDonationAmount}
              selectedButton={selectedButton}
              setSelectedButton={setSelectedButton}
              setIsMessageUpdated={setIsMessageUpdated}
            />
          </div>
        </div>

        {/* The tiers section suing SliderJs */}
        <Slider
          setBaseDonationAmount={setBaseDonationAmount}
          setSelectedButton={setSelectedButton}
          donationBoxRef={donationBoxRef}
        />

        {/* the messages in a bottle */}
        <BoxMessages
          isMessageUpdated={isMessageUpdated}
          setIsMessageUpdated={setIsMessageUpdated}
        />
        <Footer />
    </>
  );
}
