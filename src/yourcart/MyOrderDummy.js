import React, { useContext, useEffect, useState } from "react";
import Navbar from "../genralComponent/Navbar";
import Footer from "../genralComponent/Footer";
import projectcontext from "../projectcontext/projectContext";
import cancel from "../Images/cancelorder.jpg";
import resolve from "../Images/resolve.jfif";
import rejected from "../Images/rejected.jfif";

function MyOrder() {
  const context = useContext(projectcontext);
  const {
    UserOrder_by_user_details,
    YourOrder,
    setYourOrder,
    Cancel_order_handler,
    confirm_login,
    // getCartItemsByEmail,
    getProductsThat_You_Buy,
    setyourOrderByUserdetails,
    yourOrderByUserdetails,
    reason_of_cancelThe_order,
  } = context;


  useEffect(() => {
    confirm_login()
  }, [])
  const [credentials, setCredentials] = useState({
    reasontocancel: "notappropiateProduct",
    detailreasontocancel: "",
  });

  const { reasontocancel, detailreasontocancel } = credentials;
  const [ProductbyEmail, setProductbyEmail] = useState([]);

  useEffect(() => {
    getProductsThat_You_Buy();
  }, []);


  const getCartItemsByEmail = async (email) => {
    const items = await YourOrder.filter((products) => {
      return products.email == email;
    });

    setProductbyEmail(items);
    return items;
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Fill the details:
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form class="row g-3">
                <div class="mb-3">
                  <label for="validationDefaultUsername" class="form-label">
                    Subjeact
                  </label>
                  <select
                    class="form-select"
                    name="reasontocancel"
                    id="reasontocancel"
                    onChange={onChange}
                    aria-label="Default select example"
                  >
                    <option value="notappropiateProduct">
                      Item is not appropiate
                    </option>
                    <option value="changeaddress">
                      Want to change the address
                    </option>
                    <option value="changecontaactnumber">
                      Want to change the contact number
                    </option>
                  </select>
                </div>
                <div class="mb-3">
                  <textarea
                    placeholder="Tell us more"
                    class="form-control"
                    onChange={onChange}
                    id="detailreasontocancel"
                    name="detailreasontocancel"
                    rows="3"
                  ></textarea>
                </div>
                <div class="col-12">
                  <button
                    class="btn btn-primary"
                    type="submit"
                    // Cancel_order_handler(value.id);

                    onClick={(e) => {
                      e.preventDefault();
                      reason_of_cancelThe_order(
                        localStorage.getItem("cancelOrderID"),
                        credentials.reasontocancel,
                        credentials.detailreasontocancel,
                        "cancel"
                      );
                    }}
                  >
                    Cancel Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Navbar />

      <div className="your_cart">
        <button
        className="btn btn-outline-warning"
          onClick={() => {
            getCartItemsByEmail(localStorage.getItem("email"));
          }}
        >
          Click for the order
        </button>
        <h4 className="user_orders">User Orders</h4>
        <div className="container">
          <div className="row">
            {ProductbyEmail &&
              ProductbyEmail.map((value) => {
                return (
                  <>
                    {/* <div className="col-lg-1"></div> */}
                    <div className="col-lg-11 col-md-12 col-sm-12 col-12">
                      <div class="card total_user_order">
                        <div className="row">
                          <div className="col-lg-4 col-xl-3 col-md-3 col-sm-12 col-12">
                            <img
                              src={value.imageurl}
                              class="img-fluid ordered_product_image"
                              alt="..."
                            />
                          </div>
                          <div className="col-xl-5 col-md-5 col-lg-5 col-sm-7 col-12">
                            <div class="card-body">
                              <p class="card-text">
                                <ul className="product_more_deails">
                                  <h5 class="card-title">Product Details</h5>
                                  <li>Product name: {value.productname}</li>
                                  <li>category: {value.category}</li>
                                  <li>Price: {value.price}</li>
                                  <li>Quantity: {value.quantity}Q</li>
                                  <li className="status">
                                    Status: {value.status}
                                  </li>
                                </ul>
                              </p>
                            </div>
                          </div>
               
                          <div
                            className="col-xl-4 col-md-4 col-lg-3 col-sm-5 col-12"
                            id="action_button"
                          >
                            {value.status == "pending" ? (
                              <button
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                onClick={(e) => {
                                  localStorage.setItem(
                                    "cancelOrderID",
                                    value.id
                                  );
                                }}
                                className="btn btn-outline-danger"
                              >
                                Cancel order
                              </button>
                            ) : (
                              <div></div>
                            )}

                            {value.status == "cancel" ? (
                              <img src={cancel} className="cancel img-fluid" />
                            ) : (
                              <div></div>
                            )}

                            {value.status == "reject" ? (
                              <img
                                src={rejected}
                                className="cancel img-fluid"
                              />
                            ) : (
                              <div></div>
                            )}

                            {value.status == "deliver" ? (
                              <img
                                src={resolve}
                                className="cancel  img-fluid"
                              />
                            ) : (
                              <div></div>
                            )}
                          </div>
                        </div>

                        {value.status != "reject" ? (
                          <div
                            className="col-xl-3 col-md-3 col-lg-3 col-sm-3 col-12 action_buttons"
                            id="action_button"
                          >
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                Cancel_order_handler(value.id);
                              }}
                              className="d-none btn btn-outline-danger"
                            >
                              Cancel order
                            </button>
                          </div>
                        ) : (
                          <div>
                            <div
                              className="action_buttons"
                              id="action_button d-none"
                            >
                              <hr />
                              <div className="row">
                                <div className="col-xl-6 col-md-6 col-lg-6 col-sm-4 col-12">
                                  <h6 className="reason">
                                    Reason: {value.reasonofrejection}
                                  </h6>
                                </div>

                                <div className="col-xl-6 col-md-6 col-lg-6 col-sm-12 col-12">
                                  <h6 className="user_email actionby">
                                    {value.status}ed by: {value.actionby}
                                  </h6>
                                </div>

                                <div className="col-xl-6 col-md-6 col-lg-6 col-sm-6 col-12"></div>
                                <div className="col-xl-6 col-md-6 col-lg-6 col-sm-6 col-12">
                                  <p className="satisfied">
                                    Are You Satisfied?{" "}
                                    <a
                                      href="/givefeedback"
                                      onClick={() => {
                                        localStorage.setItem(
                                          "feedbackformID",
                                          value.id
                                        );
                                      }}
                                    >
                                      Give feedback
                                    </a>{" "}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {value.status == "deliver" ? (
                          <div
                            className="action_buttons"
                            id="action_button d-none"
                          >
                            <hr />
                            <div className="row">
                              <div className="col-xl-6 col-md-6 col-lg-6 col-sm-6 col-12"></div>

                              <div className="col-xl-6 col-md-6 col-lg-6 col-sm-6 col-12">
                                <h6 className="user_email actionby">
                                  {value.status}ed by: {value.actionby}
                                </h6>
                              </div>

                              <div className="col-xl-6 col-md-6 col-lg-6 col-sm-6 col-12"></div>
                              <div className="col-xl-6 col-md-6 col-lg-6 col-sm-6 col-12">
                                <p className="satisfied">
                                  Are You Satisfied?{" "}
                                  <a
                                    href="/givefeedback"
                                    onClick={() => {
                                      localStorage.setItem(
                                        "feedbackformID",
                                        value.id
                                      );
                                    }}
                                  >
                                    Give feedback
                                  </a>{" "}
                                </p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div
                            className="col-xl-3 col-md-3 col-lg-3 col-sm-3 col-12 action_buttons"
                            id="action_button"
                          >
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                Cancel_order_handler(value.id);
                              }}
                              className="d-none btn btn-outline-danger"
                            >
                              Cancel order
                            </button>
                          </div>
                        )}
                      </div>{" "}
                    </div>

                    <div className="col-lg-1"></div>
                  </>
                );
              })}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default MyOrder;
