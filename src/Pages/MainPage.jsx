import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import About from "../Components/Main/About";
import Services from "../Components/Main/Services";
import Projects from "../Components/Main/Projects";
import ProductsByType from "../Components/Main/ProductsByType";
import Contact from "../Components/Main/Contact";
import contactImage from "../assets/phone.png"; // Replace with your actual image path



const MainPage = () => {
  const location = useLocation();

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
              <h2 className="text-3xl font-bold text-center">Services Offered</h2>
              <Services />
            </section>

            <section id="projects" className="py-20">
              <h2 className="text-3xl font-bold text-center">Projects Gallery</h2>
              <Projects />
            </section>

            <section id="products" className="py-20 mb-10   p-6">
              <h2 className="text-3xl font-extrabold mb-6 text-center text-black animate-fade-in">Our Samples</h2>
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

            {/* Contact Form Section */}
            <section
  id="contactform"
  className="py-6 bg-blue-500 flex items-center justify-center relative" // Set relative positioning on the container
>
  <div className="flex items-center max-w-2xl w-full"> {/* Keep the existing layout */}
    <div className="flex-1 p-1 max-w-sm"> {/* Added max-w-sm for limiting width of text container */}
      <h2 className="text-1xl text-white font-bold mb-1">
        Elevate your space with "Aparace Cuts n Pieces" glass service-we're ready when you are!
      </h2>
      <NavLink
        className="bg-white text-black py-2 px-4 rounded hover:bg-white-600 transition duration-300 ease-in-out"
        to="book-appointment"
      >
        Book Now!
      </NavLink>
    </div>
    {/* Image with overlapping effect */}
    <img
      src={contactImage}
      alt="Contact Us"
      className="w-1/4 h-auto absolute right-16 transform translate-x-1/4 top 9" // Adjust width and positioning
    />
  </div>
</section>


            <section id="contact" className="py-20">
              <h2 className="text-3xl font-bold text-center">Contact Us</h2>
              <Contact />
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default MainPage;
