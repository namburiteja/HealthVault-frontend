import { useEffect, useState } from "react";
import axios from "axios";

export default function PatientProfile({ patientId }) {
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState("");
  const [editableData, setEditableData] = useState({});

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (!patientId) {
          setError("Patient ID not found. Please login again.");
          return;
        }

        // ✅ Fetch patient details
        const response = await axios.post(
          "http://172.30.106.15:8090/patient/getmydetails",
          { patientId }
        );

        const data = response.data[0]; // since API returns an array
        setPatient(data);
        setEditableData(data); // copy data for editing
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch details");
      }
    };

    fetchDetails();
  }, [patientId]);

  const handleChange = (e) => {
    setEditableData({ ...editableData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
  try {
    const response = await axios.patch(
      "http://172.30.106.15:8090/patient/updateblood",
      {
        patientId: patient.patientId,          // required for backend
        bloodGroup: editableData.bloodGroup,
        medicalHistory: editableData.medicalHistory,
        habits: editableData.habits  // new value
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    alert("Details updated successfully!");
    setPatient({ ...patient, bloodGroup: editableData.bloodGroup }); // update UI
  } catch (err) {
    alert(
      "Failed to update details: " +
        (err.response?.data?.message || err.message)
    );
  }
};

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!patient) return <p>Loading patient details...</p>;

  return (
    <div className="card patient-profile">
      <h2>My Profile</h2>

      <p><b>ID:</b> {patient.patientId}</p>

      <p>
        <b>Name:</b> {patient.patientName}
      </p>

      <p>
        <b>Email:</b> {patient.patientEmail}
      </p>

      <p>
        <b>Address:</b>{" "}
        {patient.address ? (
          patient.address
        ) : (
          <input
            type="text"
            name="address"
            value={editableData.address || ""}
            onChange={handleChange}
          />
        )}
      </p>

      <p>
        <b>Blood Group:</b>{" "}
        {patient.bloodGroup ? (
          patient.bloodGroup
        ) : (
          <input
            type="text"
            name="bloodGroup"
            value={editableData.bloodGroup || ""}
            onChange={handleChange}
          />
        )}
      </p>

      <p>
        <b>Medical History:</b>{" "}
        {patient.medicalHistory ? (
          patient.medicalHistory
        ) : (
          <input
            type="text"
            name="medicalHistory"
            value={editableData.medicalHistory || ""}
            onChange={handleChange}
          />
        )}
      </p>

      <p>
        <b>Habits:</b>{" "}
        {patient.habits ? (
          patient.habits
        ) : (
          <input
            type="text"
            name="habits"
            value={editableData.habits || ""}
            onChange={handleChange}
          />
        )}
      </p>

      <button onClick={handleSave} style={{ marginTop: "15px" }}>
        Save
      </button>
    </div>
  );
}
