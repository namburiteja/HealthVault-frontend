import { useLocation } from "react-router-dom";
import NavbarPatient from "../components/NavbarPatient";
import PatientProfile from "./PatientProfile";

export default function PatientDashboard() {
  const location = useLocation();
  const { patientId, patientName } = location.state || {};

  return (
    <div>
      <NavbarPatient patientName={patientName} patientId={patientId}/>
     <PatientProfile patientId={patientId} />
      <h2>Welcome {patientName || "Patient"}!</h2>
      <p>Here you can book appointments and check your medical history.</p>
    </div>
  );
}
