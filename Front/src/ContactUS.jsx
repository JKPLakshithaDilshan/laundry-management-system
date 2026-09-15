import React from "react";
import Navbar from "./Componenet/Navbar";

function ContactUs() {
  return (
    <>
      <Navbar />
      <section className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            We’d love to hear from you! Whether you have a question, feedback,
            or a service request — our team is here to help.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-lg">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-300 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-300 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Your Message
              </label>
              <textarea
                id="message"
                rows="4"
                placeholder="Type your message here..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-300 focus:outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-300 to-pink-300 text-gray-800 font-semibold rounded-xl shadow-md transition duration-300 hover:from-pink-300 hover:to-purple-300 hover:shadow-lg cursor-pointer"
            >
              Send Message
            </button>
          </form>
        </div>

        <p className="text-gray-600 mt-10 text-sm">
          © {new Date().getFullYear()} Fresh Wash. All rights reserved.
        </p>
      </section>
    </>
  );
}

export default ContactUs;
