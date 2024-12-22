import React from 'react'
import HomeIcon from "@mui/icons-material/Home";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Person2Icon from "@mui/icons-material/Person2";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
function AdminSideNav() {
  return (
    <>
     <div className="e-com-logo">
            <h2>
              {" "}
              <b>MULI</b>-E-COMMERSE
            </h2>
          </div>
          <div className="icon">
            <div className="icon_details">
              <HomeIcon className="dashboard_icon" />{" "}
              <span className="icon_name">Home</span>
            </div>
            <div className="icon_details">
              <AddShoppingCartIcon />{" "}
              <span className="icon_name">Cart Items</span>
            </div>
            <div className="icon_details">
              <FactCheckIcon /> <span className="icon_name">User Tickets</span>
            </div>
            <div className="icon_details">
              <Person2Icon /> <span className="icon_name">Profile</span>
            </div>
            <div className="icon_details">
              <LockOpenIcon /> <span className="icon_name">Sign In</span>
            </div>
            <div className="icon_details">
              <AdminPanelSettingsIcon />{" "}
              <span className="icon_name">Admin Rights</span>
            </div>
          </div>

          <div className="upgrade-to-pro">
            <h3>Upgrade to PRO</h3>
          </div></>
  )
}

export default AdminSideNav
