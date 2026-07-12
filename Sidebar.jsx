import { FaBell } from "react-icons/fa";
import {
  FaHome,
  FaBus,
  FaUsers,
  FaRoute,
  FaMapMarkedAlt,
  FaGasPump,
  FaTools,
  FaChartBar,
  FaFileAlt,
  FaCog
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

export default function Sidebar() {

  const navigate = useNavigate();

  const menu = [
    { icon: <FaHome />, name: "Dashboard", path: "/dashboard" },
    { icon: <FaBus />, name: "Vehicles", path: "/vehicles" },
    { icon: <FaUsers />, name: "Drivers", path: "/drivers" },
    { icon: <FaRoute />, name: "Routes", path: "/routes" },
    { icon: <FaMapMarkedAlt />, name: "Trips", path: "/trips" },
    { icon: <FaGasPump />, name: "Fuel", path: "/fuel" },
    { icon: <FaTools />, name: "Maintenance", path: "/maintenance" },
    { icon: <FaChartBar />, name: "Analytics", path: "/analytics" },
    { icon: <FaFileAlt />, name: "Reports", path: "/reports" },
    {
  icon: <FaBell />,
  name: "Notifications",
  path: "/notifications"
},
    { icon: <FaCog />, name: "Settings", path: "/settings" }
  ];

  return (
    <div
      style={{
        width: "250px",
        height: "100vh",
        background: "#0F172A",
        color: "white",
        padding: "20px",
        boxSizing: "border-box"
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "40px",
          cursor: "pointer"
        }}
        onClick={() => navigate("/dashboard")}
      >
        TransitOPS
      </h2>

      {menu.map((item, index) => (
        <div
          key={index}
          onClick={() => navigate(item.path)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            padding: "14px",
            marginBottom: "8px",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "0.3s",
            backgroundColor: "transparent"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#1E293B";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
        >
          <span style={{ fontSize: "18px" }}>{item.icon}</span>
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
}