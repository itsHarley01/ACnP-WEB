import React, { useEffect, useState } from "react";
import { fetchServices } from "../../Services/Api";

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-wrap justify-center">
      {services.map((service) => (
        <div
          key={service.id} // Adjust based on your API response
          className="relative m-4 w-64 h-40 bg-cover bg-center"
          style={{ backgroundImage: `url(${service.image})` }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4">
            <h3 className="text-xl font-bold">{service.name}</h3>
            <p className="text-sm">{service.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Services;
