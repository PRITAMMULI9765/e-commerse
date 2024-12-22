import React, { useContext, useEffect, useReducer } from "react";
import projectcontext from "../../projectcontext/projectContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import StarIcon from "@mui/icons-material/Star";

function NewProductDetails() {
  const context = useContext(projectcontext);
  const { showProductDetails, detailsofProduct, Add_To_Cart, reducer } =
    context;
  const [state, dispatch] = useReducer(reducer, 1);

  useEffect(() => {
    showProductDetails(localStorage.getItem("ProductID"));
  }, []);

  console.log(detailsofProduct);
  return (
    <>
      <div className="productDetails">
        <div className="your_product_details container">
          <div className="row">
            {detailsofProduct.map((value) => {
              return (
                <>
                  <div className="col-lg-5">
                    <FavoriteIcon className="favouriteIcon" />
                    <img src={value.images} alt="" />

                    <div className="button_grp">
                      <button
                        className="add_to_cart_button"
                        onClick={(e) => { 
                          e.preventDefault();
                          Add_To_Cart(
                            localStorage.getItem("email"),
                            value.price,
                            value.category,
                            value.id,
                            value.brand,
                            1,
                            value.images
                          );
                        }}
                      >
                        <ShoppingCartIcon /> Add Toi Cart
                      </button>
                      <button className="add_to_cart_button buy_now">
                        <ElectricBoltIcon /> Buy now
                      </button>
                    </div>
                  </div>
                  <div className="col-lg-7 mt-3">
                    <h1>{value.brand}</h1>
                    <button className="btn btn-success">
                      <StarIcon /> {value.rating}{" "}
                    </button>{" "}
                    <span className="ratings">
                      10,865 Ratings & 636 Reviews
                    </span>
                    <h6 className="extra_off">
                      Extra {value.discountPercentage} off
                    </h6>
                    <div className="d-flex">
                      <div>
                        <h3>Rs. {value.price}</h3>
                      </div>
                      <div className="m-2 extra_off">
                        {value.discountPercentage}% off
                      </div>
                    </div>
                    <h6>Available offers</h6>
                    <ul>
                      <li>
                        Bank Offer5% Unlimited Cashback on Flipkart Axis Bank
                      </li>
                    </ul>
                    <hr />
                    <h6>Product Description</h6>
                    <p>{value.description}</p>
                    <hr />
                    <h6>Perople Review</h6>
                    {value.reviews.map((review) => {
                      console.log(review);
                      return (
                        <>
                          <div className="product_review" key={value.id}>
                            <div className="people_review">
                              <div>{review.date}</div>

                              <div>
                                <h6>{review.reviewerName}</h6>
                                <br />
                              </div>
                            </div>

                            <div className="people_review">
                              <div>{review.comment}</div>

                              <div>
                                <button className="btn btn-success">
                                  {review.rating}
                                </button>
                                <br />
                              </div>
                            </div>
                            <hr />
                          </div>
                        </>
                      );
                    })}
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default NewProductDetails;
