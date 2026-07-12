import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import DashboardCards from "../components/DashboardCards/DashboardCards";

export default function Dashboard() {
  return (
    <div
      style={{
        display: "flex",
        background: "#F1F5F9",
        minHeight: "100vh"
      }}
    >
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Navbar />

        <div style={{ padding: "30px" }}>
          <DashboardCards />

          <div
            style={{
              marginTop: "40px",
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: "20px"
            }}
          >
            <div
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 5px 10px rgba(0,0,0,0.1)"
              }}
            >
              <h2>Recent Trips</h2>

              <table
                style={{
                  width: "100%",
                  marginTop: "20px",
                  borderCollapse: "collapse"
                }}
              >
                <thead>
                  <tr>
                    <th>Trip</th>
                    <th>Driver</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>T001</td>
                    <td>Rajesh</td>
                    <td>Running</td>
                  </tr>

                  <tr>
                    <td>T002</td>
                    <td>Priya</td>
                    <td>Completed</td>
                  </tr>

                  <tr>
                    <td>T003</td>
                    <td>Arun</td>
                    <td>Scheduled</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 5px 10px rgba(0,0,0,0.1)"
              }}
            >
              <h2>Quick Stats</h2>

              <p>🟢 Running Vehicles : 65</p>
              <p>🟡 Maintenance : 12</p>
              <p>🔴 Idle Vehicles : 18</p>
              <p>👨 Drivers Available : 45</p>
              <p>⛽ Fuel Efficiency : 92%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}