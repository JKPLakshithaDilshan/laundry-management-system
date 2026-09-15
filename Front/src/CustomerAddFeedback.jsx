import React, { useEffect, useState } from "react";
import axios from "axios";

function CustomerAddFeedback({ orderId, onClose ,customerId }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");



  const submitFeedback = async () => {
    if (!rating) {
      alert("Please select a rating!");
      return;
    }

    try {
      await axios.post(`http://localhost:8080/API/V1/Feedback/createFeedback`, {
        orderID: orderId,
        rating:rating,
        feedbackMessage: comment,
        customerID: customerId
      });
      
      console.log(orderId, rating, comment);
      alert("Feedback submitted successfully!");
      window.location.reload();
      onClose();
    } catch (err) {
      alert(err.message || "Failed to submit feedback");
    }
  };

  return (
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
        <h3 className="text-lg font-semibold mb-4">
          Feedback for Order #{orderId}
        </h3>

        <div className="mb-4">
          <label className="block mb-2">Rating:</label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                className={`cursor-pointer text-2xl ${
                  star <= rating ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Comment:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border rounded p-2"
            rows={3}
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border"
          >
            Cancel
          </button>
          <button
            onClick={submitFeedback}
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomerAddFeedback;
