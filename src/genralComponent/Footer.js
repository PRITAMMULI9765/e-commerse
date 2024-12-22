import React from "react";

function Footer() {
  return (
    <>
      <div className="footer">
        <div className="row">
          <div className="col-lg-3">
            <ul>
            <h5>Info</h5>
              <li> Deliveries</li>
              <li>Return Policy</li>
              <li>Privacy Policy</li>
              <li>Shipping Policy </li>
              <li>Terms of Service</li>
            </ul>
          </div>

          <div className="col-lg-1"></div>
          <div className="col-lg-3">
            <ul>
            <h5>Menu</h5>
              <li>Electronics</li>
              <li>Perfumes</li>
              <li>Smart Phones</li>
              <li>Terms of Service</li>
            </ul>
          </div>

          <div className="col-lg-1"></div>
          <div className="col-lg-3">
            <ul>
            <h5>Contact</h5>
              <li>About</li>
              <li>Contact</li>
              <li>Tickets</li>
              <li>Feedback</li>
            </ul>
          </div>

        </div>
      </div>
    </>
  );
}

export default Footer;
