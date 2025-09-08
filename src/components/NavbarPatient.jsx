import { Link } from "react-router-dom";
import "./Navbar.css";

export default function NavbarPatient({ patientName, patientId }) {
  return (
    <nav className="navbar">
      <h2 className="navbar-logo">
        Patient Panel - {patientName || ""} 
      </h2>
      <ul className="navbar-links">
        <li>
          <Link to="/patient/dashboard" state={{ patientId, patientName }}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/patient/book" state={{ patientId, patientName }}>
            Book Appointment
          </Link>
        </li>
        <li>
          <Link to="/patient/prescription" state={{ patientId, patientName }}>
            My Prescriptions
          </Link>
        </li>
        <li>
          <Link to="/patient/labs" state={{ patientId, patientName }}>
            My Labs
          </Link>
        </li>
        <li>
          <Link to="/patient/login">Logout</Link>
        </li>
      </ul>
    </nav>
  );
}
