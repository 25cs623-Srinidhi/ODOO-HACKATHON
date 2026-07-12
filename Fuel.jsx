const fuelData = [
  {
    id: "F001",
    vehicle: "BUS101",
    fuelType: "Diesel",
    quantity: "80 L",
    cost: "₹7600",
    date: "12-Jul-2026"
  },
  {
    id: "F002",
    vehicle: "BUS102",
    fuelType: "Diesel",
    quantity: "65 L",
    cost: "₹6175",
    date: "12-Jul-2026"
  },
  {
    id: "F003",
    vehicle: "TRK201",
    fuelType: "Diesel",
    quantity: "95 L",
    cost: "₹9025",
    date: "11-Jul-2026"
  },
  {
    id: "F004",
    vehicle: "VAN301",
    fuelType: "Petrol",
    quantity: "45 L",
    cost: "₹4770",
    date: "10-Jul-2026"
  }
];

export default function Fuel() {
  return (
    <div style={{ padding: "30px" }}>
      <h1>Fuel Management</h1>

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
            <th style={{ padding: "12px" }}>Fuel ID</th>
            <th>Vehicle</th>
            <th>Fuel Type</th>
            <th>Quantity</th>
            <th>Cost</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {fuelData.map((fuel) => (
            <tr key={fuel.id} style={{ textAlign: "center" }}>
              <td style={{ padding: "12px" }}>{fuel.id}</td>
              <td>{fuel.vehicle}</td>
              <td>{fuel.fuelType}</td>
              <td>{fuel.quantity}</td>
              <td>{fuel.cost}</td>
              <td>{fuel.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}