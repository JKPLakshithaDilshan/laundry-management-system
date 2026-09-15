import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function VerifyAccount() {
  const location = useLocation();
  const navigate = useNavigate(); 
  const [message, setMessage] = useState("Verifying your account...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const email = params.get("email");

    if (email) {
      axios
        .post(`http://localhost:8080/API/V1/User/verify_User?email=${email}`)
        .then(() => {
          setMessage("Your account has been successfully verified!");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        })
        .catch(() => {
          setMessage("Verification failed. Please contact support.");
        })
        .finally(() => setLoading(false));
    } else {
      setMessage("Invalid verification link.");
      setLoading(false);
    }
  }, [location, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <div className="bg-white shadow-lg p-8 rounded-2xl w-96">
        <h1 className="text-2xl font-semibold mb-4">Account Verification</h1>
        <p>{loading ? "Loading..." : message}</p>
      </div>
    </div>
  );
}

export default VerifyAccount;
