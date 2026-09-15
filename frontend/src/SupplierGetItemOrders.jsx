import React, { useState, useEffect } from "react";
import axios from "axios";

function SupplierGetItemOrders() {
  const [orders, setOrders] = useState([]);
  const [userData, setUserData] = useState(null); 


  const fetchOrders = async (supplierId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/API/V1/ItemOrder/AllItemsOrders?supplierId=${supplierId}`
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

 
  const updateOrderState = async (id) => {
    try {
      await axios.put(
        `http://localhost:8080/API/V1/ItemOrder/changeStates?IteOrderId=${id}`
      );
      if (userData) fetchOrders(userData.id); 
    } catch (error) {
      console.error("Error updating order state:", error);
    }
  };

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ padding: "30px", fontFamily: "Arial, sans-serif" }}>
      <h2
        style={{ textAlign: "center", marginBottom: "20px", color: "#2c3e50" }}
      >
        Supplier Orders
      </h2>

      {orders.length === 0 ? (
        <p style={{ textAlign: "center", color: "#7f8c8d" }}>
          No orders found.
        </p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              borderRadius: "10px",
            }}
          >
            <thead style={{ backgroundColor: "#2980b9", color: "white" }}>
              <tr>
                <th style={{ padding: "12px" }}>Item Name</th>
                <th style={{ padding: "12px" }}>Image</th>
                <th style={{ padding: "12px" }}>Description</th>
                <th style={{ padding: "12px" }}>Price</th>
                <th style={{ padding: "12px" }}>Stock</th>
                <th style={{ padding: "12px" }}>Order Qty</th>
                <th style={{ padding: "12px" }}>Total Price</th>
                <th style={{ padding: "12px" }}>Order Type</th>
                <th style={{ padding: "12px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.itemsOrderId}
                  style={{
                    backgroundColor: "#ecf0f1",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  <td style={{ padding: "10px" }}>{order.name}</td>
                  <td style={{ padding: "10px", textAlign: "center" }}>
                    <img
                      src={order.imageUrl}
                      alt={order.name}
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  </td>

                  <td style={{ padding: "10px" }}>{order.description}</td>
                  <td style={{ padding: "10px" }}>$ {order.price}</td>
                  <td style={{ padding: "10px" }}>{order.quantity}</td>
                  <td style={{ padding: "10px" }}>{order.orderquantity}</td>
                  <td style={{ padding: "10px" }}>$ {order.totalPrice}</td>

                  <td
                    style={{
                      padding: "10px",
                      color:
                        order.orderType === "REQUEST" ? "#e67e22" : "#27ae60",
                    }}
                  >
                    {order.orderType}
                  </td>
                  <td style={{ padding: "10px", textAlign: "center" }}>
                    {order.orderType === "REQUEST" && (
                      <button
                        onClick={() => updateOrderState(order.itemsOrderId)}
                        style={{
                          padding: "6px 12px",
                          backgroundColor: "#27ae60",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Conform
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SupplierGetItemOrders;
