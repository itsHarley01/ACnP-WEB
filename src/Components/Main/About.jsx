import React, { useEffect, useState } from "react";
import { fetchAboutDescription } from "../../Services/Api";
import aboutImage from '../../assets/window2.jpg'; // Ensure this path is correct

function About() {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDescription = async () => {
      try {
        const data = await fetchAboutDescription();
        if (data.length > 0) {
          setDescription(data[0].description);
        }
      } catch (err) {
        setError("Failed to fetch description");
      } finally {
        setLoading(false);
      }
    };

    getDescription();
  }, []);

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-4">{error}</div>;

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200"
      style={{ paddingTop: '0', paddingBottom: '0' }} // Ensure the background spans the full height
    >
      <div className="max-w-7xl w-full flex flex-col lg:flex-row gap-12 items-center py-16">
        {/* Image Section */}
        <div className="flex justify-center lg:w-1/3">
          <img 
            src={aboutImage} 
            alt="About Us" 
            className="w-full h-auto rounded-lg shadow-xl transform transition duration-500 hover:scale-105 object-cover"
            style={{
              height: '600px',
              width: 'auto',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15), 0 10px 10px rgba(0, 0, 0, 0.1)',
            }}
          />
        </div>
        {/* Text Section */}
        <div className="lg:w-2/3 space-y-6">
          <h2 className="text-5xl font-bold text-white leading-tight">
            Your future is just beyond your window.
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {description}
          </p>
         
        </div>
      </div>
    </div>
  );
}

export default About;
