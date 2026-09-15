import React, { useEffect } from "react";
import Navbar from "./Componenet/Navbar";
import SupplierCreateItem from "./SupplierCreateItem";
import SupplierViewItems from "./SupplierViewItems";
import EditProfile from "./EditProfile";
import SupplierGettOrders from "./SupplierGettOrders";
import SupplierGetItemOrders from "./SupplierGetItemOrders";

function SupplierHome() {
  const [userData, setUserData] = React.useState({});

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
      </div>
      <h2 className="text-3xl font-bold mb-4 text-center mt-10 text-purple-600">
        Supplier Home
      </h2>
      <SupplierCreateItem userId={userData.id} />
      <SupplierViewItems userId={userData.id} />
      <SupplierGettOrders userId={userData.id} />
      <SupplierGetItemOrders  />
    </>
  );
}

export default SupplierHome;
