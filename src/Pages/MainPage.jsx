import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import Header from "../components/Header";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import About from "../Components/Main/About";
import Services from "../Components/Main/Services";
import Projects from "../Components/Main/Projects";

const MainPage = () => {
  const productTypes = ["Glass", "Frame", "Complete Unit"];

  return (
    <div>
      <Header />
      <Navbar />

      <main className="container mx-auto">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            {productTypes.map((type) => (
              <Link
                key={type}
                to={`/products/${type.toLowerCase()}`} // Navigate to products/{type}
                className="bg-gray-300 p-6 rounded-lg shadow-lg flex flex-col items-center hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold">{type}</h3>
                <p className="mt-2">Click to see {type} products</p>
              </Link>
            ))}
          </div>
        </section>

        <section id="contactform" className="py-20">
          <h2 className="text-3xl font-bold">Appointment Booking</h2>
          <p>Your appointment booking form goes here.</p>
        </section>

        <section id="contact" className="py-20">
          <h2 className="text-3xl font-bold">Contact</h2>
          <p>Your contact content goes here.</p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default MainPage;
