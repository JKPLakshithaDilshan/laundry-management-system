import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Componenet/Navbar";
import AdminSidebar from "./Componenet/AdminSidebar";
import CompanyStore from "./CompanyStore";
import AdminPutAllItemOrders from "./AdminPutAllItemOrdes";

function ViewAllItemsAdmin({ supplierId }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const loginData = sessionStorage.getItem("LoginData");
    if (loginData) {
      setUserData(JSON.parse(loginData));
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/API/V1/Item/AllItems"
        );
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching item data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (itemId) => {
    if (!supplierId) {
      alert("Supplier ID is missing!");
      return;
    }

    if (!itemId) {
      alert("Item ID is missing!");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await axios.delete(
        `http://localhost:8080/API/V1/Item/deleteItems?itemId=${itemId}&supplierId=${userData.id}`
      );
      setItems(items.filter((item) => item.itemId !== itemId));
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item. Check console for details.");
    }
  };

  const handleOrder = (item) => {
    setSelectedItem(item);
    setQuantity(1);
    setShowDialog(true);
  };

  const handleConfirmOrder = async () => {
    if (!selectedItem || quantity <= 0) {
      alert("Invalid order details!");
      return;
    }

    const totalPrice = selectedItem.price * quantity;
    const orderData = {
      quantity,
      totalPrice,
      itemId: selectedItem.itemId,
      supplierId: selectedItem.supplierId || supplierId,
    };

    try {
      await axios.post(
        "http://localhost:8080/API/V1/ItemOrder/createItemOrder",
        orderData
      );
      alert("Order placed successfully!");
      setShowDialog(false);
      window.location.reload();
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Check console for details.");
    }
  };

  if (loading)
    return <p className="text-center py-4 text-gray-600">Loading items...</p>;

  return (
    <>
      <Navbar userData={userData} />
      <AdminSidebar />

      <div className="p-6">
        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#2c3e50",
          }}
        >
          All Items
        </h1>

        {items.length === 0 ? (
          <p className="text-gray-600 text-center">No items found.</p>
        ) : (
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-[#2980b9] text-white">
                <tr>
                  <th className="py-3 px-4 border-b text-left">Image</th>
                  <th className="py-3 px-4 border-b text-left">Supplier</th>
                  <th className="py-3 px-4 border-b text-left">Name</th>
                  <th className="py-3 px-4 border-b text-left">Description</th>
                  <th className="py-3 px-4 border-b text-left">Price ($)</th>
                  <th className="py-3 px-4 border-b text-left">Quantity</th>
                  <th className="py-3 px-4 border-b text-center">Actions</th>
                  <th className="py-3 px-4 border-b text-center">Order</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr
                    key={item.itemId}
                    className="hover:bg-gray-50 transition duration-150 ease-in-out"
                  >
                    <td className="py-3 px-4 border-b">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    </td>
                    <td className="py-3 px-4 border-b text-gray-800">
                      {item.firstname} {item.lastname}
                    </td>
                    <td className="py-3 px-4 border-b text-gray-800">
                      {item.name}
                    </td>
                    <td className="py-3 px-4 border-b text-gray-600">
                      {item.description}
                    </td>
                    <td className="py-3 px-4 border-b text-gray-800">
                      {item.price}
                    </td>
                    <td className="py-3 px-4 border-b text-gray-800">
                      {item.quantity}
                    </td>
                    <td className="py-3 px-4 border-b text-center">
                      <button
                        onClick={() => handleDelete(item.itemId)}
                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg text-sm"
                      >
                        Delete
                      </button>
                    </td>
                    <td className="py-3 px-4 border-b text-center">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm"
                        onClick={() => handleOrder(item)}
                      >
                        Order
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showDialog && selectedItem && (
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
          <div className="bg-white rounded-xl shadow-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
              Order Item
            </h2>
            <p className="mb-2 text-gray-700">
              <strong>Item:</strong> {selectedItem.name}
            </p>
            <p className="mb-4 text-gray-700">
              <strong>Price:</strong> ${selectedItem.price}
            </p>

            <label className="block text-gray-700 mb-1">Quantity:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring focus:ring-blue-300"
              min="1"
            />

            <p className="text-gray-800 mb-4">
              <strong>Total Price:</strong> $
              {(selectedItem.price * quantity).toFixed(2)}
            </p>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDialog(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmOrder}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <CompanyStore />
      <AdminPutAllItemOrders />
    </>
  );
}

export default ViewAllItemsAdmin;
