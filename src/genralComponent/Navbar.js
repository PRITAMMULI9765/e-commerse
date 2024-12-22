import React, { useContext, useState } from "react";
import logo from "../Images/apnaLogo.jpg";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useNavigate } from "react-router-dom";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import projectcontext from "../projectcontext/projectContext";
import { Phone } from "@mui/icons-material";

function Navbar() {
  const navigate = useNavigate();
  const context = useContext(projectcontext);
  const { userSignOut } = context;
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownforServoce, setDropdownforService] = useState(false);

  return (
    <>
      <nav
        className="navbar navbar_sticky navbar-expand-lg bg-dark mb-3 border-body"
        data-bs-theme="dark"
      >
        <div className="container-fluid navbar_cred">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse navbar_items"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 navbar_item">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  <h4 className="brand_heading">muli E-commerse</h4>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                  onClick={() => {
                    navigate("/products");
                  }}
                >
                  Product
                </a>
              </li>
              <li className="nav-item">
                <a
                  onClick={() => {
                    navigate("/yourcart");
                  }}
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                >
                  Your Cart
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  onClick={() => {
                    navigate("/myorder");
                  }}
                  aria-current="page"
                  href="#"
                >
                  My Order
                </a>
              </li>

              {/* <li
                className="nav-item dropdown active_user_email"
                onMouseEnter={() => setDropdownforService(true)}
                onMouseLeave={() => setDropdownforService(false)}
              >
                <a
                  className={`nav-link dropdown-toggle ${
                    dropdownforServoce ? "show" : ""
                  }`}
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded={dropdownforServoce}
                >
                  My Request
                </a> 
                <div
                  className={`dropdown-menu navbar_dropdown ${
                    dropdownforServoce ? "show" : ""
                  }`}
                >
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => {
                        navigate("/raisedticket");
                      }}
                    >
                      <ContactPageIcon /> Raise Ticket
                    </a>
                  </li>

                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => {
                        navigate("/userticketstatus");
                      }}
                    >
                      <ContactPageIcon /> My Raised Ticket
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                    >
                     <Phone /> Contact
                    </a>
                  </li>
                </div>
              </li> */}
              {/* <li className="nav-item">
                <a
                  className="nav-link active"
                  onClick={() => {
                    navigate("/contact");
                  }}
                  aria-current="page"
                  href="#"
                >
                  Contact
                </a>
              </li> */}
              <li
                className="nav-item dropdown active_user_email"
                onMouseEnter={() => setDropdownVisible(true)}
                onMouseLeave={() => setDropdownVisible(false)}
              >
                {localStorage.getItem("email") ? (
                  <>
                    <a
                      className={`nav-link dropdown-toggle ${
                        dropdownVisible ? "show" : ""
                      }`}
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded={dropdownVisible}
                    >
                      <AccountCircleIcon /> {localStorage.getItem("email")}
                    </a>
                    <div
                      className={`dropdown-menu navbar_dropdown ${
                        dropdownVisible ? "show" : ""
                      }`}
                    >
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() => {
                            navigate("/myprofile");
                          }}
                        >
                          <ContactPageIcon /> Profile
                        </a>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() => {
                            userSignOut();
                          }}
                        >
                          <LockOpenIcon /> Logout
                        </a>
                      </li>
                    </div>
                  </>
                ) : (
                  <>
                    <button
                      className="btn login_button"
                      onClick={() => {
                        navigate("/userlogin");
                      }}
                    >
                      Login
                    </button>
                  </>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
