import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const vehicleData = {
  labels: ["Bus", "Truck", "Van", "Mini Bus"],
  datasets: [
    {
      label: "Vehicles",
      data: [40, 20, 15, 25],
      backgroundColor: [
        "#2563EB",
        "#16A34A",
        "#F59E0B",
        "#DC2626"
      ]
    }
  ]
};

const fuelData = {
  labels: ["Diesel", "Petrol", "Electric"],
  datasets: [
    {
      data: [65, 25, 10],
      backgroundColor: [
        "#2563EB",
        "#22C55E",
        "#F97316"
      ]
    }
  ]
};

export default function Analytics() {
  return (
    <div
      style={{
        padding: "30px",
        background: "#F1F5F9",
        minHeight: "100vh"
      }}
    >
      <h1>Analytics Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "30px",
          marginTop: "30px"
        }}
      >
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px"
          }}
        >
          <h3>Fleet Distribution</h3>

          <Bar data={vehicleData} />
        </div>

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px"
          }}
        >
          <h3>Fuel Usage</h3>

          <Pie data={fuelData} />
        </div>
      </div>
    </div>
  );
}