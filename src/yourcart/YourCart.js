import React, { useContext, useEffect, useState } from "react";
import Navbar from "../genralComponent/Navbar";
import Footer from "../genralComponent/Footer";
import projectcontext from "../projectcontext/projectContext";
import cancel from "../Images/cancelorder.jpg";
import resolve from "../Images/resolve.jfif";
import rejected from "../Images/rejected.jfif";
import { useNavigate } from "react-router-dom";
import emptybasket from "../Images/empty-basket.png";
function YourCart() {
  const [productbyEmail, setProductbyEmail] = useState([]);
  const [credentials, setCredentials] = useState({
    reasonofrejection: "",
    actionby: "",
  });
  const context = useContext(projectcontext);
  const {
    handleclick,
    myProduct,
    confirm_login,
    setMyProduct,
    getProducts,
    product,
    setProduct,
    displayhello,
    deletehandler,
    UpdateContactDetails,
    handlePaymentChange,
    paymentdetails,
    setPaymentDetails,
    validatePaymentDetails,
    proceed_To_pay,
    ErrorInPayment,
    setErrorInPayment,
    getUserForShop,
    userforshop,
  } = context;
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [yourAddress, setYouraddress] = useState([]);

  const [contactdetails, setContactdetails] = useState({
    addressline1: "",
    addressline2: "",
    pincode: "",
    city: "",
    contactnumber: "",
  });

  const { addressline1, addressline2, pincode, city, contactnumber } =
    contactdetails;
  console.log(contactnumber);
  useEffect(() => {
    getUserForShop();
    confirm_login();
    getProducts();
    getCartItemsByEmail(localStorage.getItem("email"));
    handleclick();
  }, []);

  useEffect(() => {
    getYourAddress();
  }, []);
  console.log(userforshop);
  const { reasonofrejection, actionby } = credentials;

  const navigate = useNavigate();
  const handle_product_details = () => {
    navigate("/productdetails");
  };
  const nextImage = () => {
    if (currentImageIndex < myProduct.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const previousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // const bookCollectionRef = collection(db, "order");
  const getCartItemsByEmail = async (email) => {
    const items = await product.filter((products) => {
      return products.email == email;
    });

    setProductbyEmail(items);

    console.log("items", items);
    return items;
  };

  let totalBill = 0;
  let total = (sum) => {
    totalBill = totalBill + sum;
    return totalBill;
  };

  let platformFee = 30;
  let yourTotalBill = 0;
  const totalBillToPay = (totalBill, platformFee) => {
    yourTotalBill = totalBill + platformFee;
    return yourTotalBill;
  };

  useEffect(() => {
    const filtered = productbyEmail.filter(
      (product) =>
        //console.log(product)

        product.productname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.productid.toString().includes(searchQuery)
    );
    setFilteredProducts(filtered);
  }, [productbyEmail, searchQuery]);

  const getYourAddress = async () => {
    const yourAddress = await userforshop.filter((customer) => {
      console.log(customer);
      return customer.email == localStorage.getItem("email");
    });

    setYouraddress(yourAddress);
  };

  const forUpdateAddressInfo = (e) => {
    console.log(e.target.value);
    setContactdetails({ ...contactdetails, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Navbar />
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
                Update Info
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Address Line 1
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    onChange={forUpdateAddressInfo}
                    id="addressline1"
                    name="addressline1"
                    aria-describedby="emailHelp"
                  />
                </div>

                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Address Line 2
                  </label>
                  <input
                    type="email"
                    onChange={forUpdateAddressInfo}
                    class="form-control"
                    id="addressline2"
                    name="addressline2"
                    aria-describedby="emailHelp"
                  />
                </div>

                <div className="row">
                  <div className="col-lg-6">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">
                        City
                      </label>
                      <input
                        type="email"
                        class="form-control"
                        onChange={forUpdateAddressInfo}
                        id="city"
                        name="city"
                        aria-describedby="emailHelp"
                      />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Pincode
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="pincode"
                        name="pincode"
                        onChange={forUpdateAddressInfo}
                        aria-describedby="emailHelp"
                      />
                    </div>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">
                    Contact Number
                  </label>
                  <input
                    onChange={forUpdateAddressInfo}
                    type="number"
                    class="form-control"
                    id="contactnumber"
                    name="contactnumber"
                  />
                </div>

                <button
                  type="submit"
                  class="btn btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    UpdateContactDetails(
                      localStorage.getItem("docID"),
                      contactdetails.addressline1,
                      contactdetails.addressline2,
                      contactdetails.city,
                      contactdetails.pincode,
                      contactdetails.contactnumber
                    );
                  }}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="new_myOrder_background">
        <div className="row">
          <div className="col-lg-8">
            <div className="container pt-2">
              <form className="d-flex mb-2" role="search">
                <input
                  className="form-control search-input"
                  type="search"
                  placeholder="Typee title or ID"
                  aria-label="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
              <div className="new_deliver_address">
                <div>
                  {yourAddress.length == 0 ? (
                    <button
                    className="btn btn-outline-warning"
                      onClick={() => {
                        getYourAddress();
                      }}
                    >
                      Click for contact details
                    </button>
                  ) : (
                    yourAddress.map((value) => {
                      localStorage.setItem("docID", value.id);
                      return (
                        <>
                          Deliver To:{" "}
                          <span className="customer_name">
                            {value.fullname}
                          </span>{" "}
                          <br />{" "}
                          <p>
                            {value.addressline1}, {value.addressline2}
                          </p>{" "}
                          <p>
                            {value.city}, {value.pincode}
                          </p>
                          <p>Contact: {value.contactnumber}</p>
                        </>
                      );
                    })
                  )}
                </div>

                <div>
                  <button
                    className="btn change_button"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Change
                  </button>
                </div>
              </div>

              <div className="Your_order_items mt-2">
                <div className="container">
                  <div className="row">
                    {filteredProducts.length == 0 ? (
                      <>
                        <div className="empty-basket-image">
                          <img
                            src={emptybasket}
                            className="empty-baset-image"
                            alt=""
                          />
                          <p>Your Basket is empty</p>

                          <div className="cart_buttons">
                            <button className="shop_now">Shop Now</button>
                            <button
                              className="refesh_button"
                              onClick={() => {
                                getCartItemsByEmail(
                                  localStorage.getItem("email")
                                );
                              }}
                            >
                              Refresh
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      filteredProducts.map((value) => {
                        return (
                          <>
                            <div className="col-lg-3 text-center">
                              <img src={value.imageurl} alt="" />
                            </div>

                            <div className="col-lg-9 your_cart_items">
                              <div>
                                <h4>
                                  {value.productcategory}, {value.productname}
                                </h4>
                                <p>Rs. {value.price}</p>
                                <button
                                  className="btn btn-outline-danger"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    deletehandler(value.id);
                                  }}
                                >
                                  REMOVE
                                </button>
                              </div>
                              {total(value.price)}
                              <div className="items-end">Fastest Deliver</div>
                            </div>

                            <hr />
                          </>
                        );
                      })
                    )}

                    <div className="place_order" id="Place_order">
                      <button
                        onClick={() => {
                          displayhello();
                        }}
                      >
                        Place Order
                      </button>
                    </div>
                    <form id="form" className="hidepaymerntform">
                      <div
                        className={`${
                          ErrorInPayment.cardholdername ? "has-error" : ""
                        }`}
                      >
                        {" "}
                        <label for="exampleInputEmail1" class="form-label">
                          Card Holder name
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="cardholdername"
                          name="cardholdername"
                          onChange={handlePaymentChange}
                          aria-describedby="emailHelp"
                        />
                      </div>
                      {ErrorInPayment.cardholdername && (
                        <small className="text-danger">
                          Card holder name is required
                        </small>
                      )}

                      <div
                        className={`${
                          ErrorInPayment.cardnumber ? "has-error" : ""
                        }`}
                      >
                        {" "}
                        <label for="exampleInputPassword1" class="form-label">
                          Card Number
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          onChange={handlePaymentChange}
                          id="cardnumber"
                          name="cardnumber"
                        />
                      </div>
                      {ErrorInPayment.cardnumber && (
                        <small className="text-danger">
                          Cardnumber is required
                        </small>
                      )}
                      <div className="row">
                        <div className="col-lg-6">
                          <div
                            className={`${
                              ErrorInPayment.cvv ? "has-error" : ""
                            }`}
                          >
                            {" "}
                            <label
                              for="exampleInputPassword1"
                              class="form-label"
                            >
                              CVV
                            </label>
                            <input
                              type="password"
                              class="form-control"
                              id="cvv"
                              name="cvv"
                              onChange={handlePaymentChange}
                            />
                          </div>
                          {ErrorInPayment.cvv && (
                            <small className="text-danger">
                              CVV is required
                            </small>
                          )}
                        </div>

                        <div className="col-lg-6">
                          <div class="mb-3">
                            <label
                              for="exampleInputPassword1"
                              class="form-label"
                            >
                              Expiary
                            </label>
                            <input
                              type="month"
                              class="form-control"
                              id="expiary"
                              name="expiary"
                              onChange={handlePaymentChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="place_order">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            validatePaymentDetails(
                              localStorage.getItem("email"),
                              yourTotalBill,
                              productbyEmail,
                              "pending",
                              credentials.actionby,
                              paymentdetails.cardholdername,
                              paymentdetails.cardnumber,
                              paymentdetails.cvv,
                              paymentdetails.expiary
                            );
                          }}
                          type="submit"
                          class="btn btn-primary"
                        >
                          Confirm Order
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                <hr />
              </div>
            </div>
          </div>

          <div className="col-lg-4 payment_section mt-2">
            <p className="payment_details">PAYMENT DETAILS</p>
            <hr />

            <div id="payment_description">
              <div className="payment_description">
                <div>Total Products</div>
                <div>{filteredProducts.length}</div>
              </div>
              <div className="payment_description">
                <div>Product Price</div>
                <div>{totalBill}</div>
              </div>

              <div className="payment_description">
                <div>Platform fee</div>
                <div>-30</div>
              </div>

              <div className="payment_description">
                <div>Delivery Charges</div>
                <div>-free</div>
              </div>
            </div>
            <div className="d-none">
              {totalBillToPay(totalBill, platformFee)}
            </div>

            <div className="total_payment">
              <h3>Total Payment</h3>
              <h3>{yourTotalBill}</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default YourCart;
