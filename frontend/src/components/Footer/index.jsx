import React from "react";
import MailchimpForm from "../MailChimpForm";

// import './index.css';

export default function Footer() {
  return (
    <footer >
      <div className="container-fluid bg-footerblack">
        <div className="container text-white pt-5 pb-5" >
          <div className="row">
            <div className="col-6 col-md-3 mb-3 addressblock">
              <h5 className="text-soapboxblue text-uppercase mb-3">
                ADDRESS CAPE TOWN
              </h5>
              <p>UP Workspace</p>
              <p>14 Upper Pepper Street</p>
              <p>8000 Cape Town</p>
              <p>South Africa</p>
            </div>
            <div className="col-6 col-md-3 mb-3 addressblock">
              <h5 className="text-soapboxblue text-uppercase mb-3">
                ADDRESS AMSTERDAM
              </h5>
              <p>Johannes Verhulststraat 143</p>
              <p>1071 NB Amsterdam</p>
              <p>The Netherlands</p>
            </div>
            <div className="col-6 col-md-3 mb-3 addressblock">
              <h5 className="text-soapboxblue mb-3">CONTACT</h5>
              <p>
                <i className="fas fa-phone fa-fw"></i> +27 72 3529 806
              </p>
              <p>
                <i className="fas fa-envelope fa-fw"></i>{" "}
                <a
                  href="mailto:info@captainfanplastic.com"
                  className="text-white"
                >
                  info@captainfanplastic.com
                </a>
              </p>
              <div className="social_icons mt-3 d-flex justify-content-start">
                <a href="https://www.facebook.com/captainfanplastic/">
                  <i className="fab fa-facebook-f mr-2 mx-1"></i>
                </a>
                <a href="https://www.instagram.com/captain_fanplastic/">
                  <i className="fab fa-instagram mr-2 mx-1"></i>
                </a>
                <a href="https://www.youtube.com/watch?v=-2wxqiuACT4&list=PL-owOFrmpNeLUZKSP1u0G8DG7UTxoC-SX">
                  <i className="fab fa-youtube mr-2 mx-1"></i>
                </a>
              </div>
            </div>
            <div className="col-3 addressblock">
              <h5 className="text-soapboxblue mb-3">Sign up for newsletter</h5>
              <MailchimpForm />
            </div>
          </div>
          <div className="row">
            <div className="col addressblock">
              <p>
                <span style={{ color: "#096378" }}>Soapbox Foundation</span>
                <br />
                <span>NPC Registration number:</span> 2022 / 851501 / 08{" "}
                <span>PBO number:</span> 930080113
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mb-3" >
      {/* <div className="container pb-4"> */}
        <div id="copyrightline" className="container-fluid mt-3">
          Copyright Soapbox bv 2019, All Rights Reserved
        </div>
      </div>
    </footer>
  );
}
