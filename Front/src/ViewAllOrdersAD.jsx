import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminSidebar from "./Componenet/AdminSidebar";
import Navbar from "./Componenet/Navbar";

function ViewAllOrdersAD() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/API/V1/Order/fullorderDetails`
      );
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const [userData, setUserData] = React.useState({});

  useEffect(() => {
    const loginData = sessionStorage.getItem("LoginData");
    if (loginData) {
      setUserData(JSON.parse(loginData));
    }
    fetchOrders();
  }, []);

  return (
    <>
      <Navbar userData={userData} />
      <AdminSidebar />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-purple-700 text-center mb-6">
          All Customer Orders
        </h2>

        <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
          <table className="min-w-full bg-white">
            <thead className="bg-purple-700 text-white">
              <tr>
                <th className="py-2 px-4 border-b">Customer Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Phone</th>
                <th className="py-2 px-4 border-b">Address</th>
                <th className="py-2 px-4 border-b">Order Type</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Pack Title</th>
                <th className="py-2 px-4 border-b">Pack Description</th>
                <th className="py-2 px-4 border-b">Weight (KG)</th>
                <th className="py-2 px-4 border-b">1KG Price ($)</th>
                <th className="py-2 px-4 border-b">Total Amount</th>
                <th className="py-2 px-4 border-b">Order Date</th>
              </tr>
            </thead>

            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order.orderid}
                    className="hover:bg-gray-50 transition-all duration-150"
                  >
                    <td className="py-2 px-4 border-b">
                      {order.firstname} {order.lastname}
                    </td>
                    <td className="py-2 px-4 border-b">{order.email}</td>
                    <td className="py-2 px-4 border-b">{order.phoneNumber}</td>
                    <td className="py-2 px-4 border-b">
                      <Link to={order.address}>
                        <button className="text-blue-500  bg-gray-100 p-1 rounded-lg cursor-pointer hover:bg-blue-100 hover:text-blue-700 transition-all">
                          View
                        </button>
                      </Link>
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {order.orderType === "DELIVERY" ? (
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold">
                          DELIVERY
                        </span>
                      ) : (
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                          STORE PICKUP
                        </span>
                      )}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          order.orderState === "COMPLETED"
                            ? "bg-green-100 text-green-700"
                            : order.orderState === "DELIVERY"
                            ? "bg-blue-100 text-blue-700"
                            : order.orderState === "CANCELLED"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.orderState}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b">{order.packTitle}</td>
                    <td className="py-2 px-4 border-b">
                      {order.packDescription}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {order.itemWeight.toFixed(2)}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {order.oneKGprice.toFixed(2)}
                    </td>
                    <td className="py-2 px-4 border-b text-center font-semibold text-purple-700">
                      $ {order.totalAmount.toFixed(2)}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {new Date(order.orderdata).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="13"
                    className="py-4 px-4 text-center text-gray-500 font-medium"
                  >
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ViewAllOrdersAD;
