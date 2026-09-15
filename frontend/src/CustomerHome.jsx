import React, { useEffect } from "react";
import Navbar from "./Componenet/Navbar";
import CustomerShowOrders from "./CustomerShowOrders";
import CustomerPaidOrders from "./CustomerPaiedOrdrs";
import CustomerFeedbackShow from "./CustomerFeedbackShow";
import EditProfile from "./EditProfile";
import { useNavigate } from "react-router-dom";

function CustomerHome() {
  const [userData, setUserData] = React.useState({});
  const navigate = useNavigate();

  const handlenavigate = () => {
    navigate("/Services");
  };

  useEffect(() => {
    const loginData = sessionStorage.getItem("LoginData");
    if (loginData) {
      setUserData(JSON.parse(loginData));
    }
  }, []);

  return (
    <>
      <Navbar userData={userData} />

      <div className="flex justify-end mt-4 mr-4">
        <EditProfile userData={userData} />
        <button
          className="fixed top-20 right-4 mt-12 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition cursor-pointer z-50"
          onClick={() => handlenavigate()}
        >
          Order
        </button>
      </div>

      <CustomerShowOrders />
      <CustomerPaidOrders id={userData.id} />
      <CustomerFeedbackShow customerId={userData.id} />
    </>
  );
}

export default CustomerHome;
