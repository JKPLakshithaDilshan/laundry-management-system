import React, { useState } from "react";
import axios from "axios";

function SupplierCreateItem({ userId }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    price: "",
    quantity: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form fields
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.description.trim()) newErrors.description = "Description is required.";
    if (!formData.imageUrl.trim()) newErrors.imageUrl = "Image URL is required.";
    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0)
      newErrors.price = "Price must be a positive number.";
    if (!formData.quantity || isNaN(formData.quantity) || Number(formData.quantity) < 0)
      newErrors.quantity = "Quantity must be a non-negative number.";
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/API/V1/Item/AddItems",
        {
          ...formData,
          supplierId: userId,
        }
      );
      setMessage("Item added successfully!");
      window.location.reload();
      setFormData({
        name: "",
        description: "",
        imageUrl: "",
        price: "",
        quantity: "",
      });
      setErrors({});
    } catch (error) {
      console.error(error);
      setMessage("Failed to add item. Please try again.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "2rem auto",
        padding: "1rem",
        borderRadius: "8px",
        border: "1px solid #ddd",
      }}
    >
      <h2 className="text-2xl font-bold mb-4 text-center text-purple-800">
        Create New Item
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {errors.description && <p className="text-red-500">{errors.description}</p>}
        </div>

        <div className="mb-4">
          <label>Image URL:</label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {errors.imageUrl && <p className="text-red-500">{errors.imageUrl}</p>}
        </div>

        <div className="mb-4">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {errors.price && <p className="text-red-500">{errors.price}</p>}
        </div>

        <div className="mb-4">
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {errors.quantity && <p className="text-red-500">{errors.quantity}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
        >
          Add Item
        </button>
      </form>
      {message && <p className="mt-4 text-center text-green-600">{message}</p>}
    </div>
  );
}

export default SupplierCreateItem;
