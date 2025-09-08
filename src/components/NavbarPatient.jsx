import { Link } from "react-router-dom";
import "./Navbar.css";

export default function NavbarPatient({ patientName , patientId }) {
  return (
    <nav className="navbar">
      <h2 className="navbar-logo">Patient Panel - {patientName || ""} {patientId}</h2>
      <ul className="navbar-links">
        {/* <li><Link to="/patient/dashboard">Dashboard</Link></li> */}
        <li><Link to="/patient/book">Book Appointment</Link></li>
        {/* <li><Link to="/patient/history">Medical History</Link></li> */}
        {/* <li><Link to="/patient/profile">Profile</Link></li> */}
        <li><Link to="/patient/login">Logout</Link></li>
      </ul>
    </nav>
  );
}
