import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavbarDoctor from "../components/NavbarDoctor";
import "../styles/DoctorEdit.css";

export default function DoctorEdit() {
  const { patientId } = useParams();
  const [patient, setPatient] = useState(null);
  const [note, setNote] = useState("");
  const [prescription, setPrescription] = useState("");
  const [previousEntries, setPreviousEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const doctorId = localStorage.getItem("doctorId") || 1;

  useEffect(() => {
    if (!patientId) return;

    const fetchData = async () => {
      try {
        // 1. Fetch patient details
        const patientRes = await axios.post(
          "http://192.168.1.145:8090/patient/getmydetails",
          { patientId },
          { headers: { "Content-Type": "application/json" } }
        );
        setPatient(patientRes.data[0]);

        // 2. Fetch previous prescriptions/notes
        const presRes = await axios.post(
          "http://192.168.1.145:8090/patient/getpreviouspres",
          { patientId },
          { headers: { "Content-Type": "application/json" } }
        );

        const formatted = (presRes.data || []).map((item) => ({
          doctorName: item[1],        // Doctor Name
          date: item[0] || new Date().toISOString().split("T")[0], // Assuming date is first column
          note: item[10] || "",       // Doctor Note
          prescription: item[12] || "", // Prescription
        }));

        setPreviousEntries(formatted);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load patient or previous entries.");
        setLoading(false);
      }
    };

    fetchData();
  }, [patientId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!patient) return;

    try {
      const payload = {
        patientId: patient.patientId,
        doctorId: parseInt(doctorId),
        note: note,
        prescription: prescription,
      };

      fetch("http://192.168.1.145:8090/doctor/writeprescription",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }).then(res => res.json()).then(data => {
        console.log(data);
      })


      // Add new entry to previousEntries to display immediately
      setPreviousEntries([
        {
          doctorName: "You",
          date: new Date().toISOString().split("T")[0],
          note: note,
          prescription: prescription,
        },
        ...previousEntries, // latest entry on top
      ]);

      setNote("");
      setPrescription("");
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message || "Error saving notes & prescription. Check backend."
      );
    }
  };

  if (!patient) return <p style={{ padding: "20px" }}>Loading patient details...</p>;

  return (
    <div>
      <NavbarDoctor />

      {/* Patient Details */}
      <div className="patient-container">
        <h2>Patient Details</h2>
        <div className="patient-details">
          <p><strong>ID:</strong> {patient.patientId}</p>
          <p><strong>Name:</strong> {patient.patientName}</p>
          <p><strong>Address:</strong> {patient.address}</p>
          <p><strong>Blood Group:</strong> {patient.bloodGroup}</p>
          <p><strong>Medical History:</strong> {patient.medicalHistory}</p>
          <p><strong>Habits:</strong> {patient.habits}</p>
          <p><strong>Email:</strong> {patient.patientEmail}</p>
        </div>
      </div>
      {/* Notes & Prescription Form */}
      <div className="form-container">
        <h2>Doctor Notes & Prescription</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Notes</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              required
              placeholder="Enter notes about patient..."
            />
          </div>

          <div className="form-group">
            <label>Prescription</label>
            <textarea
              value={prescription}
              onChange={(e) => setPrescription(e.target.value)}
              required
              placeholder="Enter prescription..."
            />
          </div>

          <button type="submit" className="submit-btn">
            Save
          </button>
        </form>
      </div>


      {/* Previous Prescriptions / Notes */}
      <div className="previous-prescriptions">
        <h2>Previous Notes & Prescriptions</h2>

        {loading && <p>Loading previous entries...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {previousEntries.length > 0 ? (
          previousEntries.map((entry, idx) => (
            <div key={idx} className="prescription-card">
              <p><strong>Date:</strong> {entry.date}</p>
              <p><strong>Doctor:</strong> {entry.doctorName}</p>
              {entry.note && <p><strong>Note:</strong> {entry.note}</p>}
              {entry.prescription && (
                <div>
                  <strong>Prescription:</strong>
                  <pre className="prescription-text">{entry.prescription}</pre>
                </div>
              )}
            </div>
          ))
        ) : (
          !loading && <p>No previous notes or prescriptions found.</p>
        )}
      </div>

      
      <style>{`
        .prescription-card {
          background: #f9f9f9;
          padding: 15px;
          margin-bottom: 15px;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .prescription-text {
          background: #eee;
          padding: 10px;
          border-radius: 5px;
          white-space: pre-wrap;
        }
      `}</style>
    </div>
  );
}
