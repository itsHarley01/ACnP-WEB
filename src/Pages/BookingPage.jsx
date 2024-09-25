import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { createAppointment, getDateByAppointment } from "../Services/Api";

function BookingPage() {
  const [step, setStep] = useState(1);
  const [purpose, setPurpose] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [bookedDates, setBookedDates] = useState({});
  const [checkbox, setCheckbox] = useState(false);
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);

  // Fetch booked dates when the component loads
  async function fetchBookedDates() {
    try {
      const appointments = await getDateByAppointment();
      const formattedDates = {};
      appointments.forEach((app) => {
        const dateKey = app.preferredDate; // Already formatted as YYYY-MM-DD
        if (app.status !== "pending") {
          formattedDates[dateKey] = "booked"; // Mark non-pending dates as booked
        }
      });
      setBookedDates(formattedDates);
    } catch (error) {
      console.error("Error fetching booked dates:", error);
      setError((prev) => ({
        ...prev,
        general: "Failed to load booked dates.",
      }));
    }
  }

  useEffect(() => {
    fetchBookedDates();
  }, []);

  const handleDateChange = (date) => {
    setDate(date);
    const formatted = date.toISOString().split("T")[0];
    setFormattedDate(formatted);
  };

  // Validation checks for each step
  const validateStep = () => {
    let valid = true;
    const newErrors = {};

    if (step === 1 && !purpose) {
      newErrors.purpose = "Purpose is required.";
      valid = false;
    }
    if (step === 2) {
      if (!name) {
        newErrors.name = "Name is required.";
        valid = false;
      }
      if (!address) {
        newErrors.address = "Address is required.";
        valid = false;
      }
      if (!phone) {
        newErrors.phone = "Phone number is required.";
        valid = false;
      }
    }
    if (step === 3) {
      if (!formattedDate) {
        newErrors.date = "Date is required.";
        valid = false;
      }
      if (!time) {
        newErrors.time = "Preferred time is required.";
        valid = false;
      }
    }
    if (step === 5 && !checkbox) {
      newErrors.checkbox = "You must agree to the terms and conditions.";
      valid = false;
    }

    setError(newErrors);
    return valid;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    const appointmentData = {
      service: purpose,
      name: name,
      email: email,
      address: address,
      contactNumber: phone,
      preferredDate: formattedDate,
      preferredTime: time,
      note: additionalInfo,
      status: "pending",
    };

    try {
      const response = await createAppointment(appointmentData);
      setSuccess(true);
      setError({});
    } catch (err) {
      setError((prev) => ({
        ...prev,
        general: "Failed to create appointment. Please try again.",
      }));
      setSuccess(false);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Purpose of Booking
            </label>
            <select
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className={`w-full border px-3 py-2 ${
                error.purpose ? "border-red-500" : "border-gray-300"
              } rounded-md`}
              required
            >
              <option value="" disabled>
                Select a service
              </option>
              <option value="Measurement">Measurement</option>
              <option value="Installation">Installation</option>
              <option value="Custom Cutting">Custom Cutting</option>
              <option value="Roll Up Installation">Roll Up Installation</option>
            </select>
            {error.purpose && (
              <p className="text-red-500 text-sm">{error.purpose}</p>
            )}
          </div>
        );
      case 2:
        return (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full border px-3 py-2 ${
                error.name ? "border-red-500" : "border-gray-300"
              } rounded-md`}
              required
            />
            {error.name && <p className="text-red-500 text-sm">{error.name}</p>}
            <label className="block text-gray-700 mb-2 mt-4">
              Email (optional)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Optional"
              className="w-full border px-3 py-2 border-gray-300 rounded-md"
            />
            <label className="block text-gray-700 mb-2 mt-4">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={`w-full border px-3 py-2 ${
                error.address ? "border-red-500" : "border-gray-300"
              } rounded-md`}
              required
            />
            {error.address && (
              <p className="text-red-500 text-sm">{error.address}</p>
            )}
            <label className="block text-gray-700 mb-2 mt-4">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`w-full border px-3 py-2 ${
                error.phone ? "border-red-500" : "border-gray-300"
              } rounded-md`}
              required
            />
            {error.phone && (
              <p className="text-red-500 text-sm">{error.phone}</p>
            )}
          </div>
        );
      case 3:
        return (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Select Date</label>
            <Calendar
              onChange={handleDateChange}
              tileClassName={({ date }) => {
                const dateString = date.toISOString().split("T")[0];
                return bookedDates[dateString] ? "custom-red" : null;
              }}
            />
            {error.date && <p className="text-red-500 text-sm">{error.date}</p>}
            <label className="block text-gray-700 mb-2 mt-4">
              Preferred Time
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className={`w-full border px-3 py-2 ${
                error.time ? "border-red-500" : "border-gray-300"
              } rounded-md`}
              required
            />
            {error.time && <p className="text-red-500 text-sm">{error.time}</p>}
          </div>
        );
      case 4:
        return (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Additional Information (Optional)
            </label>
            <textarea
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              rows="4"
              className="w-full border px-3 py-2 border-gray-300 rounded-md"
            />
          </div>
        );
      case 5:
        return (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              <input
                type="checkbox"
                checked={checkbox}
                onChange={(e) => setCheckbox(e.target.checked)}
              />{" "}
              I agree to the terms and conditions
            </label>
            {error.checkbox && (
              <p className="text-red-500 text-sm">{error.checkbox}</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white w-[600px] p-6 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Booking Form</h2>
        <form onSubmit={handleSubmit}>
          {renderStepContent()}
          {error.general && (
            <p className="text-red-500 text-sm mb-4">{error.general}</p>
          )}
          {success && (
            <p className="text-green-500 text-sm mb-4">
              Appointment successfully created!
            </p>
          )}
          <div className="flex justify-between mt-4">
            {step > 1 && (
              <button
                type="button"
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                onClick={() => setStep(step - 1)}
              >
                Previous
              </button>
            )}
            {step < 5 ? (
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleNext}
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Confirm Booking
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookingPage;
