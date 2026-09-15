import React, { useState } from 'react';
import axios from 'axios';

function AddPackagesAD() {
  const [packData, setPackData] = useState({
    packTitle: '',
    packDescription: '',
    oneKGprice: '',
  });

  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Convert number input to number type
    setPackData({
      ...packData,
      [name]: name === 'oneKGprice' ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a properly typed payload
    const payload = {
      packTitle: packData.packTitle.trim(),
      packDescription: packData.packDescription.trim(),
      oneKGprice: Number(packData.oneKGprice),
    };

    console.log('📦 Sending payload:', payload);

    try {
      const response = await axios.post(
        'http://localhost:8080/API/V1/LondonerPack/AddLonderyPack',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      setMessage('✅ Package added successfully!');
      window.location.reload();
      setPreview(payload);
      setPackData({ packTitle: '', packDescription: '', oneKGprice: '' });
      console.log('✅ Response:', response.data);
    } catch (error) {
      console.error('❌ Error:', error.response?.data || error.message);
      setMessage('❌ Error adding package. Check your input or server.');
    }
  };

  return (
    <div className="my-8 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Add Laundry Package</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md space-y-4"
      >
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Package Title
          </label>
          <input
            type="text"
            name="packTitle"
            value={packData.packTitle}
            onChange={handleChange}
            placeholder="e.g. Wash, Dry and Iron"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Description
          </label>
          <textarea
            name="packDescription"
            value={packData.packDescription}
            onChange={handleChange}
            placeholder="Enter package details..."
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Price per KG
          </label>
          <input
            type="number"
            name="oneKGprice"
            value={packData.oneKGprice}
            onChange={handleChange}
            placeholder="e.g. 120"
            step="0.01"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold rounded-lg py-2 hover:bg-blue-700 transition"
        >
          Add Package
        </button>

        {message && (
          <p className="text-center mt-2 font-medium text-green-600">
            {message}
          </p>
        )}
      </form>

      {preview && (
        <div className="mt-10 bg-white shadow-md rounded-2xl p-6 w-full max-w-sm text-left transition-all">
          <h2 className="text-xl font-bold text-gray-800">{preview.packTitle}</h2>
          <p className="text-gray-600 mt-2">{preview.packDescription}</p>
          <div className="mt-4 text-blue-700 font-semibold">
            ₹{preview.oneKGprice.toFixed(2)} / kg
          </div>
        </div>
      )}
    </div>
  );
}

export default AddPackagesAD;
