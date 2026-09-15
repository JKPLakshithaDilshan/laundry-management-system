import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Componenet/Navbar";

const AuthPage = () => {
  const navigate = useNavigate();

  const [activeForm, setActiveForm] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [LoginData, setLoginData] = useState("");

  const showLoginForm = () => setActiveForm("login");
  const showRegisterForm = () => setActiveForm("register");

  const navigateTopages = (Role) => {
    if (Role === "Customer") {
      navigate("/CustomerHome");
    } else if (Role === "Supplier") {
      navigate("/SupplierHome");
    } else if (Role === "DeliveryManager") {
      navigate("/DeleveryHome");
    } else if (Role === "Admin") {
      navigate("/UserManagement");
    } else {
      navigate("/Login");
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        `http://localhost:8080/API/V1/User/Login?email=${email}&password=${password}`
      )
      .then((response) => {
        console.log("Login successful:", response.data);
        setLoginData(response.data);
        sessionStorage.setItem("LoginData", JSON.stringify(response.data));
        navigateTopages(response.data.role);
      })
      .catch((error) => {
        console.error("Login error:", error);
        alert("Login failed. Please check your credentials.");
      });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const firstname = data["first-name"];
    const lastname = data["last-name"];
    const phonenumber = data.phoneNumber || data.phone;
    const email = data.email;
    const role = data.role;
    const password = data.password;
    const confirmpassword = data["confirm-password"];
    const address = data.address;

    const nameRegex = /^[a-zA-Z ]+$/;
    if (!nameRegex.test(firstname) || !nameRegex.test(lastname)) {
      window.alert(
        "First name and Last name can only contain letters and spaces."
      );
      return;
    }

    if (firstname.length < 3 || lastname.length < 3) {
      window.alert("Name must contain at least 3 characters.");
      return;
    }

    if (!role || role.trim() === "") {
      window.alert("Please select your role.");
      return;
    }

    if (!/^\d{10}$/.test(phonenumber)) {
      window.alert("Invalid phone number. It must contain exactly 10 digits.");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      window.alert("Invalid email address.");
      return;
    }

    if (password !== confirmpassword) {
      window.alert("Passwords do not match.");
      return;
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?]).{8,}$/;
    if (!passwordRegex.test(password)) {
      window.alert(
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }

    const registerPayload = {
      firstname,
      lastname,
      email,
      phoneNumber: phonenumber,
      address,
      role,
      password,
    };

    axios
      .post(`http://localhost:8080/API/V1/User/Register`, registerPayload)
      .then((response) => {
        console.log("Registration successful:", response.data);
        alert("Account created successfully!");
        setActiveForm("login");
      })
      .catch((error) => {
        console.error("Registration error:", error);
      });
  };

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen flex items-center justify-center p-2">
        <div className="w-full max-w-6xl flex md:flex-row rounded-3xl overflow-hidden shadow-2xl bg-white">
          <div className="relative bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-10 md:p-12 lg:p-16 md:w-2/5 flex flex-col justify-center">
            <div className="relative z-10">
              <div className="flex items-center mb-8">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <i className="fas fa-soap text-2xl text-indigo-600"></i>
                </div>
                <div>
                  <h1 className="text-3xl font-bold">FreshWash</h1>
                  <p className="text-indigo-200 text-sm mt-1">
                    Professional Laundry Management System
                  </p>
                </div>
              </div>

              <p className="text-indigo-100 text-lg mb-10 leading-relaxed">
                Streamline your laundry operations with our professional
                management solution.
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: "fa-map-location-dot",
                    title: "Smart Tracking",
                    text: "Track your laundry in real-time",
                  },
                  {
                    icon: "fa-clock",
                    title: "Fast Service",
                    text: "Quick turnaround times",
                  },
                  {
                    icon: "fa-shield-alt",
                    title: "Secure & Reliable",
                    text: "Your data is protected",
                  },
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center bg-white/10 p-5 rounded-2xl backdrop-blur-md hover:bg-white/20 transition"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mr-4">
                      <i
                        className={`fas ${feature.icon} text-lg text-white`}
                      ></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{feature.title}</h3>
                      <p className="text-sm text-indigo-200 mt-1">
                        {feature.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="relative bg-white p-8 md:p-10 lg:p-14 md:w-3/5 flex flex-col justify-center">
            <div className="relative z-10">
              {/* TOGGLE BUTTONS */}
              <div className="flex mb-10 bg-gray-100 rounded-xl p-1 w-full max-w-xs mx-auto">
                <button
                  className={`flex-1 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeForm === "login"
                      ? "bg-indigo-500 text-white shadow"
                      : "text-gray-600"
                  }`}
                  onClick={showLoginForm}
                >
                  Login
                </button>
                <button
                  className={`flex-1 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeForm === "register"
                      ? "bg-indigo-500 text-white shadow"
                      : "text-gray-600"
                  }`}
                  onClick={showRegisterForm}
                >
                  Register
                </button>
              </div>

              {/* LOGIN FORM */}
              {activeForm === "login" && (
                <form
                  onSubmit={handleLoginSubmit}
                  className="space-y-6 max-w-md mx-auto"
                >
                  <h2 className="text-2xl font-bold text-gray-800 text-center">
                    Welcome Back
                  </h2>
                  <p className="text-gray-500 text-center mb-8">
                    Sign in to your account to continue
                  </p>

                  <div className="relative">
                    <input
                      type="email"
                      className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                      placeholder="Email Address"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <i className="far fa-envelope"></i>
                    </div>
                  </div>

                  <div className="relative">
                    <input
                      type="password"
                      className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <i className="fas fa-lock"></i>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 rounded-xl font-medium hover:opacity-90 transition duration-200 shadow-lg"
                  >
                    Sign In
                  </button>
                </form>
              )}

              {/* REGISTER FORM */}
              {activeForm === "register" && (
                <form
                  onSubmit={handleRegisterSubmit}
                  className="space-y-6 max-w-md mx-auto"
                >
                  <h2 className="text-2xl font-bold text-gray-800 text-center">
                    Create Account
                  </h2>
                  <p className="text-gray-500 text-center mb-8">
                    Join thousands of satisfied customers
                  </p>

                  {/* Name fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input
                      type="text"
                      name="first-name"
                      placeholder="First Name"
                      className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                    <input
                      type="text"
                      name="last-name"
                      placeholder="Last Name"
                      className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  {/* Other fields */}
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                    required
                  />

                  {/* Role */}
                  <select
                    name="role"
                    className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 appearance-none bg-white text-gray-700"
                    required
                  >
                    <option value="" disabled>
                      Select Role
                    </option>
                    <option value="Customer">Customer</option>
                    <option value="Supplier">Supplier</option>
                    <option value="DeliveryManager">Delivery Manager</option>
                  </select>

                  {/* Passwords */}
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                  <input
                    type="password"
                    name="confirm-password"
                    placeholder="Confirm Password"
                    className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                    required
                  />

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 rounded-xl font-medium hover:opacity-90 transition duration-200 shadow-lg"
                  >
                    Create Account
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
