import React, { useContext, useEffect, useReducer } from "react";
import ProjectContext from "../Context/Projectcontext";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Footer from "../GenralComponent/Footer";
import CartNavbar from "../Cart/CartNavbar";
function ProductDetails() {
  const context = useContext(ProjectContext);
  const {
    fetctProductWithID,
    reducer,
    detailsOfProducts,
    Add_To_Cart,
    checkLogin,
  } = context;

  useEffect(() => {
    checkLogin();
  }, []);
  useEffect(() => {
    fetctProductWithID(localStorage.getItem("productID"));
  }, []);

  let initialState = 1;
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <div className="container">
        <CartNavbar />
        <div className="row">
          {detailsOfProducts &&
            detailsOfProducts.map((value) => {
              console.log(value);
              return (
                <>
                  <div className="col-lg-6 detailImage">
                    <div class="card">
                      <img
                        src={value.images[0]}
                        class="card-img-top detailImageofProduct"
                        alt="..."
                      />
                    </div>
                    {/* <img
                    src={value.images[0]}
                    className="detailImageofProduct img-fluid"
                    alt=""
                  /> */}
                  </div>

                  <div className="col-lg-6 detailImage">
                    <h6>Product ID: {value.id}</h6>
                    <br /> <h6> {value.brand} </h6>
                    <h6> {value.category} </h6>
                    <h1>{value.title}</h1>
                    <h5>
                      <CurrencyRupeeIcon />
                      {value.price}
                    </h5>{" "}
                    <h6>{value.rating}</h6>
                    <hr /> <h6>{value.description}</h6>
                    <p>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Magni, sed voluptatibus iste nesciunt quam incidunt
                      nostrum similique commodi cupiditate repellendus fuga
                      aliquam voluptate laudantium voluptates impedit tempore
                      corporis. Officia voluptatibus, corrupti provident ad
                      exercitationem sint. Atque blanditiis fugiat id sapiente.
                    </p>
                    <h6>Quantity: </h6>{" "}
                    <form action="">
                      <div className="uiui">
                        <div className="wrapper">
                          {state == 1 ? (
                            <span
                              className="minus inc_dec_sign"
                              onClick={() => dispatch({ type: "DECREAMENT" })}
                            >
                              <button disabled className="disable_minus_sign">
                                -
                              </button>
                            </span>
                          ) : (
                            <span
                              className="minus"
                              onClick={() => dispatch({ type: "DECREAMENT" })}
                            >
                              -
                            </span>
                          )}

                          <span className="num" onChange={onchange} id="num">
                            {state}
                          </span>
                          <span
                            className="plus"
                            onClick={() => dispatch({ type: "INCREAMENT" })}
                          >
                            +
                          </span>
                        </div>
                      </div>
                    </form>
                    {!localStorage.getItem("email") ? (
                      <button
                        className="btn btn-secondary add_to_cart_button"
                        disabled
                        onClick={(e) => {
                          e.preventDefault();
                          Add_To_Cart(
                            // localStorage.getItem("email"),
                            "pritammuli@gmail.com",
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
                    ) : (
                      <button
                        className="btn btn-secondary add_to_cart_button"
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
                    )}
                  </div>
                </>
              );
            })}
          <div className="col-lg-6"></div>
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
}

export default ProductDetails;
