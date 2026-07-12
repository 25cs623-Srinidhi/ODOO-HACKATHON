import { useState } from "react";

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([
    {
      id: "BUS101",
      type: "Bus",
      driver: "Rajesh",
      status: "Running",
      fuel: "78%"
    },
    {
      id: "BUS102",
      type: "Bus",
      driver: "Kumar",
      status: "Maintenance",
      fuel: "40%"
    },
    {
      id: "TRK201",
      type: "Truck",
      driver: "Arun",
      status: "Idle",
      fuel: "90%"
    }
  ]);

  const [vehicleId, setVehicleId] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [driver, setDriver] = useState("");
  const [status, setStatus] = useState("");
  const [fuel, setFuel] = useState("");

  const [search, setSearch] = useState("");

  const [editIndex, setEditIndex] = useState(null);

  function addVehicle() {
    if (
      vehicleId === "" ||
      vehicleType === "" ||
      driver === "" ||
      status === "" ||
      fuel === ""
    ) {
      alert("Fill all fields");
      return;
    }

    if (editIndex !== null) {
      const updated = [...vehicles];

      updated[editIndex] = {
        id: vehicleId,
        type: vehicleType,
        driver,
        status,
        fuel
      };

      setVehicles(updated);

      setEditIndex(null);

    } else {
      setVehicles([
        ...vehicles,
        {
          id: vehicleId,
          type: vehicleType,
          driver,
          status,
          fuel
        }
      ]);
    }

    setVehicleId("");
    setVehicleType("");
    setDriver("");
    setStatus("");
    setFuel("");
  }

  function deleteVehicle(id) {
    setVehicles(vehicles.filter((v) => v.id !== id));
  }

  function editVehicle(index) {
    const v = vehicles[index];

    setVehicleId(v.id);
    setVehicleType(v.type);
    setDriver(v.driver);
    setStatus(v.status);
    setFuel(v.fuel);

    setEditIndex(index);
  }

  const filteredVehicles = vehicles.filter((v) =>
    v.id.toLowerCase().includes(search.toLowerCase()) ||
    v.driver.toLowerCase().includes(search.toLowerCase()) ||
    v.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "30px" }}>

      <h1>Vehicle Management</h1>

      <input
        type="text"
        placeholder="Search Vehicle..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "300px",
          padding: "10px",
          marginTop: "20px",
          marginBottom: "20px"
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5,1fr)",
          gap: "10px",
          marginBottom: "20px"
        }}
      >
        <input
          placeholder="Vehicle ID"
          value={vehicleId}
          onChange={(e) => setVehicleId(e.target.value)}
        />

        <input
          placeholder="Vehicle Type"
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
        />

        <input
          placeholder="Driver"
          value={driver}
          onChange={(e) => setDriver(e.target.value)}
        />

        <input
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />

        <input
          placeholder="Fuel"
          value={fuel}
          onChange={(e) => setFuel(e.target.value)}
        />
      </div>

      <button
        onClick={addVehicle}
        style={{
          background: "#0F172A",
          color: "white",
          padding: "10px 20px",
          border: "none",
          cursor: "pointer",
          marginBottom: "20px"
        }}
      >
        {editIndex !== null ? "Update Vehicle" : "Add Vehicle"}
      </button>

      <table
        style={{
          width: "100%",
          background: "white",
          borderCollapse: "collapse"
        }}
      >
        <thead
          style={{
            background: "#0F172A",
            color: "white"
          }}
        >
          <tr>
            <th>ID</th>
            <th>Vehicle</th>
            <th>Driver</th>
            <th>Status</th>
            <th>Fuel</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {filteredVehicles.map((v, index) => (
            <tr key={v.id} style={{ textAlign: "center" }}>
              <td>{v.id}</td>
              <td>{v.type}</td>
              <td>{v.driver}</td>
              <td>{v.status}</td>
              <td>{v.fuel}</td>

              <td>
                <button
                  onClick={() => editVehicle(index)}
                  style={{
                    background: "#2563EB",
                    color: "white",
                    border: "none",
                    padding: "8px 15px",
                    cursor: "pointer"
                  }}
                >
                  Edit
                </button>
              </td>

              <td>
                <button
                  onClick={() => deleteVehicle(v.id)}
                  style={{
                    background: "red",
                    color: "white",
                    border: "none",
                    padding: "8px 15px",
                    cursor: "pointer"
                  }}
                >
                  Delete
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}