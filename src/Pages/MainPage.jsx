import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import About from "../Components/Main/About";
import Services from "../Components/Main/Services";
import Projects from "../Components/Main/Projects";
import ProductsByType from "../Components/Main/ProductsByType";
import Contact from "../Components/Main/Contact";

// Simple CSS spinner styles
const spinnerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  fontSize: "2rem",
  color: "#3498db",
};

const MainPage = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (location.pathname === "/") {
      const hash = location.hash;
      if (hash) {
        const section = document.querySelector(hash);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  }, [location]);

  if (loading) {
    return (
      <div style={spinnerStyle}>
        <div className="loader">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <main className="container mx-auto px-4 py-10 font-inter">
        {location.pathname.startsWith("/products/") ? (
          <ProductsByType />
        ) : (
          <>
            {/* About Section */}
            <section
              id="about"
              className="relative py-20 mb-10 p-6 bg-cover bg-center rounded-lg text-white"
              style={{ backgroundImage: `url('/assets/book.png')` }} 
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-300 to-blue-300 opacity-80 rounded-lg"></div>
              <div className="relative z-10 text-center">
                <h2 className="text-5xl font-extrabold mb-6 tracking-wide animate-fade-in">About Us</h2>
                <p className="text-lg leading-relaxed text-white mb-6 animate-fade-in-delayed">
                  We are a passionate team delivering top-notch services and products. Learn more about what we do.
                </p>
                <About />
              </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-20 mb-10 rounded-lg shadow-lg">
              <h2 className="text-5xl font-extrabold mb-6 text-center text-gray-900 animate-fade-in">Our Services</h2>
              <p className="text-lg text-center text-gray-700 mb-6">
                Discover the wide range of services we provide to make your life easier.
              </p>
              <Services />
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-20 mb-10 bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-5xl font-extrabold mb-12 text-center text-gray-900 animate-fade-in">Projects</h2>
              <p className="text-lg text-center text-gray-700 mb-6">
                Explore our portfolio of successful projects.
              </p>
              <Projects />
            </section>

            {/* Products Section */}
            <section id="products" className="py-20 mb-10 bg-gradient-to-r from-indigo-300 to-blue-300 rounded-lg shadow-lg p-6">
              <h2 className="text-5xl font-extrabold mb-6 text-center text-white animate-fade-in">Our Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[
                  { title: "Glass", description: "High-quality glass products for your needs.", path: "/products/glass" },
                  { title: "Frame", description: "Durable and stylish framing options available.", path: "/products/frame" },
                  { title: "Complete Unit", description: "Complete units tailored to your specifications.", path: "/products/completeunit" }
                ].map((product) => (
                  <div
                    key={product.title}
                    className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-200"
                    onClick={() => (window.location.href = product.path)}
                  >
                    <h3 className="text-3xl font-semibold text-blue-600">{product.title}</h3>
                    <p className="mt-2 text-gray-700">{product.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Appointment Section */}
            <section
              id="contactform"
              className="py-20 bg-gradient-to-r from-indigo-300 to-blue-300 rounded-lg flex flex-col md:flex-row justify-between items-center shadow-lg mb-10 p-6"
            >
              <div className="flex-1 mb-4 md:mb-0">
                <h2 className="text-5xl font-extrabold mb-4 text-white animate-fade-in">Appointment Booking</h2>
                <p className="text-lg text-gray-200">
                  Schedule your appointment with us today! Choose a date and time that works for you.
                </p>
              </div>
              <div className="p-4">
                <NavLink
                  className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-orange-700 transition duration-200 shadow-md"
                  to="book-appointment"
                >
                  Book Now
                </NavLink>
              </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 mb-10 p-6 bg-white rounded-lg shadow-lg">
              <h2 className="text-5xl font-extrabold mb-6 text-center text-gray-900 animate-fade-in">Contact Us</h2>
              <Contact />
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default MainPage;
