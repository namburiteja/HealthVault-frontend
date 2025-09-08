import { useEffect, useState } from "react";
import axios from "axios";
import NavbarPatient from "../components/NavbarPatient";

export default function ViewMyPrescription() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const patientId = localStorage.getItem("patientId");
  const patientName = localStorage.getItem("patientName");

  useEffect(() => {
    if (!patientId) return;

    const fetchPrescriptions = async () => {
      try {
        const res = await axios.post(
          "http://192.168.1.145:8090/patient/getpreviouspres",
          { patientId },
          { headers: { "Content-Type": "application/json" } }
        );

        // map each record into an object with only required fields
        const formatted = (res.data || []).map((item) => ({
          doctorName: item[1], // Doctor Name
          note: item[10], // Doctor Note
          prescription: item[12], // Prescription
        }));

        setPrescriptions(formatted);
        setLoading(false);
      } catch (err) {
        setError("Failed to load prescriptions.");
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, [patientId]);

  return (
    <>
    <NavbarPatient patientId={patientId} patientName={patientName} />
    <div className="prescription-container">
      <h2>Prescriptions for {patientName}</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {prescriptions.length > 0 ? (
        prescriptions.map((pres, idx) => (
          <div key={idx} className="prescription-card">
            <h3>Doctor: {pres.doctorName}</h3>
            <p><b>Note:</b> {pres.note}</p>
            <p><b>Prescription:</b></p>
            <pre className="prescription-text">{pres.prescription}</pre>
          </div>
        ))
      ) : (
        !loading && <p>No prescriptions found.</p>
      )}

      <style>{`
        .prescription-container {
          max-width: 800px;
          margin: 20px auto;
          padding: 20px;
        }
        .prescription-card {
          background: #f9f9f9;
          padding: 15px;
          margin-bottom: 15px;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .prescription-card h3 {
          margin-top: 0;
          color: #0077cc;
        }
        .prescription-text {
          background: #eee;
          padding: 10px;
          border-radius: 5px;
          white-space: pre-wrap; /* keeps \n line breaks */
        }
      `}</style>
    </div>
    </>
  );
}
