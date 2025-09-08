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
import BookAppointment from "./components/BookAppointment";
import ViewMyPrescription from "./pages/ViewMyPrescriptions";
import ViewMyLabs from "./pages/ViewMyLabs";

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
        <Route path="/patient/prescription" element={<ViewMyPrescription />} />
        <Route path="/patient/book" element={<BookAppointment />} />
        <Route path="/patient/labs" element={<ViewMyLabs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
