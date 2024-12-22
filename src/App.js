import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext, useEffect } from "react";
import ProjectState from "./projectcontext/ProjectState";
import Admin from "./AdminComponents/Admin";
import YourCart from "./yourcart/YourCart";
import MyOrder from "./YourOrder/MyOrder";
import UserOrders from "./AdminComponents/AdminServices/UserOrders";
import UserTickets from "./AdminComponents/AdminServices/UserTickets";
import UserTicketStatus from "./AdminComponents/AdminServices/UserTicketStatus";
import UserOrderStatus from "./AdminComponents/AdminServices/UserOrderStatus";
import PaymentConfirmation from "./yourcart/PaymentConfirmation";
import Confirmation from "./yourcart/Confirmation";
import Adminhome from "./AdminComponents/AdminDashboard/Adminhome";
import RegestrationForm from "./Authetication/Signup/RegestrationForm";
import PersonalInfo from "./Authetication/Signup/PersonalInfo";
import Loginuser from "./Authetication/Loginuser";
import Preview from "./Authetication/Signup/Preview";
import UserSignup from "./Authetication/Signup/UserSignup";
import Myprofile from "./Authetication/profile/Myprofile";
import NewProductListing from "./products/newProduct/NewProductListing";
import NewProductDetails from "./products/newProduct/NewProductDetails";
import DummyProduct from "./products/newProduct/DummyProduct";
import Newhome from "./newHome/Newhome";
import Complainent from "./Complaint/Complainent";
import FileUploaderAndDownloader from "./products/newProduct/DummyProduct";

function App() {
  const check_out_step = [
    {
      name: "Regestration",
      Component: () => <RegestrationForm />,
    },
    {
      name: "Personal Information",
      Component: () => <PersonalInfo />,
    },
    {
      name: "Preview",
      Component: () => <Preview />,
    },
  ];
  return (
    <>
      {/* <FileUploaderAndDownloader /> */}
      {/* <DummyProduct />   */}
      {/* <Dummy /> */}
      <Router>
        <ProjectState>
          <Routes>
            <Route
              exact
              path="/productdetails"
              element={<NewProductDetails />}
            />
            <Route exact path="/myprofile" element={<Myprofile />} />
            <Route
              exact
              path="/usersignup"
              element={<UserSignup stepConfig={check_out_step} />}
            />
            <Route exact path="/adminhome" element={<Adminhome />} />
            <Route
              exact
              path="/paymentconfiramtion"
              element={<PaymentConfirmation />}
            />
            <Route
              exact
              path="/userorderstatus"
              element={<UserOrderStatus />}
            />
            <Route exact path="/yourcart" element={<YourCart />} />
            <Route exact path="/raisedticket" element={<Complainent />} />

            <Route exact path="/myorder" element={<MyOrder />} />
            <Route exact path="/confirmation" element={<Confirmation />} />
            <Route exact path="/products" element={<NewProductListing />} />
            <Route exact path="/userlogin" element={<Loginuser />} />
            <Route
              exact
              path="/userticketstatus"
              element={<UserTicketStatus />}
            />
            <Route exact path="/admin" element={<Admin />} />
            <Route exact path="/userorders" element={<UserOrders />} />
            <Route exact path="/usertickets" element={<UserTickets />} />
            <Route exact path="/" element={<Newhome />} />

            <Route exact path="/admin" element={<Admin />} />
          </Routes>
        </ProjectState>
      </Router> 
    </>
  );
}

export default App;
