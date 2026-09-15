import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminPutAllItemOrders() {
  const [orders, setOrders] = useState([]);
  const [editOrder, setEditOrder] = useState(null);
  const [newQuantity, setNewQuantity] = useState('');
  const [calculatedPrice, setCalculatedPrice] = useState(0);


  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8080/API/V1/ItemOrder/AllorderNotConformd'
      );
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);


  const deleteOrder = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8080/API/V1/ItemOrder/CanselItemOrder?IteOrderId=${id}`
      );
      fetchOrders();
      window.location.reload();
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

 
  const openEditDialog = (order) => {
    setEditOrder(order);
    setNewQuantity(order.orderquantity);
    setCalculatedPrice(order.price * order.orderquantity);
  };


  const handleQuantityChange = (e) => {
    const qty = e.target.value;
    setNewQuantity(qty);
    if (editOrder) {
      const total = parseFloat(editOrder.price) * parseInt(qty || 0);
      setCalculatedPrice(total.toFixed(2));
    }
  };


  const updateOrder = async () => {
    if (!editOrder) return;

    try {
      await axios.put(
        `http://localhost:8080/API/V1/ItemOrder/UpdateQuantity?IteOrderId=${editOrder.itemsOrderId}&quantity=${newQuantity}&totalPrice=${calculatedPrice}`
      );
      alert('Order updated successfully!');
      window.location.reload();
      setEditOrder(null);
      fetchOrders();
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Failed to update order.');
    }
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#2c3e50' }}>
        Pending Orders
      </h2>

      {orders.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#7f8c8d' }}>No orders found.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              borderRadius: '10px',
            }}
          >
            <thead style={{ backgroundColor: '#2980b9', color: 'white' }}>
              <tr>
                <th style={{ padding: '12px' }}>Image</th>
                <th style={{ padding: '12px' }}>Name</th>
                <th style={{ padding: '12px' }}>Description</th>
                <th style={{ padding: '12px' }}>Order Item Price</th>
                <th style={{ padding: '12px' }}>Order Qty</th>
                <th style={{ padding: '12px' }}>Total Price</th>
                <th style={{ padding: '12px' }}>Customer</th>
                <th style={{ padding: '12px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.itemsOrderId}
                  style={{
                    backgroundColor: '#ecf0f1',
                    borderBottom: '1px solid #ddd',
                  }}
                >
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <img
                      src={order.imageUrl}
                      alt={order.name}
                      style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
                    />
                  </td>
                  <td style={{ padding: '12px' }}>{order.name}</td>
                  <td style={{ padding: '12px' }}>{order.description}</td>
                  <td style={{ padding: '12px' }}>$ {order.price}</td>
                  <td style={{ padding: '12px' }}>{order.orderquantity}</td>
                  <td style={{ padding: '12px' }}>$ {order.totalPrice}</td>
                  <td style={{ padding: '12px' }}>
                    {order.firstname} {order.lastname}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <button
                      onClick={() => openEditDialog(order)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#27ae60',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        marginRight: '6px',
                      }}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteOrder(order.itemsOrderId)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editOrder && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              background: 'white',
              padding: '20px',
              borderRadius: '10px',
              width: '400px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            }}
          >
            <h3 style={{ marginBottom: '15px', color: '#2c3e50' }}>
              Edit Quantity for {editOrder.name}
            </h3>
            <p>Item Price: ${editOrder.price}</p>

            <div style={{ marginBottom: '10px' }}>
              <label style={{ fontWeight: 'bold' }}>New Quantity:</label>
              <input
                type="number"
                value={newQuantity}
                onChange={handleQuantityChange}
                style={{
                  width: '100%',
                  padding: '8px',
                  marginTop: '5px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                }}
              />
            </div>

            <p>
              <strong>Total Price:</strong> ${calculatedPrice}
            </p>

            <div style={{ textAlign: 'right' }}>
              <button
                onClick={() => setEditOrder(null)}
                style={{
                  padding: '6px 12px',
                  marginRight: '8px',
                  borderRadius: '4px',
                  border: 'none',
                  backgroundColor: '#7f8c8d',
                  color: 'white',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>

              <button
                onClick={updateOrder}
                style={{
                  padding: '6px 12px',
                  borderRadius: '4px',
                  border: 'none',
                  backgroundColor: '#27ae60',
                  color: 'white',
                  cursor: 'pointer',
                }}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPutAllItemOrders;
