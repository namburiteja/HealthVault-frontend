import { Link } from "react-router-dom";
import "./Navbar.css";

export default function NavbarDoctor() {
  return (
    <nav className="navbar">
      
       <h2 className="navbar-logo">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="Doctor Icon"
          style={{
            width: "30px",
            height: "30px",
            marginRight: "25px",
            verticalAlign: "middle",
          }}
        />Doctor Panel</h2>
      <ul className="navbar-links">
        <li><Link to="/doctor/appointments">Appointments</Link></li>
        <li><Link to="/doctor/patients">My Patients</Link></li>
        <li><Link to="/doctor/login">Logout</Link></li>
      </ul>
    </nav>
  );
}
