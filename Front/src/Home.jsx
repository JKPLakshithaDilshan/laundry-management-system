import React from 'react'
import Navbar from './Componenet/Navbar'
import homeImage from "./assets/home.png"
import { useNavigate } from "react-router-dom"; 

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <section className="flex flex-col items-center justify-start min-h-screen px-6 py-12 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100">

        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-12 text-center">
          Welcome to Fresh Wash
        </h1>

        <div className="relative w-full max-w-3xl mb-8 group">
          <img
            src={homeImage}
            alt="Fresh Wash"
            className="w-full rounded-xl shadow-lg transition duration-300 transform group-hover:scale-105 opacity-100 group-hover:opacity-70"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-20 transition duration-900">
            <p className="text-white text-2xl md:text-3xl font-semibold bg-black bg-opacity-50 px-6 py-3 rounded-lg text-center">
              Clean Clothes, Happy Life
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate("/Services")}
          className="cursor-pointer px-8 py-3 mb-12 bg-gradient-to-r from-purple-300 to-pink-300 text-gray-800 font-semibold rounded-xl shadow-md transition duration-300 hover:from-pink-300 hover:to-purple-300 hover:shadow-lg"
        >
          Get Started
        </button>
        <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl">
          {[
            { title: "Fast Service", desc: "Quick pickup and delivery for your convenience." },
            { title: "Eco-Friendly", desc: "Using eco-friendly detergents and methods." },
            { title: "Quality Care", desc: "Meticulous attention to every garment." },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-white shadow-md rounded-2xl p-6 text-center transition duration-300 hover:bg-purple-100 hover:shadow-xl cursor-pointer"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-700">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;