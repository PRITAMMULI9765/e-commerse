import React from "react";
import AdminSideNav from "./AdminSideNav";
import UserOrder from "../orders/UserOrder";

function Adminhome() {
  return (
    <>
      <div className="row">
        <div className="col-lg-3">
         <AdminSideNav />
        </div>

        <div className="col-lg-8">
<UserOrder />
        </div>
      </div>
    </>
  );
}

export default Adminhome;
