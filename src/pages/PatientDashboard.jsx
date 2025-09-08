import { useLocation } from "react-router-dom";
import NavbarPatient from "../components/NavbarPatient";
import PatientProfile from "./PatientProfile";  
import BookAppointment from "../components/BookAppointment";

export default function PatientDashboard(props) {
  const location = useLocation();

  // ✅ Extract values safely from location.state
  const { patientId: locPatientId, patientName: locPatientName } = location.state || {};

  // ✅ Final values: props take priority, fallback to location state
  const patientId = props.patientId || locPatientId;
  const patientName = props.patientName || locPatientName;

  return (
    <div>
      {/* Navbar stays static */}
      <NavbarPatient patientName={patientName} patientId={patientId} />

      {/* Dashboard content */}
      <div className="dashboard-content">
    

        {/* Components that use props */}
        <div className="dashboard-sections">
          {/* <BookAppointment patientId={patientId} /> */}
          {/* Uncomment this when you want Profile inside Dashboard */}
          <PatientProfile patientId={patientId} />
        </div>
      </div>
    </div>
  );
}
