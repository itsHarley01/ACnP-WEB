// Services.js
import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import { fetchServices } from "../../Services/Api";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Services.css'; // For custom styles

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sliderRef = useRef(null); // Create a ref for the slider

  useEffect(() => {
    const getServices = async () => {
      try {
        const data = await fetchServices();
        setServices(data); // Adjust based on your API response structure
      } catch (err) {
        setError("Failed to fetch services");
      } finally {
        setLoading(false);
      }
    };

    getServices();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '60px', // Adjust padding for centering effect
    responsive: [
      {
        breakpoint: 768,
        settings: {
          centerPadding: '40px',
        },
      },
      {
        breakpoint: 480,
        settings: {
          centerPadding: '20px',
        },
      },
    ],
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center">{error}</div>;

  return (
    <div className="services-carousel relative">
      {/* Left Button */}
      <button
        className="arrow-btn left-0"
        onClick={() => sliderRef.current.slickPrev()}
        aria-label="Previous Service"
      >
        <span className="arrow-icon" style={{ color: 'white' }}>&lt;</span>
      </button>

      {/* Slider */}
      <Slider ref={sliderRef} {...sliderSettings}>
        {services.map((service) => (
          <div key={service.id} className="p-4 service-card">
            <div className="service-content bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
              <div
                className="service-image h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${service.image})` }}
              >
                {/* Placeholder for when image is not available */}
                {!service.image && (
                  <div className="image-placeholder">
                    <img
                      src="path_to_placeholder_image" // Replace with the actual placeholder image path
                      alt="placeholder"
                      className="mx-auto"
                    />
                  </div>
                )}
              </div>
              <div className="service-details text-center p-4">
                <h3 className="text-lg font-bold text-gray-800">{service.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                <button className="go-btn">Go</button>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Right Button */}
      <button
        className="arrow-btn right-0"
        onClick={() => sliderRef.current.slickNext()}
        aria-label="Next Service"
      >
        <span className="arrow-icon" style={{ color: 'white' }}>&gt;</span>
      </button>
    </div>
  );
}

export default Services;
