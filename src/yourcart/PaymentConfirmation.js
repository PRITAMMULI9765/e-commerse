import React, { useContext, useState } from "react";
import projectcontext from "../projectcontext/projectContext";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ToastContainer, toast } from "react-toastify";

function PaymentConfirmation() {
  const [paymentDetails, setPaymentDetails] = useState({
    cardnumber: "",
    nameoncard: "",
    country: "india",
    expirydate: "",
    CVV: "",
  });

  const cardnumber1 = document.getElementById("cardnumber");
  const nameoncard1 = document.getElementById("nameoncard");
  const country1 = document.getElementById("country");
  const expirydate1 = document.getElementById("expirydate");
  const CVV1 = document.getElementById("CVV");

  const validation = (input) => {
    console.log(input);
    let clear = 0;
    if (input.length == 0) {
      alert("all fields are important");
    } else {
      clear = 1;
    }

    return clear;
  };
  const { cardnumber, nameoncard, country, expirydate, CVV } = paymentDetails;
  console.log(paymentDetails.cardnumber.length);
  const navigate = useNavigate();
  const context = useContext(projectcontext);
  const { deliveryProducts, Buy_the_product } = context;
  const handle = async () => {
    let btn = document.querySelector(".button");
    let spinnerIcon = document.querySelector(".spinner");
    let btnTxt = document.querySelector(".btn-text");

    btn.classList.add("checked");
    spinnerIcon.classList.add("spin");
    btnTxt.textContent = "loading";

    setTimeout(() => {
      spinnerIcon.classList.replace("spinner", "check");
      spinnerIcon.classList.replace("fa-spinner", "fa-check");
      btnTxt.textContent = "done";
    }, 5000);
  };

  const onChange = (e) => {
    setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container">
    <button className="btn btn-outline-primary back_to_home" onClick={() => {
      navigate("/")
    }}> <ArrowBackIcon />Back to Home</button>
        <form>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12 payment_details">
              <h3>Enter your payment details</h3>
              <div class="mb-3">
                <span className="required"></span>
                <input
                  type="text"
                  placeholder="Card number"
                  class="form-control"
                  id="cardnumber"
                  required
                  name="cardnumber"
                  onChange={onChange}
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="mb-3">
                <span className="required"></span>

                <input
                  type="text"
                  required
                  placeholder="name on Card"
                  onChange={onChange}
                  class="form-control"
                  id="nameoncard"
                  name="nameoncard"
                />
              </div>

              <div class="mb-3">
                <span className="required"></span>

                <select
                  class="form-select"
                  onChange={onChange}
                  name="country"
                  required
                  id="country"
                  aria-label="Default select example"
                >
                  <option selected value="india">
                    India
                  </option>
                  <option value="US">United State</option>
                </select>
              </div>

              <div className="row CVV">
                <div className="col-lg-6">
                  <span className="required"></span>

                  <input
                    type="date"
                    placeholder="MM/YY"
                    class="form-control"
                    required
                    onChange={onChange}
                    id="expirydate"
                    name="expirydate"
                  />
                </div>

                <div className="col-lg-6">
                  <span className="required"></span>

                  <input
                    type="text"
                    placeholder="CVV"
                    class="form-control"
                    required
                    name="CVV"
                    id="CVV"
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
            <div className="col-lg-4 col-md-5 col-sm-12 col-12 order_details">
              <h5>Orders Details</h5>

              <div className="row">
                {deliveryProducts &&
                  deliveryProducts.map((productsToDeliver) => {
                    console.log(productsToDeliver)
                    return (
                      <>
                        <div className="col-lg-12">
                          <div class="card producttoDeliver">
                            <img
                              src={productsToDeliver.imageUrl}
                              class="card-img-top producttoDeliver_image"
                              alt="..."
                            />
                          </div>
                        </div>{" "}
                        <div className="col-lg-1"></div>
                        <div className="col-lg-8">
                          <b>User Email:</b> {localStorage.getItem("email")}{" "}
                          <br />
                          <b>Product Name:</b> {productsToDeliver.productname}{" "}
                          <br />
                          <b>Quantity: </b> {productsToDeliver.quantity} <br />
                          <b>Price: </b> {productsToDeliver.price}
                        </div>
                        <button
                          className="button"
                          id="confirm_button"
                          imageurl
                          onClick={(e) => {
                            e.preventDefault();
                            // handle();
                            let today = new Date();
                            let inputDate = new Date(paymentDetails.expirydate);
                            let confirm_button =
                              document.getElementById("confirm_button");
                            if (paymentDetails.cardnumber.length < 16) {
                              confirm_button.classList.add("fail");
                              toast.error(`Card number should be at least 16 digits`, {
                                position: "top-center",
                                theme: "colored",
                              });
                      
                              return;
                            } else if (
                              inputDate.getFullYear() <= today.getFullYear()
                            ) {
                              toast.error("Expiry date should be today or after today", {
                                position: "top-center",
                                theme: "colored",
                              });
                              alert(
                              );
                              return;
                            } else {
                              Buy_the_product(
                                localStorage.getItem("email"),
                                productsToDeliver.price,
                                productsToDeliver.category,
                                productsToDeliver.id,
                                productsToDeliver.productname,
                                productsToDeliver.quantity,
                                productsToDeliver.reasonofrejection,
                                productsToDeliver.status,
                                productsToDeliver.actionby,
                                productsToDeliver.imageUrl,
                                paymentDetails.cardnumber,
                                paymentDetails.nameoncard,
                                paymentDetails.expirydate,
                                paymentDetails.CVV,
                                paymentDetails.country
                              );
                            }
                          }}
                        >
                          <i
                            class="fa fa-spinner icon spinner"
                            aria-hidden="true"
                          ></i>
                          <span className="btn-text">Confirm Order</span>
                        </button>
                      </>
                    );
                  })}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
  <ToastContainer />
}

export default PaymentConfirmation;
