import { Link, Outlet } from "react-router-dom";
import "./RoleSelector.css";

export default function RoleSelector() {
  return (
    <div className="role-selector">
      <h2>Select Role</h2>
      <div className="role-links">
        <Link to="/patient/login" className="role-btn">Patient</Link>
        <Link to="/doctor/login" className="role-btn">Doctor</Link>
        <Link to="/admin/login" className="role-btn">Admin</Link>
      </div>
      <Outlet />
    </div>
  );
}
