import React, {useContext, useState} from 'react'
import projectcontext from '../../projectcontext/projectContext';
import AdminSideBar from '../AdminSideBar';
import cancel from "../../Images/cancelorder.jpg";
import resolve from "../../Images/resolve.jfif";
import rejected from "../../Images/rejected.jfif";

function UserOrderStatus() {
    const context = useContext(projectcontext)
    const {Order_status_for_the_admin, updatedOrderStatus, Reject_user_orders_By_Admin, Update_user_orders_ForAdmin} = context
    const [credentials, setCredentials] = useState({
        reasonofrejection: "",
      });
    
      const { reasonofrejection } = credentials;
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
      };
  return (
    <>
       {/* <AdminNav /> */}
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
                Modal title
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
                  <label for="exampleFormControlTextarea1" class="form-label">
                    Enter Reason of Rejection
                  </label>
                  <textarea
                    class="form-control"
                    onChange={onChange}
                    id="reasonofrejection"
                    name="reasonofrejection"
                    rows="3"
                  ></textarea>
                </div>
                <div class="col-12">
                  <button
                    class="btn btn-primary"
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      Reject_user_orders_By_Admin(
                        localStorage.getItem("orderID"),
                        "reject",
                        localStorage.getItem("email"),
                        credentials.reasonofrejection
                      );
                    }}
                  >
                    Update Ticket
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-1">
          <AdminSideBar />
        </div>

        <div className="col-lg-11">
          <div className="your_cart">
            <h4 className="user_orders">User Orders</h4>
            <div className="container">
              <div className="row">
                {updatedOrderStatus &&
                  updatedOrderStatus.map((value) => {
                    return (
                      <>
                        <div className="col-lg-1"></div>
                        <div className="col-lg-10">
                          <div class="card total_user_order">
                            <div className="row">
                              <div className="col-lg-6">
                                <p className="user_email">{value.email}</p>
                              </div>

                              <div className="col-lg-6">
                                <p className="order_id">Order ID: {value.id}</p>
                              </div>
                              <div className="col-lg-2">
                                <img
                                  src={value.imageurl}
                                  class="card-img-top ordered_product_image"
                                  alt="..."
                                />
                              </div>
                              <div className="col-lg-5">
                                <div class="card-body">
                                  <h5 class="card-title">Product Details</h5>
                                  <p class="card-text">
                                    <ul>
                                      <li>Product name: {value.category}</li>
                                      <li>Brand: {value.brand}</li>
                                      <li>Price: {value.price}</li>
                                      <li>Quantity: {value.quantity}Q</li>
                                    </ul>
                                  </p>
                                </div>
                              </div>

                              <div className="col-lg-2">
                                <ul className="product_status">
                                  <li>Status: </li>
                                  <li>{value.status}</li>
                                </ul>
                              </div>

                              <div
                                className="col-lg-3 action_buttons"
                                id="action_button"
                              >
                                {value.status == "accept" ||
                                value.status == "pending" ? (
                                  <div
                                    className="action_buttons"
                                    id="action_button"
                                  >
                                    <button
                                      className=" btn btn-outline-primary accept_button"
                                      disabled
                                      onClick={() => {
                                        Update_user_orders_ForAdmin(
                                          value.id,
                                          "accept",
                                          localStorage.getItem("email")
                                        );
                                      }}
                                    >
                                      Accept
                                    </button>
                                    <button
                                      className="btn btn-outline-success accept_button"
                                      onClick={() => {
                                        Update_user_orders_ForAdmin(
                                          value.id,
                                          "deliver",
                                          localStorage.getItem("email")
                                        );
                                      }}
                                    >
                                      Deliver
                                    </button>
                                    <button
                                      className="btn btn-outline-danger accept_button"
                                      data-bs-toggle="modal"
                                      data-bs-target="#exampleModal"
                                      onClick={() => {
                                        localStorage.setItem(
                                          "orderID",
                                          value.id
                                        );
                                      }}
                                    >
                                      Reject
                                    </button>
                                  </div>
                                ) : (
                                  <div>
                                    {value.status == "cancel" ? (
                                      <img src={cancel} className="cancel" />
                                    ) : (
                                      <div></div>
                                    )}

                                    {value.status == "reject" ? (
                                      <img src={rejected} className="cancel" />
                                    ) : (
                                      <div></div>
                                    )}

                                    {value.status == "deliver" ? (
                                      <img src={resolve} className="cancel" />
                                    ) : (
                                      <div></div>
                                    )}
                                  </div>
                                )}

                                {value.status == "deliver" ||
                                value.status == "reject" ? (
                                  <div
                                    className="action_buttons d-none"
                                    id="action_button"
                                  >
                                    <button
                                      className="btn btn-outline-primary accept_button"
                                      disabled
                                      onClick={() => {
                                        Update_user_orders_ForAdmin(
                                          value.id,
                                          "accept",
                                          localStorage.getItem("email")
                                        );
                                      }}
                                    >
                                      Accept
                                    </button>
                                    <button
                                      className="btn btn-outline-success accept_button"
                                      onClick={() => {
                                        Update_user_orders_ForAdmin(
                                          value.id,
                                          "deliver",
                                          localStorage.getItem("email")
                                        );
                                      }}
                                      disabled
                                    >
                                      Deliver
                                    </button>
                                    <button
                                      className="btn btn-outline-danger accept_button"
                                      data-bs-toggle="modal"
                                      data-bs-target="#exampleModal"
                                      onClick={() => {
                                        localStorage.setItem(
                                          "orderID",
                                          value.id
                                        );
                                      }}
                                      disabled
                                    >
                                      Reject
                                    </button>
                                  </div>
                                ) : (
                                  <div></div>
                                )}
                              </div>
                              {value.status == "reject" ? (
                                <div
                                  className="action_buttons"
                                  id="action_button d-none"
                                >
                                  <div className="row">
                                    <div className="col-lg-6">
                                      <h6>Reason: {value.reasonofrejection}</h6>
                                    </div>

                                    <div className="col-lg-6">
                                      <h6 className="user_email">
                                        Action By: {value.actionby}
                                      </h6>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="row d-none">
                                  <div className="col-lg-6">
                                    <h6>Reason: {value.reasonofrejection}</h6>
                                  </div>

                                  <div className="col-lg-6">
                                    <h6 className="user_email">
                                      Action By: {value.actionby}
                                    </h6>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>{" "}
                        </div>

                        <div className="col-lg-1"></div>
                      </>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserOrderStatus
