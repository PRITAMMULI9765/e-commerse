import React, { useState } from "react";
import Projectcontext from "./projectContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { db, storage } from "../Authetication/Config";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { signInWithPopup } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, provider } from "../Authetication/Config";
function ProjectState(props) {
  const [errorInAadharUpload, seterrorInAadharUpload] = useState(false);
  const [errorInphotoUpload, seterrorInphotoUpload] = useState(false);
  const [sortByPrice, setSortByPrice] = useState(null);
  const [sortByRating, setSortByRating] = useState(null);
  const [deliveryProducts, setdeliveryProducts] = useState([]);
  const [productbyEmail, setProductbyEmail] = useState([]);
  const [product, setProduct] = useState([]);
  const [updatedOrderStatus, setUpdatedOrderStatus] = useState([]);
  const [updatedticketStatus, setupdatedticketStatus] = useState([]);
  const [showproductDetails, setShowProductDetails] = useState([]);
  const [myProduct, setMyProduct] = useState([]);
  const [showCategorywiseProduct, setShowCategorywiseProduct] = useState([]);
  const [YourOrder, setYourOrder] = useState([]);
  const [raisedticket, setRaisedticket] = useState([]);
  const [feedbackGivenByUser, setFeedbackGivenByUser] = useState([]);
  const [yourOrderByUserdetails, setyourOrderByUserdetails] = useState([]);
  const [credentials, setCredentials] = useState({
    email: "",
    productcategory: "",
    productid: "",
    status: "",
    productname: "",
    quantity: "",
  });

  const [imageList, setImageList] = useState([]);
  const [yourAadhar, setYourAadhar] = useState([]);

  const [countrname, setCountrname] = useState([]);
  const [errorLogin, setErrorLogin] = useState({
    email: false,
    password: false,
  });

  const [errorInregestration, setErrorInregestration] = useState({
    fullname: false,
    email: false,
    password: false,
    cpassword: false,
    dateofbirth: false,
    contactnumber: false,
    nationality: false,
    employedstatus: false,
    applyingasacourseowner: false,
    addressline1: false,
    addressline2: false,
    landmark: false,
    city: false,
    pincode: false,
  });

  const [paymentdetails, setPaymentDetails] = useState({
    cardnumber: "",
    cardholdername: "",
    cvv: "",
    expiary: "",
  });

  const [ErrorInPayment, setErrorInPayment] = useState({
    cardholdername: false,
    cardnumber: false,
    cvv: false,
  });

  const { cardholdername, cardnumber, cvv, Expiarydate } = paymentdetails;
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIscomplete] = useState(false);

  const [imageUpload, setImageUpload] = useState(null);
  const [aadharupload, setAadharupload] = useState(null);
  const [google_loginValue, setGoogleLoginValue] = useState("");

  const [usercredentials, setUserCredentials] = useState({
    fullname: "",
    email: "",
    password: "",
    cpassword: "",
    dateofbirth: "",
    contactnumber: "",
    nationality: "India",
    employedstatus: "unemployed",
    applyingasacourseowner: "no",
    applyasadmin: "no",
    addressline1: "",
    addressline2: "",
    landmark: "",
    city: "",
    pincode: "",
    isadmin: false,
    isCourseowner: false,
  });

  const [complaint, setComplaint] = useState({
    fullname: "",
    email: localStorage.getItem("email"),
    contactnumber: "",
    yourcomplaint: "",
    suggestedsolution: "",
  });
  const [margin, setMargin] = useState({
    marginLeft: 0,
    marginRight: 0,
  });

  const [detailsofProduct, setDetailsOfProduct] = useState([]);
  const [userforshop, setUserforshop] = useState([]);
  const [value, setValue] = useState("");

  const [filterProductSection, setFilterProductSection] = useState([]);

  const { email, status, productcategory, productname, quantity, productid } =
    credentials;
  const bookCollectionRef = collection(db, "cart");

  const handleclick = async () => {
    // if (customer.length > 0) {
    const responce = await fetch("https://dummyjson.com/products");
    const json = await responce.json();
    setMyProduct(json.products);
  };

  const navigate = useNavigate();
  const product_details = async (productID) => {
    const items = myProduct.filter((products) => {
      return products.id == productID;
    });

    setShowProductDetails(items);
    return items;
  };

  const timeout = () => {
    navigate("/");
  };
  const checkAuthority = () => {
    if (!localStorage.getItem("email")) {
      toast.error("login first", {
        position: "top-center",
        theme: "colored",
      });

      navigate("/");
    } else if (localStorage.getItem("email")) {
      if (localStorage.getItem("email").endsWith("@gmail.com")) {
        toast.error("Entry restricted", {
          position: "top-center",
          theme: "colored",
        });
        navigate("/");
        const myTimeOut = setTimeout(timeout, 5000);
      }
    }
  };

  const restrictUser = () => {
    if (localStorage.getItem("email") && localStorage.getItem("accesstoken")) {
      toast.error("Another session is going on! Please log-out first", {
        position: "top-center",
        theme: "colored",
      });
      const myTimeOut = setTimeout(timeout, 5000);
    }
  };
  const product_category = async (productcategory) => {
    if (window.location.pathname != "/productcategory") {
      navigate("/productcategory");
    }
    const items = await myProduct.filter((products) => {
      return products.category == productcategory;
    });

    setShowCategorywiseProduct(items);
    return items;
  };

  // function for add items in cart is started
  const productCollectionRef = collection(db, "cart");

  const addProduct = (newproduct) => {
    return addDoc(productCollectionRef, newproduct);
  };

  const updateProduct = (id, updatedProduct) => {
    const productDoc = doc(db, "cart", id);
    return updateDoc(productDoc, updatedProduct);
  };

  const deleteProduct = (id) => {
    const productDoc = doc(db, "cart", id);
    return deleteDoc(productDoc);
  };

  const getAllProduct = () => {
    return getDocs(productCollectionRef);
  };

  const getIndividualProduct = (id) => {
    const productDoc = doc(db, "cart", id);
    return getDoc(productDoc);
  };

  const getProducts = async () => {
    const data = await getAllProduct();
    setProduct(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
  };

  const deletehandler = async (id) => {
    await deleteProduct(id);
    toast.success(`Your item was remove`, {
      position: "top-center",
      theme: "colored",
    });
    getProducts();
  };
  const addData = (newBooks) => {
    return addDoc(bookCollectionRef, newBooks);
  };

  const reducer = (state, action) => {
    if (state >= 1) {
      if (action.type == "INCREAMENT") {
        return state + 1;
      }

      if (action.type === "DECREAMENT") {
        return state - 1;
      }
    } else if (state < 1) {
      state = state + 1;
      return state;
    }
  };

  const orderCollectionRef = collection(db, "orders");

  const Order_product_collection = (neworder) => {
    return addDoc(orderCollectionRef, neworder);
  };
  const Cancel_Your_order = (id) => {
    const productDoc = doc(db, "orders", id);
    return deleteDoc(productDoc);
  };

  const Cancel_order_handler = async (id) => {
    await Cancel_Your_order(id);
    getProductsThat_You_Buy();
  };
  const getAllProductsThatYouBuy = () => {
    return getDocs(orderCollectionRef);
  };

  const getProductsThat_You_Buy = async () => {
    const data = await getAllProductsThatYouBuy();
    setYourOrder(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
  };

  const UserOrder_by_user_details = async (email) => {
    const items = YourOrder.filter((cartdishes) => {
      return cartdishes.email == email;
    });

    setyourOrderByUserdetails(items);
    return items;
  };

  // cancel the user order
  const reason_of_cancelThe_order = async (
    docID,
    reasontocancel,
    detailreasontocancel,
    status
  ) => {
    try {
      // Reference to the specific document
      const orderDocRef = doc(orderCollectionRef, docID);

      // Update the status field of the specific document
      await updateDoc(orderDocRef, {
        reasontocancel: reasontocancel,
        detailreasontocancel: detailreasontocancel,
        status: status, // Set the status to "deliver"
      });
      toast.success(`Your order is cancel`, {
        position: "top-center",
        theme: "colored",
      });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  // function for add item in cart is end

  // raised ticket start
  const raisedTicketCollectionRef = collection(db, "RaisedTicket");
  const feedbackgivenCollectionRef = collection(db, "feedback");
  const addTicket = (newticket) => {
    return addDoc(raisedTicketCollectionRef, newticket);
  };

  const updateTicket = (id, updatedTicket) => {
    const RaisedTicketDoc = doc(db, "RaisedTicket", id);
    return updateDoc(RaisedTicketDoc, updatedTicket);
  };

  const deleteRaisedTicket = (id) => {
    const RaisedTicketDoc = doc(db, "RaisedTicket", id);
    return deleteDoc(RaisedTicketDoc);
  };

  const getAllRaisedTicket = () => {
    return getDocs(raisedTicketCollectionRef);
  };

  const getIndividualRaisedTicket = (id) => {
    const RaisedTicketDoc = doc(db, "RaisedTicket", id);
    return getDoc(RaisedTicketDoc);
  };

  const getRaisedTicket = async () => {
    const data = await getAllRaisedTicket();
    setRaisedticket(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
  };

  const deleteRaisedTickethandler = async (id) => {
    await deleteRaisedTicket(id);
    getRaisedTicket();
  };
  const addRaisedTicket = (newBooks) => {
    return addDoc(raisedTicketCollectionRef, newBooks);
  };
  // raised ticket end

  // feedback given by people section start
  const getAllFeedback = () => {
    return getDocs(feedbackgivenCollectionRef);
  };

  const getFeedbacks = async () => {
    const data = await getAllFeedback();
    setFeedbackGivenByUser(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
  };

  const RaisedTicket_collection = (newraisedticket) => {
    return addDoc(raisedTicketCollectionRef, newraisedticket);
  };
  const Reais_ticket_from_here = async (
    fullname,
    email,
    contactnumber,
    yourcomplaint,
    suggestedsolution
  ) => {
    console.log( fullname,
      email,
      contactnumber,
      yourcomplaint,
      suggestedsolution)
    const Your_raised_ticket = {
      fullname,
      email,
      contactnumber,
      yourcomplaint,
      suggestedsolution,
    };

    try {
      await RaisedTicket_collection(Your_raised_ticket);
      toast.success(
        `Your ticket is raised SuccessFully. Regfer My Raised Ticket`,
        {
          position: "top-center",
          theme: "colored",
        }
      );
    } catch (error) {
      console.log("error", error);
    }
  };
  const updateSubjectOfRaisedTicketByUser = async (
    documentId,
    concern,
    subject
  ) => {
    try {
      // Reference to the specific document
      const orderDocRef = doc(raisedTicketCollectionRef, documentId);

      // Update the status field of the specific document

      const confurmaction = prompt(
        "Are you really want to update? If tes then enter Email"
      );

      if (confurmaction == localStorage.getItem("email")) {
        await updateDoc(orderDocRef, {
          concern: concern,
          subject: subject,
        });
        toast.success(`Congractulation! Your ticket is updated`, {
          position: "top-center",
          theme: "colored",
        });

        localStorage.removeItem("ticketsID");
      } else {
        toast.error(`UnAutherised user`, {
          position: "top-center",
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // re-open the ticket by user
  const reopen_the_ticketBy_user = async (
    documentId,
    status,
    concern,
    subject
  ) => {
    try {
      // Reference to the specific document
      const orderDocRef = doc(raisedTicketCollectionRef, documentId);

      // Update the status field of the specific document

      const confurmaction = prompt(
        "Are you really want to update? If tes then enter Email"
      );

      if (confurmaction == localStorage.getItem("email")) {
        await updateDoc(orderDocRef, {
          concern: concern,
          subject: subject,
          status: status,
        });
        toast.success(`Congractulation! Your ticket is updated`, {
          position: "top-center",
          theme: "colored",
        });

        localStorage.removeItem("reOpenTicketID");
      } else {
        toast.error(`UnAutherised user`, {
          position: "top-center",
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const Give_the_solution_by_admin = async (
    documentId,
    status,
    resolveby,
    reasonofissue,
    solutionofissue
  ) => {
    try {
      // Reference to the specific document
      const orderDocRef = doc(raisedTicketCollectionRef, documentId);

      // Update the status field of the specific document

      const confurmaction = prompt(
        "Are you really want to update? If tes then enter Email"
      );

      if (confurmaction == localStorage.getItem("email")) {
        await updateDoc(orderDocRef, {
          status: status,
          actionby: resolveby,
          reasonofissue: reasonofissue,
          solution: solutionofissue,
        });
        toast.success(`Congractulation! Your ticket is updated`, {
          position: "top-center",
          theme: "colored",
        });
      } else {
        toast.error(`UnAutherised user`, {
          position: "top-center",
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Add to cart
  const confirm_login = () => {
    if (!localStorage.getItem("email")) {
      toast.error(`Please login first`, {
        position: "top-center",
        theme: "colored",
      });

      navigate("/");
    }
  };

  const AddToCartCollectionRef = collection(db, "cart");

  const Add_To_cart_collection = (newcart) => {
    return addDoc(AddToCartCollectionRef, newcart);
  };
  const Add_To_Cart = async (
    email,
    price,
    productcategory,
    productid,
    productname,
    quantity,
    imageurl
  ) => {
    const new_Cart = {
      email,
      price,
      productcategory,
      productid,
      productname,
      quantity,
      imageurl,
    };

    try {
      if (!localStorage.getItem("email")) {
        toast.error(`Please login first`, {
          position: "top-center",
          theme: "colored",
        });
        navigate("/adminlogin");
      } else {
        await Add_To_cart_collection(new_Cart);
        toast.success(`${productname} is added in cart`, {
          position: "top-center",
          theme: "colored",
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  // update the order
  const Update_user_orders_ForAdmin = async (docID, status, actionby) => {
    try {
      // Reference to the specific document
      const orderDocRef = doc(orderCollectionRef, docID);

      // Update the status field of the specific document
      await updateDoc(orderDocRef, {
        status: status,
        actionby: actionby, // Set the status to "deliver"
      });
      toast.success(`Congractulation! Your status is updated`, {
        position: "top-center",
        theme: "colored",
      });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const Reject_user_orders_By_Admin = async (
    docID,
    status,
    actionby,
    reasonofrejection
  ) => {
    try {
      // Reference to the specific document
      const orderDocRef = doc(orderCollectionRef, docID);

      // Update the status field of the specific document
      await updateDoc(orderDocRef, {
        status: status,
        actionby: actionby,
        reasonofrejection: reasonofrejection, // Set the status to "deliver"
      });
      toast.success(`Congractulation! Your status is updated`, {
        position: "top-center",
        theme: "colored",
      });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // feedback from user
  const Customer_feedback_collection = collection(db, "customer_feedback");

  const Feedback_from_customer_collection = (newcustomerfeedback) => {
    return addDoc(Customer_feedback_collection, newcustomerfeedback);
  };
  const feedback_from_user = async (
    userID,
    email,
    customername,
    feedbackreletedto,
    leavetherating,
    moreaboutservice
  ) => {
    const Customer_feedback = {
      userID,
      email,
      customername,
      feedbackreletedto,
      leavetherating,
      moreaboutservice,
    };

    try {
      await Feedback_from_customer_collection(Customer_feedback);
      toast.success(`Your feedback is Register.`, {
        position: "top-center",
        theme: "colored",
      });
      localStorage.removeItem("feedbackformID");
    } catch (error) {
      console.log("error", error);
    }
  };

  // login the user
  const handleLogin = async (email, password) => {
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Login successful
      toast.success("Congratulations! You are logged-in", {
        position: "top-center",
        theme: "colored",
      });
      localStorage.setItem("accesstoken", auth.currentUser.accessToken);
      localStorage.setItem("email", auth.currentUser.email);
      const goThere = setTimeout(timeout, 3000);
      // You can redirect the user to a different page or perform other actions here
    } catch (error) {
      alert(
        toast.error("Invalid Credentials!", {
          position: "top-center",
          theme: "colored",
        })
      );
      console.error("Error signing in:", error);
      // Handle login error, display an error message, etc.
    }
  };

  const Ticket_Status_Fot_the_Admin = async (status) => {
    navigate("/userticketstatus");
    const updated_tickets_by_admin = await raisedticket.filter((tickerts) => {
      return tickerts.status == status;
    });
    setupdatedticketStatus(updated_tickets_by_admin);
  };

  const Order_status_for_the_admin = async (orderStatus) => {
    navigate("/userorderstatus");
    const updated_order_status_by_admin = await YourOrder.filter((status) => {
      return status.status == orderStatus;
    });

    setUpdatedOrderStatus(updated_order_status_by_admin);
  };

  const getCartItemsByEmail = async (email) => {
    const items = await product.filter((products) => {
      return products.email == email;
    });

    setProductbyEmail(items);

    console.log("items", items);
    return items;
  };

  // Function to handle sorting by price
  const handleSortByPrice = () => {
    const sortedProducts = [...myProduct];
    sortedProducts.sort((a, b) => b.price - a.price); // Sort from high to low
    setMyProduct(sortedProducts);
    setSortByPrice("highToLow");
  };

  const handlePriceLowToHigh = () => {
    const sortedProducts = [...myProduct];
    sortedProducts.sort((a, b) => a.price - b.price); // Sort from high to low
    setMyProduct(sortedProducts);
    setSortByPrice("highToLow");
  };

  const handleProductBySortedCategory = () => {
    const sortedByCategory = [...showCategorywiseProduct];
    sortedByCategory.sort((a, b) => b.price - a.price);
    setShowCategorywiseProduct(sortedByCategory);
    setSortByPrice("highToLow");
  };

  const handleSortByRatingsByCategory = () => {
    const sortedProductsCategoryByRaings = [...showCategorywiseProduct];
    sortedProductsCategoryByRaings.sort((a, b) => b.rating - a.rating);
    setShowCategorywiseProduct(sortedProductsCategoryByRaings);
    setSortByRating("highToLow");
  };
  const handleSortByRatings = () => {
    const sortedProductsByRaings = [...myProduct];
    sortedProductsByRaings.sort((a, b) => b.rating - a.rating);
    setMyProduct(sortedProductsByRaings);
    setSortByRating("highToLow");
  };

  let arr = [];

  const handleSortChange = (e) => {
    const selectedOption = e.target.value;

    if (selectedOption === "highToLow") {
      handleSortByPrice();
    } else if (selectedOption == "byRating") {
      handleSortByRatings();
    } else if (selectedOption == "LowToHigh") {
      handlePriceLowToHigh();
    } else {
      // Handle other sorting options (e.g., by rating)
    }
  };

  const handleSortChangeByCategory = (e) => {
    const selectedOption = e.target.value;

    if (selectedOption === "highToLow") {
      handleProductBySortedCategory();
    } else if (selectedOption == "byRating") {
      handleSortByRatingsByCategory();
    } else {
      // Handle other sorting options (e.g., by rating)
    }
  };

  const onSubmit = (email, password) => {
    const emailError = email.trim() == "";
    const passwordShouldcontail = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    passwordShouldcontail.test(password);
    const passwordError = password.trim() == "";
    const passwordContain = passwordShouldcontail;

    setErrorLogin({ email: emailError, password: passwordError });

    if (!emailError && !passwordError && passwordShouldcontail) {
      handleLogin(email, password);
    } else {
      toast.error("Every filed is important or Check password length", {
        position: "top-center",
        theme: "colored",
      });
    }
  };

  const handlegoogleSignIn = () => {
    signInWithPopup(auth, provider).then((data) => {
      setGoogleLoginValue(data.user.email);
      localStorage.setItem("email", data.user.email);
      setGoogleLoginValue(localStorage.getItem("email"));
      toast.success(`You are signin`, {
        position: "top-center",
        theme: "colored",
      });
      navigate("/");
    });
  };

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        toast.success("Your session is log-out", {
          position: "top-center",
          theme: "colored",
        });
        localStorage.clear();
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  const validatePaymentDetails = async (
    email,
    totalBillToPay,
    your_product,
    status,
    actionby,
    cardholdername,
    cardnumber,
    cvv,
    expiary
  ) => {
    const your_product_length_error = your_product.length == 0;
    const cardholdernameError = cardholdername.trim() == "";
    const cardnumbererror = cardnumber.trim() == "" || cardnumber.length != 16;
    const cvvError = cvv.trim() == "" || cvv.length != 3;

    setErrorInPayment({
      cardnumber: cardnumbererror,
      cardholdername: cardholdernameError,
      cvv: cvvError,
    });

    if (!your_product_length_error) {
      if (!cardholdernameError && !cardnumbererror && !cvvError) {
        const new_ordered_product = {
          email,
          totalBillToPay,
          your_product,
          status,
          actionby,
          cardnumber,
          cardholdername,
          cvv,
          expiary,
        };
        await Order_product_collection(new_ordered_product);
        toast.success(`Thank you for Placing the order`, {
          position: "top-center",
          theme: "colored",
        });
      } else {
      }
    } else {
      toast.error(`Please add items`, {
        position: "top-center",
        theme: "colored",
      });
    }
  };
  const validateNewUser = (
    fullname,
    email,
    password,
    cpassword,
    dateofbirth,
    contactnumber,
    nationality,
    employedstatus,
    applyasadmin,
    addressline1,
    addressline2,
    landmark,
    city,
    pincode,
    aadharupload,
    imageupload
  ) => {
    const emailError = email.trim() == "";
    const passwordShouldcontail = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    passwordShouldcontail.test(password);
    const passwordError = password.trim() == "";
    const cpasswordError = cpassword.trim() == "";
    const fullnameError = fullname.trim() == "";
    const dateofbirthError = dateofbirth.trim() == "";
    const contactnumberError = contactnumber.trim() == "";
    const addressline1Error = addressline1.trim() == "";
    const addressline2Error = addressline2.trim() == "";
    const cityError = city.trim() == "";
    const landmarkError = landmark.trim() == "";
    const pincodeError = pincode.trim() == "";

    const contactnumberLengthError = contactnumber.trim().length != "10";
    const dateofbirthLengthError = dateofbirth.trim().length != "10";

    const errorinaadhar = aadharupload == null;
    const errorInImage = imageUpload == null;

    seterrorInAadharUpload(errorinaadhar);
    seterrorInphotoUpload(errorInImage);

    setErrorInregestration({
      email: emailError,
      password: passwordError,
      fullname: fullnameError,
      contactnumber: contactnumberError,
      addressline1: addressline1Error,
      addressline2: addressline2Error,
      landmark: landmarkError,
      city: cityError,
      pincode: pincodeError,
    });

    if (
      !dateofbirthLengthError &&
      !contactnumberLengthError &&
      !errorInregestration.email &&
      !errorInregestration.password &&
      !errorInregestration.password &&
      !errorInregestration.contactnumber &&
      !errorInregestration.cpassword &&
      !errorInregestration.addressline1 &&
      !errorInregestration.addressline2 &&
      !errorInregestration.landmark &&
      !errorInregestration.city &&
      !errorInregestration.pincode &&
      !errorInAadharUpload &&
      !errorInphotoUpload
    ) {
      if (password == cpassword) {
        handleSignup(
          email,
          password,
          fullname,
          dateofbirth,
          contactnumber,
          nationality,
          employedstatus,
          applyasadmin,
          addressline1,
          addressline2,
          landmark,
          city,
          pincode
        );
      } else {
        toast.error("Password is not matching", {
          position: "top-center",
          theme: "colored",
        });
      }
    } else {
      toast.error("Something went wrong", {
        position: "top-center",
        theme: "colored",
      });
    }
  };

  const handleSignup = async (
    email,
    password,
    fullname,
    dateofbirth,
    contactnumber,
    nationality,
    employedstatus,
    applyasadmin,
    addressline1,
    addressline2,
    landmark,
    city,
    pincode
  ) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      registeruser(
        fullname,
        email,
        dateofbirth,
        contactnumber,
        nationality,
        employedstatus,
        applyasadmin,
        addressline1,
        addressline2,
        landmark,
        city,
        pincode
      );
      toast.success(`Your account is created successfully.`, {
        position: "top-center",
        theme: "colored",
      });
    } catch (error) {
      toast.error(`email is already in use`, {
        position: "top-center",
        theme: "colored",
      });
    }
  };

  const onChange = (e) => {
    console.log(e.target.name, e.target.value);
    setUserCredentials({ ...usercredentials, [e.target.name]: e.target.value });
  };

  const new_user_regestration_collection = collection(db, "new_user");

  const new_user_regestration = (newuser) => {
    return addDoc(new_user_regestration_collection, newuser);
  };

  const registeruser = async (
    fullname,
    email,
    dateofbirth,
    contactnumber,
    nationality,
    employedstatus,
    applyasadmin,
    addressline1,
    addressline2,
    landmark,
    city,
    pincode
  ) => {
    uploadImage(email);

    const new_user = {
      fullname,
      email,
      dateofbirth,
      contactnumber,
      nationality,
      employedstatus,
      applyasadmin,
      addressline1,
      addressline2,
      landmark,
      city,
      pincode,
    };
    try {
      await new_user_regestration(new_user);
      toast.success(`regestration Successful 123`, {
        position: "top-center",
        theme: "colored",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = (email) => {
    if (imageUpload == null || aadharupload == null) {
      alert("Plese upload the file");
      return;
    }
    const imageRef = ref(storage, `docs/${email}/images/profilePhoto`);

    const aadharRef = ref(storage, `docs/${email}/aadhar/aadharCard`);

    const resumeRef = ref(storage, `docs/${email}/resume/candidateResume`);
    uploadBytes(imageRef, imageUpload).then(() => {
      toast.success(`Photo uploaded`, {
        position: "top-center",
        theme: "colored",
      });
    });

    uploadBytes(aadharRef, aadharupload).then(() => {
      toast.success(`aadhar uploaded`, {
        position: "top-center",
        theme: "colored",
      });
    });
  };

  const country = async () => {
    await fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        // Extract country names
        const countryNames = data.map((country) => country.name.common);

        // Sort the country names alphabetically
        const sortedCountryNames = countryNames.sort((a, b) =>
          a.localeCompare(b)
        );

        // Log the sorted country names
        setCountrname(sortedCountryNames);
      })
      .catch((error) => console.error("Error fetching country data:", error));
  };

  const getAllUserForShop = () => {
    return getDocs(new_user_regestration_collection);
  };

  const getUserForShop = async () => {
    const data = await getAllUserForShop();
    setUserforshop(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
  };

  const UpdateContactDetails = async (
    docID,
    addressline1,
    addressline2,
    city,
    pincode,
    contactnumber
  ) => {
    try {
      console.log(
        docID,
        addressline1,
        addressline2,
        city,
        pincode,
        contactnumber
      );
      // Reference to the specific document
      const update_new_user_regestration_collection = doc(
        new_user_regestration_collection,
        docID
      );

      // Update the status field of the specific document
      await updateDoc(update_new_user_regestration_collection, {
        addressline1: addressline1,
        addressline2: addressline2,
        city: city,
        pincode: pincode,
        contactnumber: contactnumber,
      });
      toast.success(`Congractulation! Your info is updated successfully`, {
        position: "top-center",
        theme: "colored",
      });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  const aadharRef = ref(
    storage,
    `docs/${localStorage.getItem("email")}/aadhar/`
  );

  const imageListRef = ref(
    storage,
    `docs/${localStorage.getItem("email")}/images/`
  );
  const fetchImagesfromStorage = () => {
    listAll(imageListRef).then((response) => {
      console.log(response);
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
  };

  const fetchAadharfromStorage = () => {
    listAll(aadharRef).then((response) => {
      console.log(response);
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setYourAadhar((prev) => [...prev, url]);
        });
      });
    });
  };

  const handlePaymentChange = (e) => {
    console.log(e.target.value, e.target.name);
    setPaymentDetails({ ...paymentdetails, [e.target.name]: e.target.value });
  };

  let displayhello = () => {
    let hello = document.getElementById("form");
    const place_order = document.getElementById("Place_order");
    hello.classList.add("showpaymerntform");
    hello.classList.remove("hidepaymerntform");
    place_order.classList.add("d-none");
  };

  let productarr = [];
  const filterProduct = async () => {
    await myProduct.map((value) => {
      if (!productarr.includes(value.category)) {
        productarr.push(value.category);
      }
      setFilterProductSection(productarr);
    });
  };

  const showProductDetails = async (id) => {
    const productDetails = await myProduct.filter((productID) => {
      return productID.id == id;
    });
    setDetailsOfProduct(productDetails);
  };

  const filterProductByCategory = async (category) => {
    console.log(category);
    const your_category_product = await myProduct.filter((product) => {
      // console.log(product)
      return product.category == category;
    });

    console.log(your_category_product);

    setFilteredProducts(your_category_product);
  };

  const onComplaint = (e) => {
    console.log(e.target.name, e.target.value);
    setComplaint({ ...complaint, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Projectcontext.Provider
        value={{
          complaint, onComplaint, 
          filterProductByCategory,
          filterProduct,
          UpdateContactDetails,
          detailsofProduct,
          showProductDetails,
          filterProduct,
          filterProductSection,
          displayhello,
          ErrorInPayment,
          setErrorInPayment,
          validatePaymentDetails,
          handlePaymentChange,
          paymentdetails,
          setPaymentDetails,
          fetchAadharfromStorage,
          yourAadhar,
          imageList,
          setImageList,
          fetchImagesfromStorage,
          userforshop,
          getUserForShop,
          setImageUpload,
          setAadharupload,
          country,
          countrname,
          errorInregestration,
          setErrorInregestration,
          onChange,
          validateNewUser,
          errorLogin,
          userSignOut,
          setErrorLogin,
          onSubmit,
          usercredentials,
          setUserCredentials,
          handlegoogleSignIn,
          handleSortChange,
          handleSortChangeByCategory,
          handleProductBySortedCategory,
          handleSortByRatings,
          getCartItemsByEmail,
          handleSortByPrice,
          sortByPrice,
          productbyEmail,
          deliveryProducts,
          Order_status_for_the_admin,
          updatedOrderStatus,
          Ticket_Status_Fot_the_Admin,
          updatedticketStatus,
          handleLogin,
          feedback_from_user,
          reopen_the_ticketBy_user,
          Add_To_Cart,
          getFeedbacks,
          feedbackGivenByUser,
          setFeedbackGivenByUser,
          raisedticket,
          reducer,
          setRaisedticket,
          deleteRaisedTickethandler,
          Reject_user_orders_By_Admin,
          product,
          getRaisedTicket,
          Cancel_order_handler,
          setProduct,
          deletehandler,
          getProducts,
          addProduct,
          updateProduct,
          margin,
          setMargin,
          currentStep,
          setCurrentStep,
          deleteProduct,
          confirm_login,
          getAllProduct,
          getIndividualProduct,
          Update_user_orders_ForAdmin,
          updateSubjectOfRaisedTicketByUser,
          timeout,
          product_category,
          showCategorywiseProduct,
          setShowCategorywiseProduct,
          getProductsThat_You_Buy,
          UserOrder_by_user_details,
          YourOrder,
          setYourOrder,
          setyourOrderByUserdetails,
          yourOrderByUserdetails,
          handleclick,
          Give_the_solution_by_admin,
          isComplete,
          setIscomplete,
          restrictUser,
          myProduct,
          checkAuthority,
          setMyProduct,
          product_details,
          Reais_ticket_from_here,
          showproductDetails,
          reason_of_cancelThe_order,
          setShowProductDetails,
        }}
      >
        {props.children}
      </Projectcontext.Provider>
      <ToastContainer />
    </>
  );
}

export default ProjectState;
