import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PatientRegister() {
  const [form, setForm] = useState({
    patientName: "", patientEmail: "", address: "", password: "", confirmPassword: ""
  });
  const navigate = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      let res = await axios.post("http://172.30.106.15:8090/login/patientregister", form);
      alert(res.data.message || "Patient registered successfully!");
      navigate("/patient/login");
    } catch (err) {
      alert("Error: " + err.response?.data?.message);
    }
  };

  return (
    <div className="card patient-register">
      <h2>Patient Registration</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="patientName" placeholder="Full Name" value={form.patientName} onChange={handleChange} required /><br/>
        <input type="email" name="patientEmail" placeholder="Email" value={form.patientEmail} onChange={handleChange} required /><br/>
        <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange} required /><br/>
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required /><br/>
        <input type="password" name="confirmPassword" placeholder="Re-enter Password" value={form.confirmPassword} onChange={handleChange} required /><br/>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
