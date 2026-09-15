import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "./Componenet/AdminSidebar";
import Navbar from "./Componenet/Navbar";
import AddPackagesAD from "./AddPackagesAD";

function AllIPackagesAD() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState({});
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editData, setEditData] = useState({
    londerypacksmodelId: "",
    packTitle: "",
    packDescription: "",
    oneKGprice: "",
  });

  // Fetch all packages
  const fetchPackages = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8080/API/V1/LondonerPack/getAllpacks"
      );
      setPackages(response.data);
    } catch (error) {
      console.error("Error fetching packages:", error);
      setMessage("❌ Failed to fetch packages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loginData = sessionStorage.getItem("LoginData");
    if (loginData) {
      setUserData(JSON.parse(loginData));
    }
    fetchPackages();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this package?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:8080/API/V1/LondonerPack/deletePacks?id=${id}`
      );
      setPackages((prev) =>
        prev.filter((pack) => pack.londerypacksmodelId !== id)
      );
      setMessage("✅ Package deleted successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting package:", error);
      setMessage("❌ Failed to delete package. Try again.");
    }
  };

  // Handle Edit (Open Dialog)
  const handleEditOpen = (pack) => {
    setEditData({
      londerypacksmodelId: pack.londerypacksmodelId,
      packTitle: pack.packTitle,
      packDescription: pack.packDescription,
      oneKGprice: pack.oneKGprice,
    });
    setEditDialogOpen(true);
  };

  // Handle input changes in dialog
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Update (PUT)
  const handleUpdate = async () => {
    try {
      const { londerypacksmodelId, packDescription, oneKGprice } = editData;
      const updatedData = {
        londerypacksmodelId,
        packDescription,
        oneKGprice: parseFloat(oneKGprice),
      };

      await axios.put(
        "http://localhost:8080/API/V1/LondonerPack/updatePacks",
        updatedData
      );

      setMessage("✅ Package updated successfully!");
      window.location.reload();
      setEditDialogOpen(false);
      fetchPackages();
    } catch (error) {
      console.error("Error updating package:", error);
      setMessage("❌ Failed to update package.");
    }
  };

  return (
    <>
      <Navbar userData={userData} />
      <AdminSidebar />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-purple-700 text-center mb-6">
          Laundry Packages Management
        </h2>

        {message && (
          <p className="text-center mb-4 text-sm font-medium text-gray-700">
            {message}
          </p>
        )}
        <AddPackagesAD />

        <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
          <table className="min-w-full bg-white">
            <thead className="bg-purple-700 text-white ">
              <tr>
                <th className="py-2 px-4 border-b text-left">Title</th>
                <th className="py-2 px-4 border-b text-left">Description</th>
                <th className="py-2 px-4 border-b text-center">
                  Price (per KG)
                </th>
                <th className="py-2 px-4 border-b text-center">Edit</th>
                <th className="py-2 px-4 border-b text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="py-4 text-center">
                    Loading packages...
                  </td>
                </tr>
              ) : packages.length > 0 ? (
                packages.map((pack) => (
                  <tr
                    key={pack.londerypacksmodelId}
                    className="hover:bg-gray-50 transition-all duration-150"
                  >
                    <td className="py-2 px-4 border-b text-gray-800 font-semibold">
                      {pack.packTitle}
                    </td>
                    <td className="py-2 px-4 border-b text-gray-600">
                      {pack.packDescription}
                    </td>
                    <td className="py-2 px-4 border-b text-center font-semibold text-green-700">
                      $ {pack.oneKGprice.toFixed(2)}
                    </td>
                    <td className="py-2 px-4 border-b text-center space-x-2">
                      <button
                        onClick={() => handleEditOpen(pack)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg transition-all"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="py-2 px-4 border-b text-center space-x-2">
                      <button
                        onClick={() => handleDelete(pack.londerypacksmodelId)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition-all"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-4 text-center text-gray-500">
                    No packages found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {editDialogOpen && (
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
            <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
              <h3 className="text-xl font-bold text-purple-700 mb-4 text-center">
                Edit Package
              </h3>

              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  value={editData.packTitle}
                  disabled
                  className="w-full border rounded-lg p-2 bg-gray-100"
                />
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="packDescription"
                  value={editData.packDescription}
                  onChange={handleEditChange}
                  className="w-full border rounded-lg p-2"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Price (per KG)
                </label>
                <input
                  type="number"
                  name="oneKGprice"
                  value={editData.oneKGprice}
                  onChange={handleEditChange}
                  className="w-full border rounded-lg p-2"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setEditDialogOpen(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AllIPackagesAD;
