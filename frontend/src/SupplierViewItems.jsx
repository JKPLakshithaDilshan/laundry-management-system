import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

function SupplierViewItems({ userId }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    price: "",
    quantity: "",
  });



 const fetchItems = useCallback(async () => {
    if (!userId) return; 
    try {
      const response = await axios.get(
        `http://localhost:8080/API/V1/Item/uniquelyGet?supplierId=${userId}`
      );
      setItems(response.data || []);
    } catch (error) {
      console.error("Failed to fetch items:", error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);


  const handleEditClick = (item) => {
    setEditingItem(item);
    setEditData({
      name: item.name || "",
      description: item.description || "",
      imageUrl: item.imageUrl || "",
      price: item.price || "",
      quantity: item.quantity || "",
    });
    setShowModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    if (!editingItem) return;

    try {
      await axios.put("http://localhost:8080/API/V1/Item/updateItems", {
        itemId: editingItem.itemId,
        supplierId: userId,
        ...editData,
        price: parseFloat(editData.price) || 0,
        quantity: parseInt(editData.quantity, 10) || 0,
      });
      setShowModal(false);
      setEditingItem(null);
      await fetchItems();
    } catch (error) {
      console.error("Failed to update item:", error);
    }
  };

  const handleDelete = async (itemId) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await axios.delete(
        `http://localhost:8080/API/V1/Item/deleteItems?itemId=${itemId}&supplierId=${userId}`
      );
      await fetchItems();
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading items...</p>;
  }

  return (
    <div className="max-w-8xl mx-auto mt-10 px-4 py-10">
      <h2 className="text-center mb-6 text-2xl font-bold text-gray-800">
        Supplier Items
      </h2>

      {items.length === 0 ? (
        <p className="text-center text-gray-500">No items found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="py-3 px-6 text-left">Item Name</th>
                <th className="py-3 px-6 text-left">Description</th>
                <th className="py-3 px-6 text-left">Image</th>
                <th className="py-3 px-6 text-left">Price ($)</th>
                <th className="py-3 px-6 text-left">Quantity</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item.itemId}
                  className="border-b hover:bg-gray-100 transition-colors"
                >
                  <td className="py-3 px-6 font-semibold">{item.name}</td>
                  <td className="py-3 px-6">{item.description}</td>
                  <td className="py-3 px-6">
                    <a
                      href={item.imageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </a>
                  </td>
                  <td className="py-3 px-6">
                    $ {Number(item.price).toFixed(2)}
                  </td>
                  <td className="py-3 px-6">{item.quantity}</td>
                  <td className="py-3 px-6 flex gap-2">
                    <button
                      onClick={() => handleEditClick(item)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.itemId)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
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

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">Edit Item</h3>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={handleEditChange}
                placeholder="Name"
                className="border px-3 py-2 rounded w-full"
              />
              <textarea
                name="description"
                value={editData.description}
                onChange={handleEditChange}
                placeholder="Description"
                className="border px-3 py-2 rounded w-full"
              />
              <input
                type="text"
                name="imageUrl"
                value={editData.imageUrl}
                onChange={handleEditChange}
                placeholder="Image URL"
                className="border px-3 py-2 rounded w-full"
              />
              <input
                type="number"
                name="price"
                value={editData.price}
                onChange={handleEditChange}
                placeholder="Price"
                className="border px-3 py-2 rounded w-full"
              />
              <input
                type="number"
                name="quantity"
                value={editData.quantity}
                onChange={handleEditChange}
                placeholder="Quantity"
                className="border px-3 py-2 rounded w-full"
              />
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
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

export default SupplierViewItems;
