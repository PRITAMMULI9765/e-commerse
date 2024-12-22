import React, { useContext, useEffect, useState } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import image from "../../Images/Groceries.jpg";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FolderIcon from "@mui/icons-material/Folder";
import projectContext from "../../projectcontext/projectContext";
import { listAll, uploadBytes } from "firebase/storage";
import { ref } from "firebase/database";
import { storage } from "../Config";
import { Link, useNavigate } from "react-router-dom";
import emptybasket from "../../Images/empty-basket.png";
import Navbar from "../../genralComponent/Navbar";

function Myprofile() {
  const context = useContext(projectContext);
  const {
    getUserForShop,
    userforshop,
    fetchAadharfromStorage,
    country,
    // yourProfilePhoto,
    yourAadhar,
    Update_user_Information,
    countrname,
    imageList,
    usercredentials,
    fetchImagesfromStorage,
  } = context;

  const navigate = useNavigate();

  const [filterUser, setFilterUser] = useState([]);
  useEffect(() => {
    getUserForShop();
    fetchImagesfromStorage();
    fetchAadharfromStorage();
    country();
  }, []);

  console.log(yourAadhar);

  useEffect(() => {
    filterYourUser(localStorage.getItem("email"));
  }, []);

  const [UpdateTheInfo, setUpdateTheInfo] = useState({
    updatedfullname: "",
    updatedemail: "",
    updatedcontactnumber: "",
    updateddateofbirth: "",
    updatednationality: "",
    updatedapplyasadmin: "",
  });

  const {
    updateFullname,
    updatedemail,
    updatedcontactnumber,
    updatedapplyasadmin,
    updateddateofbirth,
    updatednationality,
  } = UpdateTheInfo;
  const filterYourUser = async (email) => {
    const yourFetchedUser = await userforshop.filter((user) => {
      console.log(user.email)
      return user.email == email;
    });
    console.log(yourFetchedUser)
    setFilterUser(yourFetchedUser);
  };

  console.log(filterUser);
  const onUpdateEmail = (e) => {
    setUpdateTheInfo({ ...setUpdateTheInfo, [e.target.name]: e.target.value });
  };
  return (
    <>
    <Navbar />
      {filterUser.length == 0 ? (
        <div className="profile_absent">

        <div className="empty-basket-image">
          <img src={emptybasket} className="empty-baset-image" alt="" />

          <div className="cart_buttons">
            <button className="shop_now">Shop Now</button>
            <button
              className="refesh_button"
              onClick={() => {
                filterYourUser(localStorage.getItem("email"));
              }}
            >
              Refresh
            </button>
          </div>
        </div>
        </div>
      ) : (
        filterUser.map((value) => {
          return (
            <>
              <div
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="exampleModalLabel">
                        Modal title
                      </h1>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <form>
                        <div class="mb-3">
                          <label for="exampleInputEmail1" class="form-label">
                            Edit Full name
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            onChange={onUpdateEmail}
                            id="editedfullname"
                            name="editedfullname"
                            aria-describedby="emailHelp"
                          />
                        </div>

                        <div class="mb-3">
                          <label for="exampleInputEmail1" class="form-label">
                            Email
                          </label>
                          <input
                            type="email"
                            class="form-control"
                            onChange={onUpdateEmail}
                            id="editedemail"
                            name="editedemail"
                            aria-describedby="emailHelp"
                          />
                        </div>

                        <div class="mb-3">
                          <label for="exampleInputEmail1" class="form-label">
                            Contact number
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            onChange={onUpdateEmail}
                            id="editedcontactnumber"
                            name="editedcontactnumber"
                            aria-describedby="emailHelp"
                          />
                        </div>

                        <div class="mb-3">
                          <label for="exampleInputEmail1" class="form-label">
                            Date Of birth
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            onChange={onUpdateEmail}
                            id="editeddateofbirth"
                            name="editeddateofbirth"
                            aria-describedby="emailHelp"
                          />
                        </div>
                        <div class="mb-3">
                          <label for="exampleInputEmail1" class="form-label">
                            Nationality
                          </label>
                          <select
                            class="form-select input-filed"
                            name="nationality"
                            onChange={onUpdateEmail}
                            id="nationality"
                            aria-label="Default select example"
                          >
                            <option selected>Open this select menu</option>

                            {countrname.map((value) => {
                              return (
                                <>
                                  <option value={value} defaultValue="india">
                                    {value}
                                  </option>
                                </>
                              );
                            })}
                          </select>
                        </div>
                        <button
                          type="submit"
                          class="btn btn-primary"
                          onClick={(e) => {
                            e.preventDefault();
                            Update_user_Information(value.id);
                          }}
                        >
                          Update Changes
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container mt-5">
                <div className="row">
                  <div className="col-lg-4 col-12">
                    <div className="card" id="card">
                      <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-3 col-3">
                          <div className="profile_card">
                            <img
                              src={imageList}
                              className="img-fluid profile_card_image"
                              alt="..."
                            />{" "}
                          </div>
                        </div>

                        <div className="col-lg-9 col-md-9 col-sm-9 col-9">
                          <h6 className="welcome_message">Hello,</h6>
                          <h2 className="user_name">{value.fullname}</h2>
                        </div>
                      </div>
                    </div>

                    <div className="card mt-4 p-1" id="card">
                      <div className="row">
                        <div className="col-lg-3 d-flex justify-content-center">
                          <div className="profile_card">
                            <BookmarkBorderIcon className="my-order-icon" />
                          </div>
                        </div>

                        <div className="col-lg-9 d-flex justify-content-between">
                          <h4
                            className="my-order"
                            onClick={() => {
                              navigate("/myorder");
                            }}
                          >
                            My Order
                          </h4>
                          <ArrowForwardIosIcon className="my-order mt-2" />
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-lg-3 d-flex justify-content-center">
                          <div className="profile_card">
                            <FolderIcon className="my-order-icon" />
                          </div>
                        </div>

                        <div className="col-lg-9 d-flex justify-content-between">
                          <div class="nav-item dropdown">
                            <a
                              class="nav-link dropdown-toggle"
                              href="#"
                              role="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <h4 className="my-order">My Document</h4>
                            </a>
                            <ul class="dropdown-menu">
                              <li>
                                <a
                                  class="dropdown-item"
                                  href={yourAadhar}
                                  target="_blank"
                                >
                                  Your Aadhar
                                </a>
                              </li>
                              <li>
                                <a class="dropdown-item" href="#">
                                  Another action
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-8 mt-2 col-12">
                    <div className="card" id="card">
                      <div className="d-flex">
                        <h3 className="personame_inforamtion_heading">
                          Personal Information
                        </h3>
                        <p
                          className="edit_button"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          Edit
                        </p>
                      </div>

                      <div className="d-flex">
                        <div className="row">
                          <div className="col-lg-6 col-12 col-sm-6 col-md-6">
                            <input
                              type="text"
                              value={value.fullname}
                              disabled
                              class="form-control input_box"
                              id="exampleInputPassword1"
                            />
                          </div>
                          <div className="col-lg-6 col-12 col-sm-6 col-md-6">
                            <input
                              type="text"
                              value={value.fullname}
                              disabled
                              class="form-control input_box"
                              id="exampleInputPassword1"
                            />
                          </div>
                        </div>
                      </div>

                      <h5 className="personame_inforamtion_heading">
                        Your Gender
                      </h5>
                      <div className="d-flex">
                        <div class="form-check gender-input">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            disabled
                            id="form-check-input"
                            checked
                          />
                          <label
                            class="form-check-label"
                            for="flexRadioDefault2"
                          >
                            Male
                          </label>
                        </div>
                        <div class="form-check gender-input">
                          <input
                            class="form-check-input"
                            disabled
                            type="radio"
                            name="flexRadioDefault"
                            id="form-check-input"
                          />
                          <label
                            class="form-check-label"
                            for="flexRadioDefault2"
                          >
                            Female
                          </label>
                        </div>
                      </div>

                      <div className="d-flex">
                        <h4 className="personame_inforamtion_heading">Email</h4>
                        <p className="edit_button">Edit</p>
                      </div>

                      <div className="d-flex">
                        <input
                          type="text"
                          value={value.email}
                          disabled
                          class="form-control input_box"
                          id="exampleInputPassword1"
                        />
                      </div>

                      <div className="d-flex">
                        <h4 className="personame_inforamtion_heading">
                          Contact number
                        </h4>
                        <p className="edit_button">Edit</p>
                      </div>

                      <div className="d-flex">
                        <input
                          type="text"
                          value={value.contactnumber}
                          disabled
                          class="form-control input_box"
                          id="exampleInputPassword1"
                        />
                      </div>

                      <div className="d-flex">
                        <h4 className="personame_inforamtion_heading">
                          Address Details
                        </h4>
                        <p className="edit_button">Edit</p>
                      </div>

                      <div className="d-flex">
                        <input
                          type="text"
                          value={value.addressline1}
                          disabled
                          class="form-control input_box"
                          id="exampleInputPassword1"
                        />
                      </div>
                      <br />
                      <div className="d-flex">
                        <input
                          type="text"
                          value={value.addressline2}
                          disabled
                          class="form-control input_box"
                          id="exampleInputPassword1"
                        />
                      </div>
                      <br />
                      <div className="row">
                        <div className="col-lg-4">
                          <div className="d-flex">
                            <input
                              type="text"
                              value={value.landmark}
                              disabled
                              class="form-control input_box"
                              id="exampleInputPassword1"
                            />
                          </div>
                        </div>

                        <div className="col-lg-4">
                          <div className="d-flex">
                            <input
                              type="text"
                              value={value.city}
                              disabled
                              class="form-control input_box"
                              id="exampleInputPassword1"
                            />
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="d-flex">
                            <input
                              type="text"
                              value={value.pincode}
                              disabled
                              class="form-control input_box"
                              id="exampleInputPassword1"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-4">
                          <div className="d-flex">
                            <h4 className="personame_inforamtion_heading">
                              Date of birth
                            </h4>
                            <p className="edit_button">Edit</p>
                          </div>

                          <div className="d-flex">
                            <input
                              type="text"
                              value={value.dateofbirth}
                              disabled
                              class="form-control input_box"
                              id="exampleInputPassword1"
                            />
                          </div>
                        </div>

                        <div className="col-lg-4">
                          <div className="d-flex">
                            <h4 className="personame_inforamtion_heading">
                              Nationality
                            </h4>
                            <p className="edit_button">Edit</p>
                          </div>

                          <div className="d-flex">
                            <input
                              type="text"
                              value={value.nationality}
                              disabled
                              class="form-control input_box"
                              id="exampleInputPassword1"
                            />
                          </div>
                        </div>

                        <div className="col-lg-4">
                          <div className="d-flex">
                            <h4 className="personame_inforamtion_heading">
                              admin?
                            </h4>
                            <p className="edit_button">Edit</p>
                          </div>

                          <div className="d-flex">
                            <input
                              type="text"
                              value={value.applyasadmin}
                              disabled
                              class="form-control input_box"
                              id="exampleInputPassword1"
                            />
                          </div>
                        </div>
                      </div>

                      <hr />
                      <h4 className="personame_inforamtion_heading">FAQs</h4>
                      <div className="Faq_Question">
                        <div className="faq-info-coontainer">
                          <h6 className="faq-info">
                            What happens when I update my email address (or
                            mobile number)?
                          </h6>

                          <p className="faq-info">
                            Your login email id (or mobile number) changes,
                            likewise. You'll receive all your account related
                            communication on your updated email address (or
                            mobile number). <hr />
                          </p>
                        </div>
                        <div className="faq-info-coontainer">
                          <h6 className="faq-info">
                            What happens when I update my email address (or
                            mobile number)?
                          </h6>

                          <p className="faq-info">
                            Your login email id (or mobile number) changes,
                            likewise. You'll receive all your account related
                            communication on your updated email address (or
                            mobile number). <hr />
                          </p>
                        </div>
                        <div className="faq-info-coontainer">
                          <h6 className="faq-info">
                            What happens when I update my email address (or
                            mobile number)?
                          </h6>

                          <p className="faq-info">
                            Your login email id (or mobile number) changes,
                            likewise. You'll receive all your account related
                            communication on your updated email address (or
                            mobile number). <hr />
                          </p>
                        </div>
                        <div className="faq-info-coontainer">
                          <h6 className="faq-info">
                            What happens when I update my email address (or
                            mobile number)?
                          </h6>

                          <p className="faq-info">
                            Your login email id (or mobile number) changes,
                            likewise. You'll receive all your account related
                            communication on your updated email address (or
                            mobile number). <hr />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })
      )}
    </>
  );
}

export default Myprofile;
