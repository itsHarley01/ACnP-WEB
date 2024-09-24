import React from "react";
import { Link } from "react-router-dom";
import logo2 from "../assets/logo2.png"; // Adjust the path as necessary

const Navbar = () => {
  return (
    <nav className="bg-gray-800 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4">
        <div>
          <Link to="/">
            <img src={logo2} alt="Logo" className="h-20" />{" "}
            {/* Adjust height as needed */}
          </Link>
        </div>
        <ul className="flex space-x-6">
          <li>
            <Link to="/about" className="text-white hover:text-gray-300">
              About
            </Link>
          </li>
          <li>
            <Link to="/services" className="text-white hover:text-gray-300">
              Services
            </Link>
          </li>
          <li>
            <Link to="/products" className="text-white hover:text-gray-300">
              Products
            </Link>
          </li>
          <li>
            <Link to="/projects" className="text-white hover:text-gray-300">
              Projects
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-white hover:text-gray-300">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/contactform" className="text-white hover:text-gray-300">
              Appointment Booking
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
