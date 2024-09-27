import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { fetchServices } from "../../Services/Api";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getServices = async () => {
      try {
        const data = await fetchServices();
        setServices(data);
      } catch (err) {
        setError("Failed to fetch services");
      } finally {
        setLoading(false);
      }
    };

    getServices();
  }, []);

  // Slick settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-6">
      <Slider {...settings}>
        {services.map((service) => (
          <div key={service.id} className="px-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Service Image */}
              <div
                className="h-40 bg-cover bg-center"
                style={{ backgroundImage: `url(${service.image})` }}
              ></div>

              {/* Service Content */}
              <div className="p-6">            
                <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Services;
