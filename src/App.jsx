import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoleSelector from "./components/RoleSelector";
import PatientLogin from "./pages/PatientLogin";
import PatientRegister from "./pages/PatientRegister";
import DoctorLogin from "./pages/DoctorLogin";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import PatientProfile from "./pages/PatientProfile";

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
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/patient/dashboard" element={<PatientDashboard />} />
        <Route path="/patient/profile" element={<PatientProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
