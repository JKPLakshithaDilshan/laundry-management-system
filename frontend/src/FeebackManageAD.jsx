import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "./Componenet/AdminSidebar";
import Navbar from "./Componenet/Navbar";

function FeebackManageAD() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch all feedbacks
  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/API/V1/Feedback/get_allFeedbacks"
      );
      setFeedbacks(res.data);
    } catch (err) {
      console.error(err.message || "Failed to fetch feedbacks");
      setMessage("❌ Failed to fetch feedbacks");
    }
  };

  const [userData, setUserData] = React.useState({});

  useEffect(() => {
    const loginData = sessionStorage.getItem("LoginData");
    if (loginData) {
      setUserData(JSON.parse(loginData));
    }
    fetchFeedbacks();
  }, []);

  // Handle delete
  const handleDelete = async (feedbackID) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this feedback?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:8080/API/V1/Feedback/Delete_Feedback?feedbackID=${feedbackID}`
      );
      setFeedbacks((prev) => prev.filter((fb) => fb.feedBackID !== feedbackID));
      setMessage("✅ Feedback deleted successfully!");
      window.location.reload();
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to delete feedback");
    }
  };

  // ⭐ Star Renderer
  const renderStars = (rating) => {
    const fullStar = "★";
    const emptyStar = "☆";
    return (
      <div className="flex justify-center">
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className={`text-lg ${
              i <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            {i <= rating ? fullStar : emptyStar}
          </span>
        ))}
      </div>
    );
  };

  return (
    <>
       <Navbar userData={userData} />
       <AdminSidebar />
      <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-purple-700 text-center mb-6">
        Feedback Management
      </h2>

      {message && (
        <p className="text-center mb-4 text-sm font-medium text-gray-700">
          {message}
        </p>
      )}

      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
        <table className="min-w-full bg-white">
          <thead className="bg-purple-700 text-white">
            <tr>
              <th className="py-2 px-4 border-b">Customer</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Phone</th>
              <th className="py-2 px-4 border-b">Message</th>
              <th className="py-2 px-4 border-b text-center">Rating</th>
              <th className="py-2 px-4 border-b text-center">Order Type</th>
              <th className="py-2 px-4 border-b text-center">Order Status</th>
              <th className="py-2 px-4 border-b text-center">Order Date</th>
              <th className="py-2 px-4 border-b text-center">
                Item Weight (KG)
              </th>
              <th className="py-2 px-4 border-b text-center">
                Total Amount ($)
              </th>
              <th className="py-2 px-4 border-b text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {feedbacks.length > 0 ? (
              feedbacks.map((fb) => (
                <tr
                  key={fb.feedBackID}
                  className="hover:bg-gray-50 transition-all duration-150"
                >
                  <td className="py-2 px-4 border-b">
                    {fb.firstname} {fb.lastname}
                  </td>
                  <td className="py-2 px-4 border-b">{fb.email}</td>
                  <td className="py-2 px-4 border-b">{fb.phoneNumber}</td>
                  <td className="py-2 px-4 border-b">{fb.feedbackMessage}</td>

                  {/* ⭐ Rating in Stars */}
                  <td className="py-2 px-4 border-b text-center">
                    {renderStars(fb.rating)}
                  </td>

                  <td className="py-2 px-4 border-b text-center">
                    {fb.ordertype}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {fb.orderState}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {new Date(fb.orderdata).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {fb.itemWeight}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {fb.totalAmount}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <button
                      onClick={() => handleDelete(fb.feedBackID)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition-all"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="11"
                  className="py-4 text-center text-gray-500 font-medium"
                >
                  No feedbacks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </>
  
  );
}

export default FeebackManageAD;
