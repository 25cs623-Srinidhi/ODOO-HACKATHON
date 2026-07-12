import { useEffect, useState } from "react";
import { api } from "../api";

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .getVehicles()
      .then(setVehicles)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ padding: "30px" }}>Loading vehicles...</div>;
  if (error) return <div style={{ padding: "30px", color: "red" }}>Error: {error}</div>;

  return (
    <div style={{ padding: "30px" }}>
      <h1>Vehicle Management</h1>

      <table
        style={{
          width: "100%",
          marginTop: "25px",
          borderCollapse: "collapse",
          background: "white",
        }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Registration</th>
            <th>Vehicle</th>
            <th>Type</th>
            <th>Odometer</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.vehicle_id}>
              <td>{vehicle.vehicle_id}</td>
              <td>{vehicle.registration_number}</td>
              <td>{vehicle.vehicle_name}</td>
              <td>{vehicle.vehicle_type}</td>
              <td>{vehicle.odometer}</td>
              <td>{vehicle.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
