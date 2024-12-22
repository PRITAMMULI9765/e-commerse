import React from "react";
import fregrences from "../Images/fregrences.jpg";
import groceries from "../Images/Groceries.jpg";
import beautyproduct from "../Images/beautyPr.jpg";
import { useNavigate } from "react-router-dom";
import trusted from "../Images/trusted product.jpg";
import support from "../Images/support.jpg";
import delivery from "../Images/fastestdelivery.jpg"

function RecomendedProducts() {
  const navigate = useNavigate();
  return (
    <>
      <div className="row">
        <div className="col-lg-"></div>
        <div className="col-l8">
          <div className="row">
            <div className="col-lg-4">
              <abbr title="Trusted Network">
                <div className="card d-flex flex-row align-items-center famous_product_card">
                  <div className="card-body">
                    <p className="card-text fregrences_image_heading">
                      Trusted network
                    </p>
                  </div>
                  <img
                    src={trusted}
                    className="famous_product_image card-img-left"
                    alt="..."
                    style={{ width: "50%", objectFit: "cover" }}
                  />
                </div>
              </abbr>
            </div>
            <div className="col-lg-4">
              <abbr title="Fastest delivery">
                <div className="card d-flex flex-row align-items-center famous_product_card">
                  <div className="card-body">
                    <p className="card-text fregrences_image_heading">
                      Fastest delivery
                    </p>
                  </div>

                  <img
                    src={delivery}
                    className="card-img-left famous_product_image"
                    alt="..."
                    style={{ width: "50%", objectFit: "cover" }}
                  />
                </div>
              </abbr>
            </div>
            <div className="col-lg-4">
              <abbr title="Contact">
                <div
                  onClick={() => {
                    navigate("/contact");
                  }}
                  className="card d-flex flex-row align-items-center famous_product_card"
                >
                  <div className="card-body">
                    <p className="card-text fregrences_image_heading">
                      24*7 Support
                    </p>
                  </div>

                  <img
                    src={support}
                    className="card-img-left famous_product_image"
                    alt="..."
                    style={{ width: "50%", objectFit: "cover" }}
                  />
                </div>
              </abbr>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RecomendedProducts;
