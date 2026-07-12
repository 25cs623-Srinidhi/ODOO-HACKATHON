const trips = [
  {
    id: "T001",
    vehicle: "BUS101",
    driver: "Rajesh Kumar",
    route: "Coimbatore → Chennai",
    departure: "08:00 AM",
    arrival: "04:00 PM",
    status: "Running"
  },
  {
    id: "T002",
    vehicle: "BUS102",
    driver: "Priya Sharma",
    route: "Bangalore → Mysore",
    departure: "09:30 AM",
    arrival: "12:30 PM",
    status: "Scheduled"
  },
  {
    id: "T003",
    vehicle: "TRK201",
    driver: "Arun Prakash",
    route: "Madurai → Trichy",
    departure: "11:00 AM",
    arrival: "01:30 PM",
    status: "Completed"
  },
  {
    id: "T004",
    vehicle: "VAN301",
    driver: "Meena Devi",
    route: "Salem → Erode",
    departure: "02:00 PM",
    arrival: "03:30 PM",
    status: "Running"
  }
];

export default function Trips() {
  return (
    <div style={{ padding: "30px" }}>
      <h1>Trip Management</h1>

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
        <thead style={{ background: "#0F172A", color: "white" }}>
          <tr>
            <th style={{ padding: "12px" }}>Trip ID</th>
            <th>Vehicle</th>
            <th>Driver</th>
            <th>Route</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {trips.map((trip) => (
            <tr key={trip.id} style={{ textAlign: "center" }}>
              <td style={{ padding: "12px" }}>{trip.id}</td>
              <td>{trip.vehicle}</td>
              <td>{trip.driver}</td>
              <td>{trip.route}</td>
              <td>{trip.departure}</td>
              <td>{trip.arrival}</td>
              <td>{trip.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}