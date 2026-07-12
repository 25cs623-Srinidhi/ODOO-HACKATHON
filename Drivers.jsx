import { useState } from "react";

export default function Drivers() {
  const [drivers, setDrivers] = useState([
    {
      id: "D101",
      name: "Rajesh Kumar",
      phone: "9876543210",
      license: "TN01DL1234",
      status: "Available"
    },
    {
      id: "D102",
      name: "Priya Sharma",
      phone: "9876543211",
      license: "TN02DL5678",
      status: "On Trip"
    },
    {
      id: "D103",
      name: "Arun Prakash",
      phone: "9876543212",
      license: "TN03DL9012",
      status: "Leave"
    }
  ]);

  const [driverId, setDriverId] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [license, setLicense] = useState("");
  const [status, setStatus] = useState("");

  const [search, setSearch] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  function saveDriver() {
    if (
      driverId === "" ||
      name === "" ||
      phone === "" ||
      license === "" ||
      status === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    if (editIndex !== null) {
      const updated = [...drivers];

      updated[editIndex] = {
        id: driverId,
        name,
        phone,
        license,
        status
      };

      setDrivers(updated);
      setEditIndex(null);

    } else {
      setDrivers([
        ...drivers,
        {
          id: driverId,
          name,
          phone,
          license,
          status
        }
      ]);
    }

    setDriverId("");
    setName("");
    setPhone("");
    setLicense("");
    setStatus("");
  }

  function editDriver(index) {
    const d = drivers[index];

    setDriverId(d.id);
    setName(d.name);
    setPhone(d.phone);
    setLicense(d.license);
    setStatus(d.status);

    setEditIndex(index);
  }

  function deleteDriver(id) {
    setDrivers(drivers.filter((d) => d.id !== id));
  }

  const filteredDrivers = drivers.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.id.toLowerCase().includes(search.toLowerCase()) ||
      d.phone.includes(search)
  );

  return (
    <div style={{ padding: "30px" }}>
      <h1>Driver Management</h1>

      <input
        type="text"
        placeholder="Search Driver..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "300px",
          padding: "10px",
          margin: "20px 0"
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
          placeholder="Driver ID"
          value={driverId}
          onChange={(e) => setDriverId(e.target.value)}
        />

        <input
          placeholder="Driver Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          placeholder="License"
          value={license}
          onChange={(e) => setLicense(e.target.value)}
        />

        <input
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
      </div>

      <button
        onClick={saveDriver}
        style={{
          background: "#0F172A",
          color: "white",
          padding: "10px 20px",
          border: "none",
          cursor: "pointer",
          marginBottom: "20px"
        }}
      >
        {editIndex !== null ? "Update Driver" : "Add Driver"}
      </button>

      <table
        style={{
          width: "100%",
          background: "white",
          borderCollapse: "collapse"
        }}
      >
        <thead style={{ background: "#0F172A", color: "white" }}>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>License</th>
            <th>Status</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {filteredDrivers.map((driver, index) => (
            <tr key={driver.id} style={{ textAlign: "center" }}>
              <td>{driver.id}</td>
              <td>{driver.name}</td>
              <td>{driver.phone}</td>
              <td>{driver.license}</td>
              <td>{driver.status}</td>

              <td>
                <button
                  onClick={() => editDriver(index)}
                  style={{
                    background: "#2563EB",
                    color: "white",
                    border: "none",
                    padding: "8px 12px",
                    cursor: "pointer"
                  }}
                >
                  Edit
                </button>
              </td>

              <td>
                <button
                  onClick={() => deleteDriver(driver.id)}
                  style={{
                    background: "#DC2626",
                    color: "white",
                    border: "none",
                    padding: "8px 12px",
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