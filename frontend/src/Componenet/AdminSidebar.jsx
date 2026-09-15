import React from "react";
import { Link } from "react-router-dom";

function AdminSidebar() {
  return (
    <>
      <div className="p-4  rounded m-4 ho">
        <Link to="/UserManagement" className="hover:underline ">User Management</Link> {" > "}
        <Link to="/AllIPackagesAD" className="hover:underline">All Items Packages</Link> {" > "}
        <Link to="/ViewAllItemsAdmin" className="hover:underline">View All Items</Link> {" > "}
        <Link to="/ViewAllOrdersAD" className="hover:underline">View All Orders</Link> {" > "}
        <Link to="/ViewAllpaymentsAD" className="hover:underline">View All Payments</Link> {" > "}
        <Link to="/FeebackManageAD" className="hover:underline">Feedback Management</Link> {" > "}
      </div>
    </>
  );
}

export default AdminSidebar;
