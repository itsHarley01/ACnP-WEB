import emailjs from "emailjs-com";
import React, { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import backgroundImage from "../../assets/window2.jpg"; // Import the icons
import { createMessage } from "../../Services/Api";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    note: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload on form submission

    console.log(formData);
    try {
      const response = await createMessage(formData);
      console.log("Message created successfully:", response);
      // Handle success (e.g., clear form, show success message)
    } catch (error) {
      console.error("Error creating message:", error);
      // Handle the error (e.g., show an error message)
    }
  };

  return (
    <div
      className="max-w-6xl mx-auto p-4"
      style={{
        backgroundImage: `url(${backgroundImage})`, // Use the imported variable
        backgroundSize: "cover", // Make the background cover the entire container
        backgroundPosition: "center", // Center the background image
        height: "100vh",
        borderRadius: "50", // Set a height for the container
      }}
    >
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Business Details Section with Opacity */}
        <div className="p-6 bg-white bg-opacity-90 rounded-lg shadow-lg flex-1">
          {" "}
          {/* Add bg-opacity */}
          <h2 className="text-2xl font-bold mb-4 text-center">Contact Us</h2>
          <div className="mb-8">
            <h4 className="font-bold flex items-center text-lg">
              <FaPhone className="text-blue-500 mr-2" />
              CALL US
            </h4>
            <p className="text-md"> (123) 567-8911, (234) 987-6543</p>
          </div>
          <div className="mb-8">
            <h4 className="font-bold flex items-center text-lg">
              <FaMapMarkerAlt className="text-blue-500 mr-2" />
              LOCATION
            </h4>
            <p className="text-md">
              {" "}
              121 Rock Street, 21 Avenue, New York, NY 10001-9000
            </p>
          </div>
          <div className="mb-8">
            <h4 className="font-bold flex items-center text-lg">
              <FaClock className="text-blue-500 mr-2" />
              EMAIL
            </h4>
            <p className="text-md"> acnp@gmail.com</p>
          </div>
        </div>

        {/* Contact Form Section with Opacity */}
        <form
          onSubmit={handleSubmit}
          className="p-6 bg-white bg-opacity-90 rounded-lg shadow-lg flex-1" // Add bg-opacity
        >
          <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>

          <div className="mb-4">
            <label className="block mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              id="note"
              name="note"
              value={formData.note}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              rows="4"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
