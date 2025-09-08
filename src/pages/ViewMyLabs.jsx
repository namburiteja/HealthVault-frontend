import { useEffect, useState } from "react";
import axios from "axios";
import NavbarPatient from "../components/NavbarPatient";
import "./ViewMyLabs.css"; // optional for custom styles

export default function ViewMyLabs() {
  const patientId = localStorage.getItem("patientId");
  const patientName = localStorage.getItem("patientName");

  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!patientId) {
      setError("Patient ID not found.");
      return;
    }

    setLoading(true);
    axios
      .post("http://192.168.1.145:8090/patient/getlabs", { patientId })
      .then((res) => {
        // assuming res.data is the List<List<>> format
        setLabs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch lab data.");
        setLoading(false);
      });
  }, [patientId]);

  return (
    <>
      <NavbarPatient patientId={patientId} patientName={patientName} />
      <div className="view-labs-container">
        <h2>My Lab Reports</h2>

        {loading && <p>Loading labs...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && !error && labs.length === 0 && (
          <p>No lab reports found.</p>
        )}

        {!loading && !error && labs.length > 0 && (
          <div className="labs-list">
            {labs.map((lab, index) => {
              const [reportId, cost, doctorName, patientName, details] = lab;
              return (
                <div key={index} className="lab-card">
                  <h3>Report ID: {reportId}</h3>
                  <p><strong>Doctor:</strong> {doctorName}</p>
                  <p><strong>Patient:</strong> {patientName}</p>
                  <p><strong>Cost:</strong> ₹{cost}</p>
                  <pre className="lab-details">{details}</pre>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
