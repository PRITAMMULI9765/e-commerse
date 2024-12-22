import React, { useContext, useEffect, useState } from "react";
import Categorybuttons from "./Categorybuttons";
import projectcontext from "../projectcontext/projectContext";
import Navbar from "../genralComponent/Navbar";
import { useNavigate } from "react-router-dom";
import { useReducer } from "react";
import StoreIcon from "@mui/icons-material/Store";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Footer from "../genralComponent/Footer";
import { db } from "../Authentaction/Config";
import { addDoc, collection } from "firebase/firestore";
import ProductFilters from "./ProductFilters";

function ProductCategory() {
  const context = useContext(projectcontext);
  const navigate = useNavigate();
  const { showCategorywiseProduct, Buy_the_product, Add_To_Cart, proceed_To_pay } = context;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const {
    product_details,
    handleclick,
    myProduct,
    setMyProduct,
    showproductDetails,
    setShowProductDetails,
    handleProductBySortedCategory,
    reducer,
  } = context;

  let initialState = 1;
  const [state, dispatch] = useReducer(reducer, initialState);
  const [credentials, setCredentials] = useState({
    reasonofrejection: "",
    actionby: "",
  });

  const { reasonofrejection, actionby } = credentials;

  useEffect(() => {
    product_details(localStorage.getItem("productID"));
  }, []);

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

  return (
    <>
    {/* <Navbar /> */}
    <div className="row">
      <div className="col-lg-1 col-md-1">
        <Categorybuttons />
      </div>

      <div className="col-lg-11 col-md-11">
        <ProductFilters />
        <div className="container all_products">
          <div className="row">
            {showCategorywiseProduct &&
              showCategorywiseProduct.map((value, index) => {
                console.log(value.title)
                return (
                  <>
                    <div className="col-lg-4 col-md-4 col-sm-6 col-6">
                      <div>
                        <div class="card product_list">
                          <div class="card-body">
                            <div
                              id={`carouselExampleIndicators${index}`}
                              class="carousel slide"
                            >
                              <div class="carousel-ndicators">
                                {value.images.map((_, i) => (
                                  <button
                                    key={i}
                                    type="button"
                                    data-bs-target={`#carouselExampleIndicators${index}`}
                                    data-bs-slide-to={i}
                                    className={
                                      i === currentImageIndex ? "active" : ""
                                    }
                                    aria-label={`Slide ${i + 1}`}
                                  ></button>
                                ))}
                              </div>
                              <div class="carousel-inner">
                                <div class="carousel-item active">
                                  <img
                                    src={value.images[currentImageIndex]}
                                    class="d-block w-100 product_image"
                                    alt="..."
                                    onClick={() => {
                                      localStorage.setItem(
                                        "productID",
                                        value.id
                                      );
                                      navigate("/productdetails");
                                    }}
                                  />
                                  <h5>
                                    <figcaption className="card-title figure_caption">
                                      {value.title}
                                    </figcaption>

                                    <form action="">
                                      <div className="uiui">
                                        <div className="wrapper">
                                          {state == 1 ? (
                                            <span
                                              className="minus disable"
                                              onClick={() =>
                                                dispatch({
                                                  type: "DECREAMENT",
                                                })
                                              }
                                            >
                                              -
                                            </span>
                                          ) : (
                                            <span
                                              className="minus"
                                              onClick={() =>
                                                dispatch({
                                                  type: "DECREAMENT",
                                                })
                                              }
                                            >
                                              -
                                            </span>
                                          )}

                                          <span
                                            className="num"
                                            onChange={onchange}
                                            id="num"
                                          >
                                            {state}
                                          </span>
                                          <span
                                            className="plus"
                                            onClick={() =>
                                              dispatch({ type: "INCREAMENT" })
                                            }
                                          >
                                            +
                                          </span>
                                        </div>
                                      </div>
                                    </form>
                                  </h5>

                                  <button
                                    type="button"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        proceed_To_pay(
                                          localStorage.getItem("email"),
                                          value.price,
                                          value.category,
                                          value.id,
                                          value.brand,
                                          state,
                                          credentials.reasonofrejection,
                                          "pending",
                                          credentials.actionby,
                                          value.images[0]
                                        );
                                      }}
                                    class="btn btn-outline-success product_action_buttons"
                                  >
                                    <StoreIcon /> Buy
                                  </button>
                                  <button
                                    type="button"
                                    class="btn btn-outline-warning add_to_cart product_action_buttons"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        Add_To_Cart(
                                          localStorage.getItem("email"),
                                          value.price,
                                          value.category,
                                          value.id,
                                          value.title,
                                          state,
                                          value.images[0]
                                        );
                                      }}
                                  >
                                    <AddShoppingCartIcon /> Add To Cart
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
              <div className="col-lg-1 col-md-1"></div>
          </div>
        </div>
      </div>
    </div>
    {/* <div className="container">
      <div className="row">
        <Categorybuttons />
        {myProduct &&
          myProduct.map((value, index) => {
             return (
              <>
                <div className="col-lg-3">
                  <div>
                    <div class="card product_list">
                      <div class="card-body">
                        <div
                          id={`carouselExampleIndicators${index}`}
                          class="carousel slide"
                        >
                          <div class="carousel-ndicators">
                            {value.images.map((_, i) => (
                              <button
                                key={i}
                                type="button"
                                data-bs-target={`#carouselExampleIndicators${index}`}
                                data-bs-slide-to={i}
                                className={
                                  i === currentImageIndex ? "active" : ""
                                }
                                aria-label={`Slide ${i + 1}`}
                              ></button>
                            ))}
                          </div>
                          <div class="carousel-inner">
                            <div class="carousel-item active">
                              <img
                                src={value.images[currentImageIndex]}
                                class="d-block w-100 product_image"
                                alt="..."
                                onClick={() => {
                                  localStorage.setItem("productID", value.id);
                                  navigate("/productdetails");
                                }}
                              />
                              <h5>
                                <figcaption className="card-title figure_caption">
                                  {value.title}
                                </figcaption>

                                <form action="">
                                  <div className="uiui">
                                    <div className="wrapper">
                                      {state == 1 ? (
                                        <span
                                          className="minus d-none"
                                          onClick={() =>
                                            dispatch({ type: "DECREAMENT" })
                                          }
                                        >
                                          -
                                        </span>
                                      ) : (
                                        <span
                                          className="minus"
                                          onClick={() =>
                                            dispatch({ type: "DECREAMENT" })
                                          }
                                        >
                                          -
                                        </span>
                                      )}

                                      <span
                                        className="num"
                                        onChange={onchange}
                                        id="num"
                                      >
                                        {state}
                                      </span>
                                      <span
                                        className="plus"
                                        onClick={() =>
                                          dispatch({ type: "INCREAMENT" })
                                        }
                                      >
                                        +
                                      </span>
                                    </div>
                                  </div>
                                </form>
                              </h5>

                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  Buy_the_product(
                                    localStorage.getItem("email"),
                                    value.price,
                                    value.category,
                                    value.id,
                                    value.brand,
                                    state,
                                    credentials.reasonofrejection,
                                    "pending",
                                    credentials.actionby,
                                    value.images[0]
                                  );
                                }}
                                class="btn btn-outline-success product_action_buttons"
                              >
                                <StoreIcon /> Buy
                              </button>
                              <button
                                type="button"
                                class="btn btn-outline-warning add_to_cart product_action_buttons"
                                onClick={(e) => {
                                  e.preventDefault();
                                  Add_To_Cart(
                                    localStorage.getItem("email"),
                                    value.price,
                                    value.category,
                                    value.id,
                                    value.brand,
                                    state,
                                    value.images[0]
                                  );
                                }}
                              >
                                <AddShoppingCartIcon /> Add To Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-1"></div>
              </>
            );
          })}
      </div>
    </div> */}
    <Footer />
  </>
  );
}

export default ProductCategory;
