import React, { useState } from "react";
import "./Addlab.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddLab() {
  const [labData, setLabData] = useState({
    patientId: "",
    doctorId: "",
    cost: "",
    results: "" // store file content here
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLabData({ ...labData, [name]: value });
  };

  // 📂 Handle file read
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    // if text-based file
    reader.onload = (event) => {
      const fileContent = event.target.result;
      setLabData((prev) => ({ ...prev, results: fileContent }));
      toast.success("📄 File content loaded!");
    };

    // Decide read type (you can tweak this based on file type)
    if (file.type === "text/plain" || file.type === "application/json" || file.type.includes("csv")) {
      reader.readAsText(file); // ✅ Reads text files
    } else {
      reader.readAsDataURL(file); // fallback (binary as Base64 string)
    }
  };

  const handleSubmit = async () => {
    if (!labData.results) {
      toast.error("❌ Please upload a lab report file!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8090/doctor/insertlab", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(labData), // now sending content
      });

      const data = await response.json();
      toast.success("✅ Lab record inserted successfully!");
      console.log("Response:", data);
    } catch (error) {
      toast.error("❌ Error inserting lab record!");
      console.error(error);
    }
  };

  return (
    <div className="addlab-container">
      <h2 className="addlab-title">Add Lab Report</h2>

      <input
        type="number"
        name="cost"
        placeholder="Cost"
        value={labData.cost}
        onChange={handleChange}
        className="addlab-input"
      />

      <input
        type="number"
        name="doctorId"
        placeholder="Doctor ID"
        value={labData.doctorId}
        onChange={handleChange}
        className="addlab-input"
      />

      <input
        type="number"
        name="patientId"
        placeholder="Patient ID"
        value={labData.patientId}
        onChange={handleChange}
        className="addlab-input"
      />

      {/* File Upload */}
      <input
        type="file"
        accept=".txt,.csv,.json,.pdf,.jpg,.png,.jpeg"
        onChange={handleFileChange}
        className="addlab-input"
      />

      <button onClick={handleSubmit} className="addlab-button">
        Submit
      </button>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
