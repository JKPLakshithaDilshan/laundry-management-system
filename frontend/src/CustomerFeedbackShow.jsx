import React, { useEffect, useState } from "react";
import axios from "axios";

function CustomerFeedbackShow({ customerId }) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingFeedback, setEditingFeedback] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [newRating, setNewRating] = useState(0);

  // ✅ Fetch all feedbacks
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/API/V1/Feedback/uniqueFeedbacks?customerId=${customerId}`
        );
        setFeedbacks(res.data);
      } catch (err) {
        // setError(err.message || "Failed to fetch feedbacks");
      } finally {
        setLoading(false);
      }
    };

    if (customerId) fetchFeedbacks();
  }, [customerId]);

  // ✅ Delete feedback
  const handleDelete = async (feedbackID) => {
    if (!window.confirm("Are you sure you want to delete this feedback?")) return;

    try {
      await axios.delete(
        `http://localhost:8080/API/V1/Feedback/Delete_Feedback?feedbackID=${feedbackID}`
      );
      setFeedbacks((prev) => prev.filter((f) => f.feedBackID !== feedbackID));
      alert("Feedback deleted successfully!");
      window.location.reload();
    } catch (err) {
      console.log(err.message || "Failed to delete feedback");
    }
  };

  // ✅ Open edit dialog
  const openEditDialog = (feedback) => {
    setEditingFeedback(feedback);
    setNewMessage(feedback.feedbackMessage);
    setNewRating(feedback.rating);
  };

  // ✅ Update feedback
  const handleUpdate = async () => {
    if (!newRating || !newMessage.trim()) {
      alert("Please fill all fields!");
      return;
    }

    try {
      await axios.put(`http://localhost:8080/API/V1/Feedback/update_feedback`, {
        feedBackID: editingFeedback.feedBackID,
        feedbackMessage: newMessage,
        rating: newRating,
        customerID: editingFeedback.customerID,
      });

      setFeedbacks((prev) =>
        prev.map((f) =>
          f.feedBackID === editingFeedback.feedBackID
            ? { ...f, feedbackMessage: newMessage, rating: newRating }
            : f
        )
      );

      alert("Feedback updated successfully!");
      window.location.reload();
      setEditingFeedback(null);
    } catch (err) {
      alert(err.message || "Failed to update feedback");
    }
  };

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-center mt-4 text-red-500">{error}</p>;

  // ✅ Render stars for display (read-only)
  const renderStars = (rating) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-xl ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
        Customer Feedbacks
      </h2>

      {feedbacks.length === 0 ? (
        <p className="text-center text-gray-500">No feedback found</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4 border-b">Feedback ID</th>
              <th className="py-2 px-4 border-b">Message</th>
              <th className="py-2 px-4 border-b">Rating</th>
              <th className="py-2 px-4 border-b">Order ID</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback) => (
              <tr key={feedback.feedBackID} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{feedback.feedBackID}</td>
                <td className="py-2 px-4 border-b">{feedback.feedbackMessage}</td>
                <td className="py-2 px-4 border-b">{renderStars(feedback.rating)}</td>
                <td className="py-2 px-4 border-b">{feedback.orderID}</td>
                <td className="py-2 px-4 border-b space-x-2">
                  <button
                    onClick={() => openEditDialog(feedback)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(feedback.feedBackID)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ✅ Edit Feedback Modal */}
      {editingFeedback && (
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
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Edit Feedback #{editingFeedback.feedBackID}
            </h3>

            <div className="mb-4">
              <label className="block mb-2">Rating:</label>
              <div className="flex space-x-1 justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setNewRating(star)}
                    className={`cursor-pointer text-3xl transition ${
                      star <= newRating
                        ? "text-yellow-400 scale-110"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-2">Message:</label>
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="w-full border rounded p-2"
                rows={3}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setEditingFeedback(null)}
                className="px-4 py-2 rounded border"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
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

export default CustomerFeedbackShow;
