import React, { useContext, useEffect, useState, useReducer } from "react";
import Navbar from "../genralComponent/Navbar";
import laptopPNG from "../Images/icon/LaptopIcon.jpeg";
import { useNavigate } from "react-router-dom";
import projectcontext from "../projectcontext/projectContext";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import StoreIcon from "@mui/icons-material/Store";
import ProductCategorySidebar from "./ProductCategorySidebar";

function ProductCategory() {
  const context = useContext(projectcontext);
  const { fetctNewFeatured, newfeatured } = context;

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetctNewFeatured();
  }, []);

  const navigate = useNavigate();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setFilteredProducts(newfeatured);
  }, [newfeatured]);

  const onChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    console.log(searchValue);
    const filtered = newfeatured.filter(
      (product) =>
        product.category.toLowerCase().includes(searchValue) ||
        product.title.toLowerCase().includes(searchValue)
    );
    setFilteredProducts(filtered);
  };

  console.log(newfeatured);
  const nextImage = () => {
    if (currentImageIndex < newfeatured.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const previousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  // console.log(newfeatured)
  return (
    <>
      <Navbar />

      <div className="row">
        <div className="col-lg-3">
          <ProductCategorySidebar />
        </div>
        <div className="col-lg-9">
          <div className="input">
            <ManageSearchIcon className="search_icon" />
            <input
              type="text"
              name="yourproduct"
              id="yourproduct"
              className="serchYourProduct"
              placeholder="Serch for product title or category"
              onChange={onChange}
            />
          </div>
          <hr />
          <div className="row your_products">
            {filteredProducts &&
              filteredProducts.map((value, index) => {
                console.log(value.category);
                return (
                  <>
                    <div className="col-lg-1"></div>
                    <div className="col-lg-3 col-md-4 col-sm-6 col-6">
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
                                    class="d-block w-100 product_image_list"
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
                                    <figcaption className="card-title figure_caption_image">
                                      {value.title}
                                      <br />
                                      {value.price}
                                    </figcaption>
                                  </h5>
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
          </div>{" "}
        </div>
      </div>
    </>
  );
}

export default ProductCategory;
