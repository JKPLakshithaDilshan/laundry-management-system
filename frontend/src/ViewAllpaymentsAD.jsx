import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./Componenet/Navbar";
import AdminSidebar from "./Componenet/AdminSidebar";

function ViewAllpaymentsAD() {
  const [payments, setPayments] = useState([]);

  const fetchPayments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/API/V1/payment/AllPayments"
      );
      setPayments(response.data);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };
  const [userData, setUserData] = React.useState({});

  useEffect(() => {
    const loginData = sessionStorage.getItem("LoginData");
    if (loginData) {
      setUserData(JSON.parse(loginData));
    }
    fetchPayments();
  }, []);

  return (
    <>
      <Navbar userData={userData} />
      <AdminSidebar />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-purple-700 text-center mb-6">
          All Payments
        </h2>

        <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
          <table className="min-w-full bg-white">
            <thead className="bg-purple-700 text-white">
              <tr>
                <th className="py-2 px-4 border-b">Method</th>
                <th className="py-2 px-4 border-b">Amount ($)</th>
                <th className="py-2 px-4 border-b">Customer Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Phone</th>
                <th className="py-2 px-4 border-b">Address</th>
                <th className="py-2 px-4 border-b">Order Type</th>
                <th className="py-2 px-4 border-b">Order Status</th>
                <th className="py-2 px-4 border-b">Item Weight (KG)</th>
                <th className="py-2 px-4 border-b">Total Amount ($)</th>
                <th className="py-2 px-4 border-b">Order Date</th>
              </tr>
            </thead>

            <tbody>
              {payments.length > 0 ? (
                payments.map((payment) => (
                  <tr
                    key={payment.paymentId}
                    className="hover:bg-gray-50 transition-all duration-150"
                  >
                    <td className="py-2 px-4 border-b text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          payment.method === "CARD"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {payment.method}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b text-center font-semibold text-green-700">
                      ${payment.amount.toFixed(2)}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {payment.firstname} {payment.lastname}
                    </td>
                    <td className="py-2 px-4 border-b">{payment.email}</td>
                    <td className="py-2 px-4 border-b">
                      {payment.phoneNumber}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <Link to={payment.address}>
                        <button className="text-blue-500  bg-gray-100 p-1 rounded-lg cursor-pointer hover:bg-blue-100 hover:text-blue-700 transition-all">
                          View
                        </button>
                      </Link>
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {payment.ordertype === "DELIVERY" ? (
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
                          payment.orderState === "COMPLETED"
                            ? "bg-green-100 text-green-700"
                            : payment.orderState === "DELIVERY"
                            ? "bg-blue-100 text-blue-700"
                            : payment.orderState === "CANCELLED"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {payment.orderState}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {payment.itemWeight.toFixed(2)}
                    </td>
                    <td className="py-2 px-4 border-b text-center font-semibold text-purple-700">
                      $ {payment.totalAmount.toFixed(2)}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {new Date(payment.orderdata).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="13"
                    className="py-4 px-4 text-center text-gray-500 font-medium"
                  >
                    No payments found.
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

export default ViewAllpaymentsAD;
