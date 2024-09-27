import emailjs from "emailjs-com";
import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // EmailJS configuration
    const serviceID = "service_qgsom4b"; // Replace with your EmailJS service ID
    const templateID = "template_3dhmz4a"; // Replace with your EmailJS template ID
    const userID = "rdPJtio-xAEev2laS"; // Replace with your EmailJS user ID

    // Sending email using EmailJS
    emailjs.send(serviceID, templateID, formData, userID)
      .then((response) => {
        console.log("Email sent successfully!", response.status, response.text);
        // Optionally reset form fields after successful submission
        setFormData({ name: "", email: "", message: "" });
        alert("Message sent successfully!");
      })
      .catch((err) => {
        console.error("Failed to send email. Error: ", err);
        alert("Failed to send message, please try again later.");
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-lg shadow-gray-400"
    >
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>

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
          className="w-full p-2 border border-gray-300 rounded"
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
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
          rows="4"
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Send Message
      </button>
    </form>
  );
};

export default ContactForm;
