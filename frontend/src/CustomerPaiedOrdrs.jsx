import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomerAddFeedback from "./CustomerAddFeedback"; 

function CustomerPaidOrders({ id }) {
  const [paymentData, setPaymentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/API/V1/payment/uniquePayment?customerId=${id}`
        );
        const data = response.data;
        setPaymentData(Array.isArray(data) ? data : [data]);
      } catch (err) {
        setError(err.message || "Failed to fetch payment data");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPaymentData();
  }, [id]);

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-center mt-4 text-red-500">{error}</p>;
  if (!paymentData.length)
    return <p className="text-center mt-4">No payment data found</p>;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
        Customer Payment Details
      </h2>

      <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-2 px-4 border-b">Payment ID</th>
            <th className="py-2 px-4 border-b">Method</th>
            <th className="py-2 px-4 border-b">Amount</th>
            <th className="py-2 px-4 border-b">Item Weight</th>
            <th className="py-2 px-4 border-b">Order Type</th>
            <th className="py-2 px-4 border-b">Order State</th>
            <th className="py-2 px-4 border-b">Order Date</th>
            <th className="py-2 px-4 border-b">Feedback</th>
          </tr>
        </thead>
        <tbody>
          {paymentData.map((payment) => (
            <tr key={payment.paymentId} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{payment.paymentId}</td>
              <td className="py-2 px-4 border-b">{payment.method}</td>
              <td className="py-2 px-4 border-b">{payment.amount}</td>
              <td className="py-2 px-4 border-b">{payment.itemWeight}</td>
              <td className="py-2 px-4 border-b">{payment.ordertype}</td>
              <td className="py-2 px-4 border-b">{payment.orderState}</td>
              <td className="py-2 px-4 border-b">
                {new Date(payment.orderdata).toLocaleString()}
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => setSelectedOrderId(payment.orderid)} 
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Add Feedback
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedOrderId && (
        <CustomerAddFeedback
          orderId={selectedOrderId}
          customerId ={id}
          onClose={() => setSelectedOrderId(null)}
        />
      )}
    </div>
  );
}

export default CustomerPaidOrders;
