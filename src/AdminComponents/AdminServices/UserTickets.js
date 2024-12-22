import React, { useContext, useEffect, useState } from "react";
import projectcontext from "../../projectcontext/projectContext";
import AdminNav from "../AdminNav";
import pending from "../../Images/pending.jfif";
import resolve from "../../Images/resolve.jfif";
import AdminSideBar from "../AdminSideBar";

function UserTickets() {
  const context = useContext(projectcontext);
  const { raisedticket, checkAuthority, getRaisedTicket, Give_the_solution_by_admin } = context;

  const [credentials, setCredentials] = useState({
    reasonofissue: "",
    solutionofissue: "",
  });

  const { reasonofissue, solutionofissue } = credentials;

  useEffect(() => {
    checkAuthority()
    getRaisedTicket();
  }, []);

  const onChange = (e) => {
    e.preventDefault();
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
                Giver the Reason
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
                    Enter Reason of issue
                  </label>
                  <textarea
                    class="form-control"
                    onChange={onChange}
                    id="reasonofissue"
                    placeholder="Give reason"
                    name="reasonofissue"
                    rows="3"
                  ></textarea>
                </div>

                <div class="mb-3">
                  <label for="exampleFormControlTextarea1" class="form-label">
                    Enter Solution of issue
                  </label>
                  <textarea
                    class="form-control"
                    placeholder="Give solution"
                    onChange={onChange}
                    id="solutionofissue"
                    name="solutionofissue"
                    rows="3"
                  ></textarea>
                </div>
                <div class="col-12">
                  <button
                    class="btn btn-primary"
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      Give_the_solution_by_admin(
                        localStorage.getItem("ticketID"),
                        "resolve",
                        localStorage.getItem("email"),
                        credentials.reasonofissue,
                        credentials.solutionofissue
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
            <h4 className="user_orders">User Tickets</h4>
            <div className="container">
              <div className="row">
                {raisedticket &&
                  raisedticket.map((value) => {
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

                              {value.status == "resolve" ? (
                                <div className="col-lg-2">
                                  <img
                                    src={resolve}
                                    class="card-img-top raised_ticket_image"
                                    alt="..."
                                  />
                                </div>
                              ) : (
                                <div className="col-lg-2">
                                  <img
                                    src={pending}
                                    class="card-img-top raised_ticket_image"
                                    alt="..."
                                  />
                                </div>
                              )}

                              <div className="col-lg-5">
                                <div class="card-body">
                                  <h5 class="card-title">Ticket Details</h5>
                                  <p class="card-text">
                                    <ul>
                                      <li>Name: {value.name}</li>
                                      <li>Subject: {value.concern}</li>
                                      <li>Message: {value.subject}</li>
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
                              {value.status != "resolve" ? (
                                <div className="col-lg-3">
                                  <button
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                    className="btn btn-outline-danger resolve_button"
                                    onClick={() => {
                                      localStorage.setItem(
                                        "ticketID",
                                        value.id
                                      );
                                    }}
                                  >
                                    Resolve
                                  </button>
                                </div>
                              ) : (
                                <div
                                  className="action_buttons"
                                  id="action_button d-none"
                                >
                                  <hr />
                                  <div className="row">
                                    <div className="col-lg-6">
                                      <h6 className="reason">
                                        Reason: {value.reasonofissue}
                                      </h6>
                                      <h6 className="solution">
                                        Solution: {value.solution}
                                      </h6>
                                    </div>

                                    <div className="col-lg-6">
                                      <h6 className="user_email">
                                        Resolve By: {value.actionby}
                                      </h6>
                                    </div>
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
  );
}

export default UserTickets;
