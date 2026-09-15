import React from "react";
import Navbar from "./Componenet/Navbar";

function AboutUs() {
  return (
    <>
      <Navbar />
      <section className="px-6 py-12 bg-gray-50 text-gray-800 min-h-screen mt-10">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-10 text-blue-600">About Us</h1>
          <p className="text-lg leading-relaxed mb-20">
            <strong>Fresh Wash</strong> — Redefining Clean, Revolutionizing Convenience.  
            At <strong>Fresh Wash</strong>, we believe modern life deserves modern solutions.  
            Our journey began with a vision to transform how people experience laundry.  
            We’re not just a laundry service; we’re a blend of technology, convenience,  
            and exceptional care. Here’s a glimpse into who we are, our values,  
            and our commitment to making your life simpler.
          </p>


          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white shadow-md rounded-2xl p-8 transition duration-300 hover:bg-blue-50 hover:shadow-xl">
              <h2 className="text-2xl font-semibold mb-4 text-blue-500">
                Our Mission
              </h2>
              <p>
                To make laundering effortless, reliable, and delightful —  
                so you can spend time on things that truly matter.
              </p>
            </div>

        
            <div className="bg-white shadow-md rounded-2xl p-8 transition duration-300 hover:bg-blue-50 hover:shadow-xl">
              <h2 className="text-2xl font-semibold mb-4 text-blue-500">
                How We Work
              </h2>
              <p>
                Book via our app or website, choose a pickup window,  
                and our trained care team handles the rest — sorting,  
                cleaning with eco-friendly products, and meticulous finishing.  
                Real-time updates keep you in the loop.
              </p>
            </div>

 
            <div className="bg-white shadow-md rounded-2xl p-8 transition duration-300 hover:bg-blue-50 hover:shadow-xl">
              <h2 className="text-2xl font-semibold mb-4 text-blue-500">
                Tech + Care
              </h2>
              <p>
                Smart routing, secure tracking, and a customer-first support team —  
                we balance automation with human touch to deliver consistent quality.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutUs;