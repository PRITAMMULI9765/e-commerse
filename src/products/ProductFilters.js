import React, { useContext } from "react";
import projectcontext from "../projectcontext/projectContext";

function ProductFilters() {
  const context = useContext(projectcontext);
  const {
    handleSortByPrice,
    sortByPrice,
    handleSortChange,
    handleSortByRatings,
    handleSortChangeByCategory,
  } = context;

  return (
    <>
      <div className="filters">
        {window.location.pathname == "/products" ? (
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
    </>
  );
}

export default ProductFilters;
