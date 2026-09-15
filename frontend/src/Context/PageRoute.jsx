import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loginpage from "../Loginpage";
import VerifyAccount from "../VerifyAccount";
import AdminHome from "../AdminHome";
import CustomerHome from "../CustomerHome";
import DeleveryHome from "../DeleveryHome";
import Home from "../Home";
import SupplierHome from "../SupplierHome";
import CustomerShowOrders from "../CustomerShowOrders";
import CustomerPaidOrders from "../CustomerPaiedOrdrs";
import UserManagement from "../Usermanagerment";
import AllIPackagesAD from "../AllIPackagesAD";
import ViewAllItemsAdmin from "../ViewAllItemsAdmin";
import ViewAllOrdersAD from "../ViewAllOrdersAD";
import ViewAllpaymentsAD from "../ViewAllpaymentsAD";
import FeebackManageAD from "../FeebackManageAD";
import Services from "../Services";
import Aboutus from "../Aboutus";
import ContactUS from "../ContactUS";


function PageRoute() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/AdminHome" element={<AdminHome />} />
          <Route path="/CustomerHome" element={<CustomerHome />} />
          <Route path="/DeleveryHome" element={<DeleveryHome />} />
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Loginpage />} />
          <Route path="/Verify" element={<VerifyAccount />} />
          <Route path="/SupplierHome" element={<SupplierHome />} />
          <Route path="/CustomerShowOrders" element={<CustomerShowOrders />} />
          <Route path="/CustomerPaidOrders" element={<CustomerPaidOrders />} />
          <Route path="/UserManagement" element={<UserManagement />} />
          <Route path="/AllIPackagesAD" element={<AllIPackagesAD />} />
          <Route path="/ViewAllItemsAdmin" element={<ViewAllItemsAdmin />} />
          <Route path="/ViewAllOrdersAD" element={<ViewAllOrdersAD />} />
          <Route path="/ViewAllpaymentsAD" element={<ViewAllpaymentsAD />} />
          <Route path="/FeebackManageAD" element={<FeebackManageAD />} />
          <Route path="/Services" element={<Services />} />
          <Route path="/Aboutus" element={<Aboutus />} />
          <Route path="/ContactUS" element={<ContactUS />} />
        </Routes>
      </Router>
    </>
  );
}

export default PageRoute;
