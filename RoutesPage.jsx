const routes = [
  {
    id: "R001",
    source: "Coimbatore",
    destination: "Chennai",
    distance: "510 km",
    duration: "8 hrs"
  },
  {
    id: "R002",
    source: "Bangalore",
    destination: "Mysore",
    distance: "145 km",
    duration: "3 hrs"
  },
  {
    id: "R003",
    source: "Madurai",
    destination: "Trichy",
    distance: "135 km",
    duration: "2.5 hrs"
  },
  {
    id: "R004",
    source: "Salem",
    destination: "Erode",
    distance: "70 km",
    duration: "1.5 hrs"
  }
];

export default function RoutesPage() {
  return (
    <div style={{ padding: "30px" }}>
      <h1>Route Management</h1>

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
            <th style={{ padding: "12px" }}>Route ID</th>
            <th>Source</th>
            <th>Destination</th>
            <th>Distance</th>
            <th>Duration</th>
          </tr>
        </thead>

        <tbody>
          {routes.map((route) => (
            <tr key={route.id} style={{ textAlign: "center" }}>
              <td style={{ padding: "12px" }}>{route.id}</td>
              <td>{route.source}</td>
              <td>{route.destination}</td>
              <td>{route.distance}</td>
              <td>{route.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}