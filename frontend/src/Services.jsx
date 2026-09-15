import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Componenet/Navbar";
import Dry from "./assets/Dry.jpeg";
import Iron from "./assets/Iron.jpeg";
import Wash from "./assets/Wash.jpeg";
import Full from "./assets/full.jpg";
import { Link } from "react-router-dom";

function Services() {
  const [packs, setPacks] = useState([]);
  const [userData, setUserData] = useState(null);
  const [selectedPack, setSelectedPack] = useState(null);
  const [weight, setWeight] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [orderType, setOrderType] = useState("DELIVERY");

  useEffect(() => {
    const userdata = sessionStorage.getItem("LoginData");
    if (userdata) {
      setUserData(JSON.parse(userdata));
    }

    axios
      .get("http://localhost:8080/API/V1/LondonerPack/getAllpacks")
      .then((response) => {
        setPacks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching laundry packs:", error);
      });
  }, []);

  const openOrderModal = (pack) => {
    setSelectedPack(pack);
    setWeight("");
    setTotalAmount(0);
    setOrderType("DELIVERY");
    setShowModal(true);
  };

  const handleWeightChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setWeight(value);
      setTotalAmount(value * selectedPack.oneKGprice);
    }
  };

  const placeOrder = async () => {
    if (!weight || weight <= 0) {
      alert("Please enter a valid weight!");
      return;
    }

    const orderData = {
      orderdata: new Date().toISOString(),
      totalAmount: totalAmount,
      itemWeight: parseFloat(weight),
      ordertype: orderType,
      customerid: userData.id,
      londerypackid: selectedPack.londerypacksmodelId,
    };

    try {
      await axios.post(
        "http://localhost:8080/API/V1/Order/createorder",
        orderData
      );
      alert("Order placed successfully!");
      setShowModal(false);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order.");
    }
  };

  // Fixed image selection logic
  const getPackImage = (title = "") => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes("stain")) return Full;
    if (lowerTitle.includes("wash & iron")) return Iron;
    if (lowerTitle.includes("wash & dry")) return Dry;
    if (lowerTitle.includes("wash")) return Wash;
    return Wash; 
  };

  return (
    <>
      <Navbar userData={userData} />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-purple-700 text-center mb-12">
          Laundry Service Packs
        </h1>

        {userData && userData.role === "Customer" && (
          <button className="fixed top-20 right-4 mt-8 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition cursor-pointer z-50">
            <Link to="/CustomerHome">Back to home</Link>
          </button>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-10">
          {packs.map((pack) => (
            <div
              key={pack.londerypacksmodelId}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col max-w-sm mx-auto"
            >
              <img
                src={getPackImage(pack.packTitle)}
                alt={pack.packTitle}
                className="w-full h-auto object-cover"
              />
              <div className="p-3 flex flex-col flex-grow">
                <h2 className="text-lg font-bold text-purple-700 mb-1">
                  {pack.packTitle}
                </h2>
                <p className="text-gray-600 mb-2 flex-grow text-sm">
                  {pack.packDescription}
                </p>
                <p className="text-blue-600 font-semibold mb-2">
                  ${pack.oneKGprice.toFixed(2)} / KG
                </p>
                {userData && userData.role === "Customer" && (
                  <button
                    onClick={() => openOrderModal(pack)}
                    className="w-full py-1.5 bg-purple-600 text-white rounded hover:bg-purple-700 transition text-sm cursor-pointer"
                  >
                    Order
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {packs.length === 0 && (
          <p className="text-center py-4 text-gray-500">
            No laundry packs available.
          </p>
        )}
      </div>

      {showModal && selectedPack && (
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
          <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
            <h2 className="text-xl font-bold mb-4 text-purple-700">
              Order {selectedPack.packTitle}
            </h2>

            <div className="mb-4">
              <label className="block mb-1 font-semibold">Weight (KG)</label>
              <input
                type="number"
                min="0"
                value={weight}
                onChange={handleWeightChange}
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-semibold">Order Type</label>
              <select
                value={orderType}
                onChange={(e) => setOrderType(e.target.value)}
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="STORE_PICKUP">Store Pickup</option>
                <option value="DELIVERY">Delivery</option>
              </select>
            </div>

            <div className="mb-4">
              <p className="font-semibold">
                Total Amount:{" "}
                <span className="text-blue-600">${totalAmount.toFixed(2)}</span>
              </p>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={placeOrder}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Services;
