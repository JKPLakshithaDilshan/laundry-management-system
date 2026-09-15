import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminSidebar from "./Componenet/AdminSidebar";
import Navbar from "./Componenet/Navbar";
import EditProfile from "./EditProfile";

function UserManagement() {
  const [userdata, setUserdata] = useState([]);
  const [message, setMessage] = useState("");

  const fetchUserdata = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/API/V1/Admin/Allusers"
      );
      setUserdata(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const [userData, setUserData] = React.useState({});

  useEffect(() => {
    const loginData = sessionStorage.getItem("LoginData");
    if (loginData) {
      setUserData(JSON.parse(loginData));
    }
    fetchUserdata();
  }, []);

  const handleDelete = async (email, role) => {
    if (role === "Admin") {
      alert("Admin users cannot be deleted!");
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${email}?`
    );
    if (!confirmDelete) return;

    try {
      await axios.delete("http://localhost:8080/API/V1/Admin/RemoveUser", {
        params: { Email: email },
      });
      setUserdata((prev) => prev.filter((user) => user.email !== email));
      setMessage(`✅ User ${email} has been deleted.`);
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error deleting user:", error);
      setMessage("❌ Failed to delete user.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleMakeAdmin = async (email, role) => {
    if (role === "Admin") {
      alert(`${email} is already an Admin.`);
      return;
    }

    const confirmMakeAdmin = window.confirm(`Promote ${email} to Admin?`);
    if (!confirmMakeAdmin) return;

    console.log(email);
    try {
      await axios.put(
        `http://localhost:8080/API/V1/Admin/CreateAdmin?Email=${email}`
      );

      setUserdata((prevData) =>
        prevData.map((user) =>
          user.email === email ? { ...user, role: "Admin" } : user
        )
      );
      setMessage(`✅ ${email} has been promoted to Admin!`);
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error promoting user:", error);
      setMessage("❌ Failed to promote user.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <>
      <Navbar userData={userData} />
      <AdminSidebar />
       <div className="flex justify-end mt-4 mr-4">
        <EditProfile userData={userData} />
      </div>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          User Management
        </h2>

        {message && (
          <div className="text-center mb-4 text-sm font-semibold text-green-600">
            {message}
          </div>
        )}

        <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
          <table className="min-w-full bg-white">
            <thead className="bg-purple-700 text-white">
              <tr>
                <th className="py-2 px-4 border-b">Full Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Phone Number</th>
                <th className="py-2 px-4 border-b">Address</th>
                <th className="py-2 px-4 border-b">Role</th>
                <th className="py-2 px-4 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userdata.length > 0 ? (
                userdata.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 transition-all duration-150"
                  >
                    <td className="py-2 px-4 border-b">
                      {user.firstname} {user.lastname}
                    </td>
                    <td className="py-2 px-4 border-b">{user.email}</td>
                    <td className="py-2 px-4 border-b">{user.phoneNumber}</td>
                    <td className="py-2 px-4 border-b">
                      <Link to={user.address}>
                        <button className="text-blue-500  bg-gray-100 p-1 rounded-lg cursor-pointer hover:bg-blue-100 hover:text-blue-700 transition-all">
                          View
                        </button>
                      </Link>
                    </td>
                    <td className="py-2 px-4 border-b">{user.role}</td>
                    <td className="py-2 px-4 border-b text-center flex gap-2 justify-center">
                      <button
                        className={`px-3 py-1 rounded ${
                          user.role === "Admin"
                            ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                        onClick={() => handleMakeAdmin(user.email, user.role)}
                        disabled={user.role === "Admin"}
                      >
                        Make Admin
                      </button>

                      <button
                        className={`px-3 py-1 rounded ${
                          user.role === "Admin"
                            ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                            : "bg-red-500 text-white hover:bg-red-600"
                        }`}
                        onClick={() => handleDelete(user.email, user.role)}
                        disabled={user.role === "Admin"}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className="py-4 px-4 text-center text-gray-600"
                    colSpan="7"
                  >
                    No users found.
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

export default UserManagement;
