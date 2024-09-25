import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import About from "../Components/Main/About";
import Services from "../Components/Main/Services";
import Projects from "../Components/Main/Projects";
import ProductsByType from "../Components/Main/ProductsByType";
import Contact from "../Components/Main/Contact";

const MainPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      const hash = location.hash; // Get the hash from the URL
      if (hash) {
        const section = document.querySelector(hash);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  }, [location]);

  return (
    <div>
      <main className="container mx-auto">
        {location.pathname.startsWith("/products/") ? (
          <ProductsByType />
        ) : (
          <>
            <section id="about" className="py-20">
              <About />
            </section>

            <section id="services" className="py-20">
              <h2 className="text-3xl font-bold">Services</h2>
              <Services />
            </section>

            <section id="projects" className="py-20">
              <h2 className="text-3xl font-bold">Projects</h2>
              <Projects />
            </section>

            <section id="products" className="py-20">
              <h2 className="text-3xl font-bold">Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div
                  className="bg-gray-200 p-4 rounded-lg cursor-pointer"
                  onClick={() => (window.location.href = "/products/glass")}
                >
                  <h3 className="text-xl font-semibold">Glass</h3>
                </div>
                <div
                  className="bg-gray-200 p-4 rounded-lg cursor-pointer"
                  onClick={() => (window.location.href = "/products/frame")}
                >
                  <h3 className="text-xl font-semibold">Frame</h3>
                </div>
                <div
                  className="bg-gray-200 p-4 rounded-lg cursor-pointer"
                  onClick={() =>
                    (window.location.href = "/products/completeunit")
                  }
                >
                  <h3 className="text-xl font-semibold">Complete Unit</h3>
                </div>
              </div>
            </section>

            <section
              id="contactform"
              className="py-20 bg-gray-100 flex justify-between items-center"
            >
              <div className="flex-1 p-4">
                <h2 className="text-3xl font-bold mb-4">Appointment Booking</h2>
                <p className="text-lg">
                  Schedule your appointment with us today! Choose a date and
                  time that works for you.
                </p>
              </div>
              <div>
                <NavLink
                  className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600"
                  to="book-appointment"
                >
                  Book Now
                </NavLink>
              </div>
            </section>

            <section id="contact" className="py-20">
              <h2 className="text-3xl font-bold">Contact</h2>
              <Contact />
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default MainPage;
