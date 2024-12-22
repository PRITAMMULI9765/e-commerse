import React, { useContext, useEffect, useState } from "react";
import Navbar from "../genralComponent/Navbar";
import projectcontext from "../projectcontext/projectContext";

function Complainent() {
  const context = useContext(projectcontext);
  const {
    getUserForShop,
    userforshop,
    complaint,
    Reais_ticket_from_here,
    confirm_login,
    onComplaint,
  } = context;

  const { fullname, email, contactnumber, yourcomplaint, suggestedsolution } =
    complaint;

  console.log(complaint);
  useEffect(() => {
    confirm_login();
  }, []);

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="row">
          <div className="col-lg-3"></div>
          <div className="col-lg-6">
            <form className="customer_complaint_form">
              <h2 className="text-center mb-3">Customer Complaint form</h2>
              <div className="complaint_form">
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Full name
                  </label>
                  <input
                    title="Disable"
                    type="text"
                    onChange={onComplaint}
                    name="fullname"
                    class="form-control customer_complaint_form_input"
                    id="fullname"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    title="disable"
                    name="email"
                    value={complaint.email}
                    class="form-control customer_complaint_form_input"
                    id="email"
                    aria-describedby="emailHelp"
                  />
                </div>
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Contact number
                </label>
                <input
                  type="text"
                  name="contactnumber"
                  onChange={onComplaint}
                  class="form-control customer_complaint_form_input"
                  id="contactnumber"
                  title="contatcnumber"
                />
              </div>

              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">
                  Your Complaint
                </label>
                <textarea
                  class="form-control customer_complaint_form_input"
                  id="yourcomplaint"
                  onChange={onComplaint}
                  name="yourcomplaint"
                  rows="3"
                ></textarea>
              </div>

              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">
                  Suggested solution
                </label>
                <textarea
                  class="form-control customer_complaint_form_input"
                  id="suggestedsolution"
                  onChange={onComplaint}
                  name="suggestedsolution"
                  rows="3"
                ></textarea>
              </div>

              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  Reais_ticket_from_here(
                    complaint.fullname,
                    complaint.email,
                    complaint.contactnumber,
                    complaint.yourcomplaint,
                    complaint.suggestedsolution
                  );
                }}
                class="btn btn-outline-primary"
              >
                Raised Complaint
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Complainent;
