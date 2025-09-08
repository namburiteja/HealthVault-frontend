import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function PatientLogin() {
  const [form, setForm] = useState({ patientEmail: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://172.30.106.15:8090/login/login", form);
        console.log(res.data);
      // store in localStorage if needed
      localStorage.setItem("Id", res.data.id);
      localStorage.setItem("patientId", res.data.patientId);
      localStorage.setItem("patientName", res.data.username);
      localStorage.setItem("role", "patient");

      alert(res.data.message || "Patient login successful!");

      // pass patientId and name via state
      navigate("/patient/dashboard", {
        state: { patientId: res.data.patientId, patientName: res.data.username }
      });
    } catch (err) {
      alert("Login failed: " + err.response?.data?.message);
    }
  };

  return (
    <div className="card patient-register">
      <h2>Patient Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="patientEmail"
          placeholder="Email"
          value={form.patientEmail}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Login</button>
        <p>
          Not registered yet?{" "}
          <Link to="/patient/register" className="role-btn">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
