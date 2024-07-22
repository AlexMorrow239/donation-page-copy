import React, { useState, useEffect } from "react";
import MessageList from "../MessageList";

import paymentsService from "../../services/paymentsService";

export default function BoxMessages({ isMessageUpdated, setIsMessageUpdated }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchPmts = async () => {
      try {
        const payments = await paymentsService.fetchPayments();
        setMessages(payments);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPmts();
    setIsMessageUpdated(false);
  }, [isMessageUpdated]);

  return (
    <div className="container-fluid mb-5">
      {/* Title */}
      <div className="row titleblock">
        <h3>latest</h3>
        <h1 className="text-soapboxblue">Donations!</h1>
      </div>

      <div className="row">
        <div className="col-lg-4 ps-0">
          {/* Picture */}
          <img
            id="YangaImg"
            src="../assets/yangaBottle.png"
            alt="Yanga with Glass Bottle"
            width="100%"
          ></img>
        </div>

        <div className="col-lg-8 ">
          {/* Messages */}
          <MessageList messages={messages} />
        </div>
      </div>
    </div>
  );
}
