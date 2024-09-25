import React, { useState } from "react";
import { createAppointment } from "../Services/Api"; // Import the function

function BookingPage() {
  const [purpose, setPurpose] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState(""); // New state for address
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [error, setError] = useState(null); // Handle error
  const [success, setSuccess] = useState(false); // Handle success

  const handleSubmit = async (e) => {
    e.preventDefault();

    const appointmentData = {
      service: purpose,
      name: name,
      email: email,
      contactNumber: phone,
      address: address,
      preferredDate: date,
      preferredTime: time,
      note: additionalInfo,
      status: "pending",
    };

    try {
      const response = await createAppointment(appointmentData); // Call the API
      console.log("Appointment created:", response);
      setSuccess(true); // Set success state
      setError(null); // Clear any previous errors
      // Optionally reset the form
      setPurpose("");
      setName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setDate("");
      setTime("");
      setAdditionalInfo("");
    } catch (err) {
      console.error("Error creating appointment:", err);
      setError("Failed to create appointment. Please try again."); // Set error state
      setSuccess(false); // Reset success state if error occurs
    }
  };

  return (
    <div className="h-full min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md w-[600px] rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-2xl font-bold mb-6">Booking Form</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Purpose of Booking
          </label>
          <select
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            required
            className="border border-gray-300 rounded w-full py-2 px-3"
          >
            <option value="" disabled>
              Select a service
            </option>
            <option value="Measurement">Measurement</option>
            <option value="Installation">Installation</option>
            <option value="Custom Cutting">Custom Cutting</option>
            <option value="Roll Up Installation">Roll Up Installation</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border border-gray-300 rounded w-full py-2 px-3"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 rounded w-full py-2 px-3"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="border border-gray-300 rounded w-full py-2 px-3"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Address for Service
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="border border-gray-300 rounded w-full py-2 px-3"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Preferred Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="border border-gray-300 rounded w-full py-2 px-3"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Preferred Time
          </label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            className="border border-gray-300 rounded w-full py-2 px-3"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Additional Information
          </label>
          <textarea
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            rows="4"
            className="border border-gray-300 rounded w-full py-2 px-3"
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}
        {success && (
          <p className="text-green-500">Appointment successfully created!</p>
        )}

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
          >
            Book Appointment
          </button>
        </div>
      </form>
    </div>
  );
}

export default BookingPage;
