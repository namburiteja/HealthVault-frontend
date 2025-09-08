import { BrowserRouter, Route, Routes } from "react-router-dom";
import RoleSelector from "./components/RoleSelector";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import Appointments from "./pages/Appointments";
import DoctorLogin from "./pages/DoctorLogin";
import PatientDashboard from "./pages/PatientDashboard";
import PatientLogin from "./pages/PatientLogin";
import DoctorEdit from "./pages/Doctoredit";
import PatientProfile from "./pages/PatientProfile";
import PatientRegister from "./pages/PatientRegister";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RoleSelector />}>
          <Route path="patient/login" element={<PatientLogin />} />
          <Route path="patient/register" element={<PatientRegister />} />
          <Route path="doctor/login" element={<DoctorLogin />} />
          <Route path="admin/login" element={<AdminLogin />} />
        </Route>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/patient/dashboard" element={<PatientDashboard />} />
        <Route path="/doctor/appointments" element={<Appointments />} />
        <Route path="/doctor/edit/:patientId" element={<DoctorEdit />} />
        <Route path="/patient/profile" element={<PatientProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
