import "./AdminDashboard.css";
import NavbarAdmin from "../components/NavbarAdmin";

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <NavbarAdmin />
      <div className="dashboard-header">
        <h2>Welcome Admin!</h2>
        <p>Manage doctors, patients, and reports efficiently from one place.</p>
      </div>

      <div className="dashboard-cards">
        <div className="card doctor-card">
          <h3>👨‍⚕️ Doctors</h3>
          <p>Add, update, or remove doctors from the system.</p>
          <button>Manage Doctors</button>
        </div>

        <div className="card patient-card">
          <h3>🧑‍🤝‍🧑 Patients</h3>
          <p>View patient details, appointments, and history.</p>
          <button>Manage Patients</button>
        </div>

        <div className="card report-card">
          <h3>📄 Reports</h3>
          <p>Access medical reports, lab results, and summaries.</p>
          <button>View Reports</button>
        </div>
      </div>
    </div>
  );
}
