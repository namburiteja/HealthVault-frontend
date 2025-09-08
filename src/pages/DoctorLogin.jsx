import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

export default function DoctorLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const Navigate = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post("http://192.168.1.145:8090/login/login", form);
      alert(res.data.message || "Doctor login successful!");
      Navigate("/doctor/dashboard");
    } catch (err) {
      alert("Login failed: " + err.response?.data?.message);
    }
  };

  return (
    <div className="card doctor-login">
      <h2>Doctor Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required /><br/>
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required /><br/>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
