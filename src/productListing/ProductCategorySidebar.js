import React, { useContext, useState } from "react";
import LaptopIcon from "@mui/icons-material/Laptop";
import MobileFriendlyIcon from "@mui/icons-material/MobileFriendly";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import GrassIcon from "@mui/icons-material/Grass";
import MicrowaveIcon from "@mui/icons-material/Microwave";
import ParkIcon from "@mui/icons-material/Park";
import { useNavigate } from "react-router-dom";
import CategoryIcon from "@mui/icons-material/Category";
import projectcontext from "../projectcontext/projectContext";

function ProductCategorySidebar() {
  const context = useContext(projectcontext);
  const {
    handleSortByRatings,
    handleSortChangeByCategory,
    newfeatured,
    handle_category,
    handleSortChange,
  } = context;

  const navigate = useNavigate();

  return (
    <div className="product_sidebar">
      <br />
      <br />
      <div className="categories_heading">
        <h4>Categories</h4> <br />
      </div>
      <br />
      <hr />
      <div className="categories_column">
        <div
          className="category_item"
          onClick={() => {
            navigate("/productcategory");
          }}
        >
          <CategoryIcon className="category_item_icon" /> All Product
        </div>
        <br />
        <div
          className="category_item"
          onClick={() => {
            navigate("/subproductcategory");
            handle_category("beauty");
          }}
        >
          <LaptopIcon className="category_item_icon" /> Beauty
        </div>
        <br />
        <div
          className="category_item"
          onClick={() => {
            navigate("/subproductcategory");
            handle_category("fragrances");
          }}
        >
          <MobileFriendlyIcon className="category_item_icon" /> Fregrences
        </div>
        <br />
        <div
          className="category_item"
          onClick={() => {
            navigate("/subproductcategory");
            handle_category("furniture");
          }}
        >
          <FoodBankIcon className="category_item_icon" /> Furniture
        </div>
        <br />
        <div
          className="category_item"
          onClick={() => {
            navigate("/subproductcategory");
            handle_category("groceries");
          }}
        >
          <GrassIcon className="category_item_icon" /> Food
        </div>
        <br />
      </div>
      <hr /> <br />
      <div className="categories_heading">
        <h4>Filter By Price</h4>
        <div className="filters">
          {window.location.pathname == "/productcategory" ? (
            <p>
              <select
                onChange={handleSortChange}
                class="form-select sort-by"
                aria-label="Default select example"
              >
                <option value="default">---select---</option>
                <option value="highToLow">By Price(High to Low)</option>
                <option value="byRating">By Rating</option>
              </select>
            </p>
          ) : (
            <p>
              <select
                onChange={handleSortChangeByCategory}
                class="form-select sort-by"
                aria-label="Default select example"
              >
                <option value="default">---select---</option>
                <option value="highToLow">By Price(High to Low)</option>
                <option value="byRating">By Rating</option>
              </select>
            </p>
          )}

          <hr />
        </div>
      </div>
    </div>
  );
}

export default ProductCategorySidebar;
