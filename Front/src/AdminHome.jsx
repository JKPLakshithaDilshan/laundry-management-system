import React, { useEffect, useState } from "react";
import Navbar from "./Componenet/Navbar";
import EditProfile from "./EditProfile";
import ViewAllItemsAdmin from "./ViewAllItemsAdmin";
import AdminSidebar from "./Componenet/AdminSidebar";

function AdminHome() {
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
      <AdminSidebar />
      <div className="flex justify-end mt-4 mr-4">
        <EditProfile userData={userData} />
      </div>
      <h2>
        Welcome to Admin Home 
      </h2>
    </>
  );
}

export default AdminHome;
