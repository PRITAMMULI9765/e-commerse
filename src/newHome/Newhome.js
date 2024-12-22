import React, { useContext } from "react";
import backgroundimage from "../Images/home-page-image.png";
import Navbar from "../genralComponent/Navbar";
import fregrences from "../Images/fregrences.jpg";
import groceries from "../Images/Groceries.jpg";
import beautyproduct from "../Images/beautyPr.jpg";
import RecomendedProducts from "./RecomendedProducts";
import projectcontext from "../projectcontext/projectContext";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

function Newhome() {
  const navigate = useNavigate()
  return (
    <>
      <Navbar />
      <img
        src={backgroundimage}
        className="img-fluid background-home-image"
        alt="..."
      />

      <div className="famous_product">
        <div className="row">
          <div className="col-lg-2"></div>
          <div className="col-lg-8">
            <div className="row">
              <div className="col-lg-4">
                <abbr title="Explore more product">
                  <div onClick={() => {navigate("/products")}} className="card d-flex flex-row align-items-center famous_product_card">
                    <div className="card-body">
                      <p className="card-text fregrences_image_heading">
                        Amazing Fregrences
                      </p>
                    </div>
                    <img
                      src={fregrences}
                      className="famous_product_image card-img-left"
                      alt="..."
                      style={{ width: "50%", objectFit: "cover" }}
                    />
                  </div>
                </abbr>
              </div>
              <div className="col-lg-4">
                <abbr title="Explore more product">
                  <div onClick={() => {navigate("/products")}} className="card d-flex flex-row align-items-center famous_product_card">
                    <div className="card-body">
                      <p className="card-text fregrences_image_heading">
                        Beauty Products
                      </p>
                    </div>

                    <img
                      src={beautyproduct}
                      className="card-img-left famous_product_image"
                      alt="..."
                      style={{ width: "50%", objectFit: "cover" }}
                    />
                  </div>
                </abbr>
              </div>
              <div className="col-lg-4">
                <abbr title="Explore more product">
                  <div onClick={() => {navigate("/products")}} className="card d-flex flex-row align-items-center famous_product_card">
                    <div className="card-body">
                      <p className="card-text fregrences_image_heading">
                        Groceries
                      </p>
                    </div>

                    <img
                      src={groceries}
                      className="card-img-left famous_product_image"
                      alt="..."
                      style={{ width: "50%", objectFit: "cover" }}
                    />
                  </div>
                </abbr>
              </div>
            </div>

            <div className="recomended">
              <p className="recomonded_product_heading">Speciality</p>
              <h2 className="text-center">Why to choose us</h2>
              <RecomendedProducts />
            </div> 
          </div>
        </div>
      </div>

     <Footer />
    </>
  );
}

export default Newhome;
