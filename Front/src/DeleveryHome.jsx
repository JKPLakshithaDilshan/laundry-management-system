import React, { useEffect, useState } from "react";
import Navbar from "./Componenet/Navbar";
import axios from "axios";
import EditProfile from "./EditProfile";


function DeliveryHome() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = React.useState({});

  const allStates = [
    "NOTPICKUP",
    "PICKUP",
    "CLEANING",
    "DELIVERY",
    "COMPLETED",
  ];

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:8080/API/V1/Delevery/showDelevry"
      );
      if (!response.ok) throw new Error("Failed to fetch orders");
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = (order) => {
    try {
      const response = axios.post(
        `http://localhost:8080/API/V1/Delevery/CreateCustomerMesage`,
        order
      );
      alert("Message sent successfully!");
      console.log("Message sent successfully:", response);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this order?"
    );
    if (!confirmed) return;
    try {
      await axios.delete(
        `http://localhost:8080/API/V1/Delevery/delteOrders?orderid=${id}`
      );
      alert("Order deleted successfully!");
      fetchOrders();
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Failed to delete order. Please try again.");
    }
  };

  const handleStateChange = async (id, newState) => {
    try {
      const response = await fetch(
        `http://localhost:8080/API/V1/Delevery/updateStates?id=${id}&orderstate=${newState}`,
        { method: "PUT" }
      );
      if (!response.ok) throw new Error("Failed to update order state");
      fetchOrders();
    } catch (error) {
      console.error("Error updating order state:", error);
    }
  };

  useEffect(() => {
    const loginData = sessionStorage.getItem("LoginData");
    if (loginData) {
      setUserData(JSON.parse(loginData));
    }

    fetchOrders();
  }, []);

  if (loading) return <p className="text-center mt-4">Loading orders...</p>;
  const hasCompletedOrders = orders.some(
    (order) => order.orderState === "COMPLETED"
  );

  return (
    <>
      <Navbar userData={userData} />
      <div className="flex justify-end mt-4 mr-4">
        {" "}
        <EditProfile userData={userData} />
      </div>

      <div className="max-w-7xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl    ">
        <h2 className="text-2xl font-bold mb-10 text-center mt-4">Delivery Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">Method</th>
                <th className="py-2 px-4 border-b">Amount($)</th>
                <th className="py-2 px-4 border-b">Customer Name</th>
                <th className="py-2 px-4 border-b">Address</th>
                <th className="py-2 px-4 border-b">Order Type</th>
                <th className="py-2 px-4 border-b">Order State</th>
                <th className="py-2 px-4 border-b">Order Date</th>
                <th className="py-2 px-4 border-b">Change State</th>
                {hasCompletedOrders && (
                  <>
                    <th className="py-2 px-4 border-b">Actions</th>
                    <th className="py-2 px-4 border-b">Send Message</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{order.method}</td>
                  <td className="py-2 px-4 border-b">
                    $ {order.amount.toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {order.firstname} {order.lastname}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button className="mr-2">
                      <a
                        href={order.address}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600  "
                      >
                        View
                      </a>
                    </button>
                  </td>
                  <td className="py-2 px-4 border-b">{order.ordertype}</td>
                  <td
                    className={`py-2 px-4 border-b font-semibold ${
                      order.orderState === "NOTPICKUP"
                        ? "text-red-500"
                        : order.orderState === "PICKUP"
                        ? "text-yellow-500"
                        : order.orderState === "CLEANING"
                        ? "text-blue-500"
                        : order.orderState === "DELIVERY"
                        ? "text-indigo-500"
                        : order.orderState === "COMPLETED"
                        ? "text-green-600"
                        : "text-gray-400"
                    }`}
                  >
                    {order.orderState}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {new Date(order.orderdata).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <select
                      value={order.orderState}
                      onChange={(e) =>
                        handleStateChange(order.orderid, e.target.value)
                      }
                      className="border rounded-lg p-1 text-sm focus:ring focus:ring-purple-200"
                    >
                      {allStates.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </td>
                  {order.orderState === "COMPLETED" && (
                    <>
                      <td className="py-2 px-4 border-b">
                        <button
                          className="text-white hover:text-red-700 bg-red-400 p-2 rounded-lg"
                          onClick={() => handleDelete(order.orderid)}
                        >
                          Delete
                        </button>
                      </td>
                      <td className="py-2 px-4 border-b">
                        <button
                          className="text-white hover:text-blue-700 bg-blue-400 p-2 rounded-lg"
                          onClick={() => handleSendMessage(order)}
                        >
                          Message
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default DeliveryHome;
