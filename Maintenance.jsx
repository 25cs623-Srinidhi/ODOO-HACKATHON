const maintenanceData = [
  {
    id: "M001",
    vehicle: "BUS101",
    issue: "Brake Inspection",
    mechanic: "Ramesh",
    status: "Completed",
    date: "12-Jul-2026"
  },
  {
    id: "M002",
    vehicle: "BUS102",
    issue: "Engine Service",
    mechanic: "Suresh",
    status: "In Progress",
    date: "13-Jul-2026"
  },
  {
    id: "M003",
    vehicle: "TRK201",
    issue: "Oil Change",
    mechanic: "Arun",
    status: "Pending",
    date: "14-Jul-2026"
  },
  {
    id: "M004",
    vehicle: "VAN301",
    issue: "Tyre Replacement",
    mechanic: "Kumar",
    status: "Completed",
    date: "10-Jul-2026"
  }
];

export default function Maintenance() {
  return (
    <div style={{ padding: "30px" }}>
      <h1>Maintenance Management</h1>

      <table
        style={{
          width: "100%",
          marginTop: "25px",
          borderCollapse: "collapse",
          background: "white",
          borderRadius: "10px",
          overflow: "hidden"
        }}
      >
        <thead
          style={{
            background: "#0F172A",
            color: "white"
          }}
        >
          <tr>
            <th style={{ padding: "12px" }}>ID</th>
            <th>Vehicle</th>
            <th>Issue</th>
            <th>Mechanic</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {maintenanceData.map((item) => (
            <tr key={item.id} style={{ textAlign: "center" }}>
              <td style={{ padding: "12px" }}>{item.id}</td>
              <td>{item.vehicle}</td>
              <td>{item.issue}</td>
              <td>{item.mechanic}</td>
              <td>{item.status}</td>
              <td>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}