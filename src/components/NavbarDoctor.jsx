import { Link } from "react-router-dom";
import "./Navbar.css";

export default function NavbarDoctor() {
  return (
    <nav className="navbar">
      <h2 className="navbar-logo">Doctor Panel</h2>
      <ul className="navbar-links">
        <li><Link to="/doctor/dashboard">Dashboard</Link></li>
        <li><Link to="/doctor/appointments">Appointments</Link></li>
        <li><Link to="/doctor/patients">My Patients</Link></li>
        <li><Link to="/doctor/notes">Notes</Link></li>
        <li><Link to="/doctor/login">Logout</Link></li>
      </ul>
    </nav>
  );
}
