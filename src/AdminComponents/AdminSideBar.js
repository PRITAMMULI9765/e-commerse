import React, { useContext } from "react";
import home from "../Images/home.jpg";
import { useNavigate } from "react-router-dom";
import userOrder from "../Images/userorders.png";
import userticket from "../Images/usertickets.jpg";
import cancel from "../Images/cancelorder.jpg";
import resolve from "../Images/resolve.jfif";
import pending from "../Images/pending.jfif"
import projectcontext from "../projectcontext/projectContext";

function AdminSideBar() {
  const context = useContext(projectcontext);
  const { Order_status_for_the_admin, Ticket_Status_Fot_the_Admin } = context;
  const navigate = useNavigate();
  return (
    <>
      <div id="navbarNav">
        <div className="side_nav row">
          <div
            className="icons_name col-lg-3 col-2"
            onClick={() => {
              navigate("/");
            }}
          >
            <img src={home} alt="" className="icons_images" />
            <p className="icon_title">Home</p>
          </div>

          <div
            className="icons_name col-lg-3 col-2"
            onClick={() => {
              navigate("/usertickets");
            }}
          >
            <img src={userticket} alt="" className="icons_images" />
            <p className="icon_title">User Ticket</p>
          </div>

          <div
            className="icons_name col-lg-3 col-2"
            onClick={() => {
              navigate("/userorders");
            }}
          >
            <img src={userOrder} alt="" className="icons_images" />
            <p className="icon_title">User Orders</p>
          </div>

          {window.location.pathname == "/userorders" ||
          window.location.pathname == "/userorderstatus" ? (
            <>
              <div
                className="icons_name col-lg-3 col-2"
                onClick={() => {
                  Order_status_for_the_admin("pending");
                }}
              >
                <img src={pending} alt="" className="icons_images" />
                <p className="icon_title">Pending</p>
              </div>
              <div
                className="icons_name col-lg-3 col-2"
                onClick={() => {
                  Order_status_for_the_admin("cancel");
                }}
              >
                <img src={cancel} alt="" className="icons_images" />
                <p className="icon_title">Cancel Orders</p>
              </div>

              <div
                className="icons_name col-lg-3 col-2"
                onClick={() => {
                  Order_status_for_the_admin("deliver");
                }}
              >
                <img src={resolve} alt="" className="icons_images" />
                <p className="icon_title">Delivered</p>
              </div>
              <div
                className="icons_name col-lg-3 col-2"
                onClick={() => {
                  Order_status_for_the_admin("reject");
                }}
              >
                <img src={cancel} alt="" className="icons_images" />
                <p className="icon_title">Rejected</p>
              </div>
            </>
          ) : (
            <div
              className="icons_name col-lg-3 col-3 d-none"
              onClick={() => {
                navigate("/usertickets");
              }}
            >
              <img src={userticket} alt="" className="icons_images" />
              <p className="icon_title">User Ticket</p>
            </div>
          )}
          {window.location.pathname == "/usertickets" ||
          window.location.pathname == "/userticketstatus" ? (
            <>
              <div
                className="icons_name col-lg-3 col-2"
                onClick={() => {
                  Ticket_Status_Fot_the_Admin("resolve");
                }}
              >
                <img src={resolve} alt="" className="icons_images" />
                <p className="icon_title">Resolve Tickets</p>
              </div>
              <div
                className="icons_name col-lg-3 col-2"
                onClick={() => {
                  Ticket_Status_Fot_the_Admin("pending");
                }}
              >
                <img src={cancel} alt="" className="icons_images" />
                <p className="icon_title">Pending Tickets</p>
              </div>
            </>
          ) : (
            <div
              className="icons_name col-lg-3 col-3 d-none"
              onClick={() => {
                navigate("/usertickets");
              }}
            >
              <img src={userticket} alt="" className="icons_images" />
              <p className="icon_title">User Ticket</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminSideBar;
