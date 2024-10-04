import React from "react";
import { Link } from "react-router-dom";
import logo2 from "../assets/logo2.png"; // Adjust the path as necessary

const Navbar = () => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const navbarHeight = document.querySelector('nav').offsetHeight; // Get the height of the navbar
      const sectionTop = section.getBoundingClientRect().top + window.scrollY; // Get the top position of the section relative to the document
      
      // Conditional logic for the "about" section
      if (sectionId === 'about') {
        window.scrollTo({
          top: sectionTop, // For "about" section, scroll to its top position
          behavior: 'smooth',
        });
      } else {
        window.scrollTo({
          top: sectionTop - navbarHeight, // Subtract navbar height for other sections
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <nav className="bg-white sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4">
        <div className="flex items-center">
          <Link to="/">
            <img src={logo2} alt="Logo" className="h-20" />
          </Link>
          <ul className="flex space-x-6 ml-6">
            <li>
              <button onClick={() => scrollToSection('about')} className="text-blue hover:text-blue-300">
                About
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('services')} className="text-blue hover:text-blue-300">
                Services
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('products')} className="text-blue hover:text-blue-300">
                Products
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('projects')} className="text-blue hover:text-blue-300">
                Projects
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('contact')} className="text-blue hover:text-blue-300">
                Contact
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('contactform')} className="text-black hover:text-blue-300">
                Appointment Booking
              </button>
            </li>
          </ul>
        </div>
        <div className="mr-10">
          <Link 
            to="book-appointment"  // Link to the booking page
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Book Now
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
