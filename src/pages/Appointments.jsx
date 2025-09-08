import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarDoctor from "../components/NavbarDoctor";
import "../styles/Appointments.css";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const doctorId = localStorage.getItem("doctorId") || 1;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post("http://192.168.1.145:8090/doctor/gettodayappointments", {
        doctorId: doctorId,
      })
      .then((res) => setAppointments(res.data))
      .catch((err) => console.error("Error fetching appointments", err));
  }, [doctorId]);

  // Navigate with full patient data
  const handleRowClick = (appt) => {
    navigate(`/doctor/edit/${appt[3]}`, { state: { patient: appt } });
  };

  return (
    <div>
      <NavbarDoctor />
      <div className="page-container">
        <h2>Upcoming Appointments</h2>

        {appointments.length === 0 ? (
          <p>No appointments found for today.</p>
        ) : (
          <table className="styled-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Patient</th>
                <th>Age</th>
                <th>Email</th>
                <th>Address</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt, index) => (
                <tr
                  key={index}
                  onClick={() => handleRowClick(appt)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{appt[0]}</td> {/* appointmentId */}
                  <td>{appt[5]}</td> {/* patientName */}
                  <td>{appt[13]}</td> {/* age */}
                  <td>{appt[12]}</td> {/* email */}
                  <td>{appt[6]}</td> {/* address */}
                  <td>{new Date(appt[1]).toLocaleDateString()}</td> {/* date */}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Appointments;
