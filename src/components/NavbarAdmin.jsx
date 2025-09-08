import { Link } from "react-router-dom";
import "./Navbar.css"; 

export default function NavbarAdmin() {
  return (
    <nav className="navbar">
      <h2 className="navbar-logo">Admin Panel</h2>
      <ul className="navbar-links">
        <li><Link to="/admin/dashboard">Dashboard</Link></li>
        <li><Link to="/admin/manage-doctors">Manage Doctors</Link></li>
        <li><Link to="/admin/manage-patients">Manage Patients</Link></li>
        <li><Link to="/admin/reports">Reports</Link></li>
        <li><Link to="/admin/login">Logout</Link></li>
      </ul>
    </nav>
  );
}
