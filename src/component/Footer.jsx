// src/components/Footer.jsx
import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo / About */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">MyWebsite</h2>
          <p className="text-gray-400">
            Building quality web experiences. Connect with us on social media or explore our links.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul>
            <li className="mb-2 hover:text-white cursor-pointer">Home</li>
            <li className="mb-2 hover:text-white cursor-pointer">About</li>
            <li className="mb-2 hover:text-white cursor-pointer">Services</li>
            <li className="mb-2 hover:text-white cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
          <ul>
            <li className="mb-2 hover:text-white cursor-pointer">Blog</li>
            <li className="mb-2 hover:text-white cursor-pointer">FAQs</li>
            <li className="mb-2 hover:text-white cursor-pointer">Support</li>
            <li className="mb-2 hover:text-white cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white"><FaFacebookF /></a>
            <a href="#" className="hover:text-white"><FaTwitter /></a>
            <a href="#" className="hover:text-white"><FaInstagram /></a>
            <a href="#" className="hover:text-white"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} MyWebsite. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
