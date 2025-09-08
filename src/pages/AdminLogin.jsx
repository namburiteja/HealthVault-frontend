import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function AdminLogin({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate()

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Hardcoded admin credentials
    if (form.email === "iamadmin@gmail.com" && form.password === "admin@123") {
      alert("Admin login successful!");
      navigate("/admin/dashboard");
    } else {
      alert("Invalid admin credentials!");
    }
  };

  return (
    <div className="card admin-login">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email"placeholder="Email" value={form.email} onChange={handleChange} required />
        <br />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
