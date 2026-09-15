import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CompanyStore() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/API/V1/ItemOrder/AllStoreItems'
        );
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#2c3e50' }}>
        Company Store Items
      </h2>

      {items.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#7f8c8d' }}>No items found.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'separate',
              borderSpacing: '0',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              borderRadius: '10px',
              overflow: 'hidden',
            }}
          >
            <thead>
              <tr style={{ backgroundColor: '#2980b9', color: 'white', textAlign: 'left' }}>
                <th style={{ padding: '12px' }}>Image</th>
                <th style={{ padding: '12px' }}>Item Name</th>
                <th style={{ padding: '12px' }}>Description</th>
                <th style={{ padding: '12px' }}>Price</th>
                <th style={{ padding: '12px' }}>Stock</th>
                <th style={{ padding: '12px' }}>Order Qty</th>
                <th style={{ padding: '12px' }}>Total Price</th>
                <th style={{ padding: '12px' }}>Phone</th>
                <th style={{ padding: '12px' }}>Customer</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor: index % 2 === 0 ? '#ecf0f1' : '#ffffff',
                    transition: 'background 0.3s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#d6eaf8')}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      index % 2 === 0 ? '#ecf0f1' : '#ffffff')
                  }
                >
                  <td style={{ padding: '10px', textAlign: 'center' }}>
                    <img
                      src={item.itemImageUrl}
                      alt={item.itemName}
                      style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
                    />
                  </td>
                  <td style={{ padding: '10px' }}>{item.itemName}</td>
                  <td style={{ padding: '10px', maxWidth: '250px', whiteSpace: 'pre-wrap' }}>
                    {item.itemDescription}
                  </td>
                  <td style={{ padding: '10px' }}>${item.itemPrice}</td>
                  <td style={{ padding: '10px' }}>{item.itemQuantity}</td>
                  <td style={{ padding: '10px' }}>{item.quantity}</td>
                  <td style={{ padding: '10px' }}>${item.totalPrice}</td>
                  <td style={{ padding: '10px' }}>{item.phoneNumber}</td>
                  <td style={{ padding: '10px' }}>
                    {item.firstname} {item.lastname}
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

export default CompanyStore;
