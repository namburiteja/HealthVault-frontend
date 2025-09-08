import { useState } from "react";
import axios from "axios";
import "./BookAppointment.css";
import NavbarPatient from "./NavbarPatient";

export default function BookAppointment({ patientId, patientName }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ✅ Take patient from localStorage
  const xx = localStorage.getItem("patientId");
  const yy = localStorage.getItem("patientName");

  // 🔍 Fetch doctor name suggestions
  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);
    setError("");
    setSuccess("");

    if (value.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await axios.post(
        "http://192.168.1.145:8090/doctor/doctorsuggestions",
        { doctorName: value },
        { headers: { "Content-Type": "application/json" } }
      );
      setSuggestions(res.data || []);
    } catch (err) {
      setError("Failed to fetch suggestions");
    }
  };

  // 🩺 Select doctor from suggestions
  const fetchDoctorDetails = (doctor) => {
    setSelectedDoctor(doctor);
    setSuggestions([]);
    setQuery(doctor.doctorName);
    setError("");
    setSuccess("");
  };

  // 📅 Book Appointment
  const bookAppointment = async () => {
    if (!selectedDoctor) return;

    // ✅ Correct IST Date-Time
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000; // 5 hrs 30 mins in ms
    const istTime = new Date(
      now.getTime() + istOffset - now.getTimezoneOffset() * 60000
    );

    const year = istTime.getFullYear();
    const month = String(istTime.getMonth() + 1).padStart(2, "0");
    const day = String(istTime.getDate()).padStart(2, "0");
    const hours = String(istTime.getHours()).padStart(2, "0");
    const minutes = String(istTime.getMinutes()).padStart(2, "0");
    const seconds = String(istTime.getSeconds()).padStart(2, "0");

    const istDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

    try {
      await axios.post(
        "http://192.168.1.145:8090/patient/bookappointment",
        {
          patientId: xx, // from localStorage
          doctorId: selectedDoctor.doctorId, // from selected doctor
          date: istDateTime, // ✅ Correct IST DateTime
        },
        { headers: { "Content-Type": "application/json" } }
      );

      setSuccess(
        `Appointment booked with Dr. ${selectedDoctor.doctorName} on ${istDateTime}`
      );
    } catch (err) {
      setError("Failed to book appointment");
    }
  };

  return (
    <>
      <NavbarPatient patientName={yy} patientId={xx} />
      <div className="book-appointment">
        <h2>Book an Appointment</h2>

        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search doctor by name..."
        />

        {/* Suggestions list */}
        {suggestions.length > 0 && (
          <ul className="suggestions">
            {suggestions.map((doc) => (
              <li
                key={doc.doctorId}
                onClick={() => fetchDoctorDetails(doc)}
                className="suggestion-item"
              >
                {doc.doctorName}
              </li>
            ))}
          </ul>
        )}

        {/* Error / Success messages */}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        {/* Selected doctor details */}
        {selectedDoctor && (
          <div className="doctor-details">
            <h3>Doctor Details</h3>
            <p>
              <b>Name:</b> {selectedDoctor.doctorName}
            </p>
            <p>
              <b>Qualification:</b> {selectedDoctor.qualification}
            </p>
            <p>
              <b>Specialization:</b> {selectedDoctor.specialization}
            </p>
            <p>
              <b>Experience:</b> {selectedDoctor.experience} years
            </p>
            <p>
              <b>Timings:</b> {selectedDoctor.timings}
            </p>
            <p>
              <b>Email:</b> {selectedDoctor.email}
            </p>

            {/* 📌 Book Button */}
            <button className="book-btn" onClick={bookAppointment}>
              Book Appointment
            </button>
          </div>
        )}
      </div>
    </>
  );
}
