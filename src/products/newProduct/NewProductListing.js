import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../genralComponent/Navbar";
import projectcontext from "../../projectcontext/projectContext";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";

function NewProductListing() {
  const context = useContext(projectcontext);

  const {
    myProduct,
    handleclick,
    handleSortChange,
    filterProduct,
    filterProductSection,
  } = context;

  const [showFullDescription, setShowFullDescription] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const navigate = useNavigate();

  // Initialize products when the component mounts
  useEffect(() => {
    handleclick(); // Fetch products
    filterProduct(); // Apply initial filters
  }, []);
  // Update filteredProducts whenever `myProduct` or `searchQuery` changes
  useEffect(() => {
    const filtered = myProduct.filter(
      (product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.id.toString().includes(searchQuery)
    );
    setFilteredProducts(filtered);
  }, [myProduct, searchQuery]); // Dependencies ensure this effect runs only when necessary

  const toggleDescription = (id) => {
    setShowFullDescription((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const filterProductByCategory = async (category) => {
    const your_category_product = await myProduct.filter((product) => {
      // console.log(product)
      return product.category == category;
    });

    console.log(your_category_product);

    setFilteredProducts(your_category_product);
  };

  return (
    <>
      <Navbar />

      <div className="produuctbackground">
        <div className="row">
          <div className="col-lg-2">
            <div className="new_product_filter_section">
              <h3>Filters</h3>
              <hr />
              <h6 className="product_categories">CATEGORIES</h6>
              <p
                className="new_produt_filter"
                onClick={() => {
                  handleclick();
                }}
              >
                All Product
              </p>
              {filterProductSection.map((value) => {
                console.log(value);
                return (
                  <p
                    className="new_produt_filter"
                    onClick={() => {
                      filterProductByCategory(value);
                    }}
                    key={value}
                  >
                    {value
                      .slice(0, 1)
                      .toUpperCase()
                      .concat(value.slice(1, value.length))}
                  </p>
                );
              })}
              <hr />
              <div className="form-check">
                <input
                  className="form-check-input"
                  value="highToLow"
                  type="radio"
                  onChange={handleSortChange}
                  name="flexRadioDisabled"
                  id="flexRadioDisabled1"
                />
                <label
                  className="form-check-label"
                  htmlFor="flexRadioDisabled1"
                >
                  Price(High to low)
                </label>{" "}
              </div>{" "}
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  onChange={handleSortChange}
                  value="LowToHigh"
                  name="flexRadioDisabled"
                  id="flexRadioDisabled2"
                />
                <label
                  className="form-check-label"
                  htmlFor="flexRadioDisabled2"
                >
                  Price (Low to high)
                </label>{" "}
              </div>{" "}
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDisabled"
                  onChange={handleSortChange}
                  id="flexRadioDisabled3"
                  value="byRating"
                />
                <label
                  className="form-check-label"
                  htmlFor="flexRadioDisabled3"
                >
                  Highest Rated first
                </label>
              </div>
            </div>
          </div>
          <div className="col-lg-10">
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
            <div className="new_product_content_section">
              {filteredProducts.map((value) => {
                const isFullDescriptionVisible = showFullDescription[value.id];

                return (
                  <div key={value.id}>
                    <div
                      className="products"
                      onClick={() => {
                        localStorage.setItem("ProductID", value.id);
                        navigate("/productdetails");
                      }}
                    >
                      <div>
                        ID: {value.id} <br />
                        <img
                          src={value.images}
                          className="productImages"
                          alt={value.description}
                        />
                      </div>

                      <div>
                        <h5 className="product_desc">
                          {isFullDescriptionVisible
                            ? value.description
                            : `${value.description.slice(0, 50)}...`}
                          <span
                            className="text-primary"
                            style={{ cursor: "pointer" }}
                            onClick={() => toggleDescription(value.id)}
                          >
                            {isFullDescriptionVisible
                              ? " Read less"
                              : " Read more"}
                          </span>
                        </h5>
                        <p>{value.category}</p>
                        <button className="btn btn-success">
                          <StarIcon /> {value.rating}
                        </button>
                      </div>

                      <div>
                        <h3>Rs.{value.price}</h3>
                        Flat discount {value.discountPercentage} <br />
                      </div>
                    </div>
                    <hr />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewProductListing;
