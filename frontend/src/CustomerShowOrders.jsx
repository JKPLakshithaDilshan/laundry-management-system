import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function CustomerShowOrders() {
  const [userData, setUserData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [method, setMethod] = useState("");
  const [itemWeight, setItemWeight] = useState("");

  const paymentMethods = ["CASH_ON_DELIVERY", "CARD", "MOBILE_WALLET"];

  const fetchOrders = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/API/V1/Order/uniqueOrders?id=${id}`
      );
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    const loginData = sessionStorage.getItem("LoginData");
    if (loginData) {
      const parsedData = JSON.parse(loginData);
      setUserData(parsedData);
      fetchOrders(parsedData.id);
    }
  }, []);

  // ---- PAYMENT HANDLERS ----
  const handlePayClick = (order) => {
    setSelectedOrder(order);
    setShowPaymentDialog(true);
  };

  const handlePaymentSubmit = async () => {
    if (!method) {
      alert("Please select a payment method");
      return;
    }

    const paymentData = {
      method: method,
      amount: selectedOrder.totalAmount,
      orderId: selectedOrder.orderid,
    };

    try {
      await axios.post(
        "http://localhost:8080/API/V1/payment/createPayment",
        paymentData
      );
      alert("Payment successful!");
      setShowPaymentDialog(false);
      setMethod("");
      setSelectedOrder(null);
      fetchOrders(userData.id);
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed!");
    }
  };

  // ---- EDIT HANDLERS ----
  const handleEditClick = (order) => {
    setSelectedOrder(order);
    setItemWeight(order.itemWeight);
    setShowEditDialog(true);
  };

  const handleUpdateOrder = async () => {
    if (!itemWeight || itemWeight <= 0) {
      alert("Please enter a valid item weight");
      return;
    }

    const updatedOrder = {
      orderid: selectedOrder.orderid,
      orderdata: selectedOrder.orderdata,
      totalAmount: parseFloat((itemWeight * selectedOrder.oneKGprice).toFixed(2)),
      itemWeight: parseFloat(itemWeight),
      customerid: selectedOrder.customerid,
      orderState: selectedOrder.orderState,
      orderType: selectedOrder.orderType,
    };

    try {
      await axios.put(
        "http://localhost:8080/API/V1/Order/updateOrder",
        updatedOrder
      );
      alert("Order updated successfully!");
      setShowEditDialog(false);
      setSelectedOrder(null);
      fetchOrders(userData.id);
    } catch (error) {
      console.error("Error updating order:", error);
      alert("Failed to update order!");
    }
  };

  // ---- DELETE HANDLER ----
  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      await axios.delete(
        `http://localhost:8080/API/V1/Order/deleteOrder?id=${orderId}`
      );
      alert("Order deleted successfully!");
      fetchOrders(userData.id);
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Failed to delete order!");
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "'Segoe UI', sans-serif" }}>
      <h2 style={{ marginBottom: "20px", color: "#333" }}>Customer Orders</h2>
      {!orders.length && <p style={{ color: "#666" }}>No orders found.</p>}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {orders.map((order) => (
          <div
            key={order.orderid}
            style={{
              flex: "1 1 300px",
              background: "#f9f9f9",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.03)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <h3 style={{ color: "#2c3e50", marginBottom: "10px" }}>
              {order.packTitle}
            </h3>
            <p style={{ fontStyle: "italic", color: "#555" }}>
              {order.packDescription}
            </p>

            <div style={{ margin: "10px 0" }}>
              <span
                style={{
                  display: "inline-block",
                  background:
                    order.orderType === "DELIVERY" ? "#4caf50" : "#ff9800",
                  color: "#fff",
                  padding: "4px 8px",
                  borderRadius: "8px",
                  fontSize: "12px",
                  marginRight: "8px",
                }}
              >
                {order.orderType}
              </span>
              <span
                style={{
                  display: "inline-block",
                  background:
                    order.orderState === "PICKUP" ? "#2196f3" : "#f44336",
                  color: "#fff",
                  padding: "4px 8px",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              >
                {order.orderState}
              </span>
            </div>

            <p>
              <strong>Order Date:</strong>{" "}
              {new Date(order.orderdata).toLocaleString()}
            </p>
            <p>
              <strong>Customer:</strong> {order.firstname} {order.lastname}
            </p>
            <p>
              <strong>Email:</strong> {order.email}
            </p>
            <p>
              <strong>Phone:</strong> {order.phoneNumber}
            </p>
            <p>
              <strong>Item Weight:</strong> {order.itemWeight} kg
            </p>
            <p>
              <strong>Price per KG:</strong> ${order.oneKGprice}
            </p>
            <p>
              <strong>Total Amount:</strong>{" "}
              <span style={{ color: "#e91e63" }}>${order.totalAmount}</span>
            </p>
            <p>
              <strong>Address:</strong>{" "}
              <Link to={order.address}>
                <button className="text-blue-500 bg-gray-100 p-1 rounded-lg hover:bg-blue-100">
                  View Map
                </button>
              </Link>
            </p>

            <button
              onClick={() => handlePayClick(order)}
              style={{
                backgroundColor: "#2196f3",
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "8px 16px",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              Pay
            </button>

            {order.orderState === "NOTPICKUP" && (
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button
                  onClick={() => handleEditClick(order)}
                  style={{
                    backgroundColor: "#4caf50",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    padding: "8px 16px",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDeleteOrder(order.orderid)}
                  style={{
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    padding: "8px 16px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ---- PAYMENT DIALOG ---- */}
      {showPaymentDialog && selectedOrder && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "30px",
              borderRadius: "12px",
              width: "400px",
              textAlign: "center",
            }}
          >
            <h3>Select Payment Method</h3>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                width: "100%",
                marginTop: "15px",
              }}
            >
              <option value="">-- Choose Method --</option>
              {paymentMethods.map((m) => (
                <option key={m} value={m}>
                  {m.replaceAll("_", " ")}
                </option>
              ))}
            </select>

            <div style={{ marginTop: "20px" }}>
              <button
                onClick={handlePaymentSubmit}
                style={{
                  backgroundColor: "#4caf50",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  marginRight: "10px",
                }}
              >
                Confirm Payment
              </button>
              <button
                onClick={() => setShowPaymentDialog(false)}
                style={{
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "8px",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---- EDIT ORDER DIALOG ---- */}
      {showEditDialog && selectedOrder && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "30px",
              borderRadius: "12px",
              width: "400px",
              textAlign: "center",
            }}
          >
            <h3>Edit Order</h3>
            <label>
              Item Weight (kg):
              <input
                type="number"
                value={itemWeight}
                onChange={(e) => setItemWeight(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "10px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                }}
              />
            </label>
            <p>
              <strong>Total Amount: </strong>${" "}
              {(itemWeight * selectedOrder.oneKGprice).toFixed(2)}
            </p>
            <div style={{ marginTop: "20px" }}>
              <button
                onClick={handleUpdateOrder}
                style={{
                  backgroundColor: "#4caf50",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  marginRight: "10px",
                }}
              >
                Save
              </button>
              <button
                onClick={() => setShowEditDialog(false)}
                style={{
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "8px",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerShowOrders;
