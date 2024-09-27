import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // Icons for mobile menu
import logo2 from "../assets/logo2.png"; // Adjust the path as necessary

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo Section (Left Aligned) */}
        <div className="flex-shrink-0">
          <Link to="/" className="text-xl font-semibold text-gray-900">
            <img src={logo2} alt="Logo" className="h-16 sm:h-20 transition-transform transform hover:scale-105" />
          </Link>
        </div>

        {/* Navigation Links (Centered) */}
        <div className="hidden lg:flex justify-center items-center flex-grow">
          <ul className="flex space-x-10">
            {["About", "Services", "Products", "Projects", "Contact", "Appointment"].map((text, index) => (
              <li key={index}>
                <Link
                  to={`/#${text.toLowerCase()}`}
                  className="text-gray-700 hover:text-blue-900 font-medium transition duration-300 ease-in-out"
                >
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Menu Button (Right Aligned) */}
        <div className="lg:hidden text-gray-700" onClick={toggleMenu}>
          {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <ul className="absolute top-16 left-0 w-full bg-white shadow-lg flex flex-col items-center py-4 space-y-4 lg:hidden">
            {["About", "Services", "Products", "Projects", "Contact", "Appointment"].map((text, index) => (
              <li key={index}>
                <Link
                  to={`/#${text.toLowerCase()}`}
                  className="text-gray-700 hover:text-gray-900 font-medium transition duration-300 ease-in-out"
                  onClick={toggleMenu} // Close menu on click
                >
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
