import React, { useContext } from "react";
import projectcontext from "../projectcontext/projectContext";
import HomeIcon from "@mui/icons-material/Home";
import LaptopIcon from "@mui/icons-material/Laptop";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import { useNavigate } from "react-router-dom";
import groceries from "../Images/Groceries.jpg";
import laptop from "../Images/laptop.jpg";
import home from "../Images/home.jpg";
import phone from "../Images/phone.jpg";
import allproduct from "../Images/allproduct.jpg";
import homedecoration from "../Images/home-decoration.jpg";
// import perfumes from "../Images/fregrences'.jpg";
import myorders from "../Images/myorders.jpeg";
import mycart from "../Images/th.jpeg";
import feedback from "../Images/feedback.jpeg";
import skincare from "../Images/skincare.jpg"
import myfeebback from "../Images/myfeedback.jpeg";
function Categorybuttons() {
  const context = useContext(projectcontext);
  const {
    product_category,
    showCategorywiseProduct,
    setShowCategorywiseProduct,
  } = context;

  const navigate = useNavigate();
  return (
    <>
      <div id="navbarNav">
        <div className="side_nav">
          <div
            className="icons_name col-lg-3 col-3"
            onClick={() => {
              navigate("/");
            }}
          >
            <img src={home} alt="" className="icons_images" />
            <p className="icon_title">Home</p>
          </div>

          <div
            className="icons_name col-lg-3 col-3"
            onClick={() => {
              navigate("/products");
            }}
          >
            <img src={allproduct} alt="" className="icons_images" />
            <p className="icon_title">All Producrt</p>
          </div>
          <div
            className="icons_name col-3"
            onClick={() => {
              product_category("laptops");
            }}
          >
            <img src={laptop} alt="" className="icons_images" />
            <p className="icon_title">Laptop</p>
          </div>

          <div
            className="icons_name col-3"
            onClick={() => {
              product_category("smartphones");
            }}
          >
            <img src={phone} alt="" className="icons_images" />
            {/* <SmartphoneIcon className="icons" /> */}
            <p className="icon_title">Smartphones</p>
          </div>
          <div
            className="icons_name col-3"
            onClick={() => {
              product_category("fragrances");
            }}
          >
            {/* <img src={perfumes} className="icons_images" /> */}
            <p className="icon_title">Fragrances</p>
          </div>

          <div
            className="icons_name col-3"
            onClick={() => {
              product_category("skincare");
            }}
          >
            <img src={skincare} className="icons_images" />
            <p className="icon_title">Skincare</p>
          </div>
          <div
            className="icons_name col-3"
            onClick={() => {
              product_category("home-decoration");
            }}
          >
            <img src={homedecoration} className="icons_images" />
            <p className="icon_title">Home decoration</p>
          </div>

          <div
            className="icons_name col-3"
            onClick={() => {
              navigate("/yourcart");
            }}
          >
            <img src={mycart} className="icons_images" />
            <p className="icon_title">My Cart</p>
          </div>

          <div
            className="icons_name col-3"
            onClick={() => {
              navigate("/myorder");
            }}
          >
            <img src={myorders} className="icons_images" />
            <p className="icon_title">My Orders</p>
          </div>

          <div
            className="icons_name col-3"
            onClick={() => {
              navigate("/raisedticket");
            }}
          >
            <img src={feedback} className="icons_images" />
            <p className="icon_title">Raised Ticket</p>
          </div>

          <div
            className="icons_name col-3"
            onClick={() => {
              navigate("/myraisedticket");
            }}
          >
            <img src={myfeebback} className="icons_images" />
            <p className="icon_title">My Raised Ticket</p>
          </div>
        </div>
      </div>
      {/* <div className="row">
        <div className="col-lg-2"></div>
        <div className="col-lg-7">
          <div className="filter_section">
            <button
              type="button"
              class="btn btn-success filter_section_buttons"
              onClick={() => {
                product_category("laptops");
              }}
            >
              Laptop
            </button>
            <button
              type="button"
              class="btn btn-success filter_section_buttons"
              onClick={() => {
                product_category("smartphones");
              }}
            >
              Smartphones
            </button>
            <button
              type="button"
              class="btn btn-success filter_section_buttons"
              onClick={() => {
                product_category("fragrances");
              }}
            >
              Fragrances
            </button>
            <button
              type="button"
              class="btn btn-success filter_section_buttons"
              onClick={() => {
                product_category("skincare");
              }}
            >
              Skincare
            </button>
            <button
              type="button"
              class="btn btn-success filter_section_buttons"
              onClick={() => {
                product_category("groceries");
              }}
            >
              Groceries
            </button>
            <button
              type="button"
              class="btn btn-success filter_section_buttons"
              onClick={() => {
                product_category("home-decoration");
              }}
            >
              Home-decoration
            </button>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default Categorybuttons;
