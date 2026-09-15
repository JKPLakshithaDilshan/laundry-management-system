import React from "react";
import FB from "../assets/facebook.png"
import IG from "../assets/link.png";
import LI from "../assets/gmail.png";
import TW from "../assets/phone.png";
import YT from "../assets/whatsapp.png";
import WP from "../assets/youtube.png";

const Footer = () => {
  const contactInfo = [
    { icon: TW, label: "+1 (123) 456-7890", alt: "Phone" },
    { icon: LI, label: "example@gmail.com", alt: "Gmail" },
  ];

  const socialIcons = [
    { src: FB, alt: "Facebook" },
    { src: IG, alt: "LinkedIn" },
    { src: YT, alt: "WhatsApp" },
    { src: WP, alt: "YouTube" },
  ];

  return (
    <footer className="bg-gradient-to-br from-red-600 to-red-800 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-semibold mb-6">Contact Us</h3>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 mb-4 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          <textarea
            rows="4"
            maxLength="500"
            placeholder="Enter your message"
            className="w-full p-3 mb-4 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400"
          ></textarea>

          <button className="w-full bg-white text-red-700 font-semibold py-3 rounded-md hover:bg-red-100 transition">
            Submit
          </button>
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>

          <div className="space-y-4 mb-10">
            {contactInfo.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center md:justify-start gap-4"
              >
                <img
                  src={item.icon}
                  alt={item.alt}
                  className="w-8 h-8 cursor-pointer"
                />
                <span className="text-lg">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-center md:justify-start gap-6 flex-wrap">
            {socialIcons.map((icon, idx) => (
              <img
                key={idx}
                src={icon.src}
                alt={icon.alt}
                className="w-12 h-12 cursor-pointer transform transition-transform duration-300 hover:scale-110"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="w-4/5 mx-auto h-px bg-white/30 my-10"></div>

      <p className="text-center text-sm md:text-base">
        Innovista © {new Date().getFullYear()} All Rights Reserved
      </p>

      <div className="w-4/5 mx-auto h-px bg-white/30 my-6"></div>
    </footer>
  );
};

export default Footer;
