import React, { useEffect, useState } from "react";
import axios from "axios";

function EditProfileModal({ userData }) {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phoneNumber: "",
    address: "",
    password: "",
    role: "",
    email: "",
    id: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    if (userData) {
      setFormData({
        firstname: userData.firstname || "",
        lastname: userData.lastname || "",
        phoneNumber: userData.phoneNumber || "",
        address: userData.address || "",
        password: userData.password || "",
        role: userData.role || "",
        email: userData.email || "",
        id: userData.id || "",
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 
  const validateForm = () => {
    const errors = [];
    if (!formData.firstname.trim()) errors.push("First name is required.");
    if (!formData.lastname.trim()) errors.push("Last name is required.");
    if (
      !formData.phoneNumber.trim() ||
      !/^[0-9]{7,15}$/.test(formData.phoneNumber)
    )
      errors.push("Enter a valid phone number (7–15 digits).");
    if (!formData.address.trim()) errors.push("Address is required.");
    return errors;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (errors.length > 0) {
      setMessage(errors.join(" "));
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await axios.put(
        `http://localhost:8080/API/V1/User/Updater_User`,
        formData
      );
      setMessage("✅ Profile updated successfully!");
      setTimeout(() => setShowModal(false), 1500); 
    } catch (error) {
      console.error("Update error:", error);
      setMessage("❌ Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowModal(true)}
        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all cursor-pointer"
      >
        Edit Profile
      </button>

 
      {showModal && (
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
            zIndex: 1000,
          }}
        >

          <div className="bg-white rounded-2xl p-6 shadow-lg w-[400px] relative border border-gray-200">

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-purple-700 mb-4 text-center">
              Edit Your Profile
            </h2>

    
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  placeholder="Enter first name"
                  className="w-full border p-2 rounded focus:outline-purple-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  placeholder="Enter last name"
                  className="w-full border p-2 rounded focus:outline-purple-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="w-full border p-2 rounded focus:outline-purple-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter address"
                  className="w-full border p-2 rounded focus:outline-purple-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 text-white rounded-lg transition-all ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700"
                }`}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </form>

            {message && (
              <p className="mt-4 text-center font-medium text-gray-700">
                {message}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default EditProfileModal;
