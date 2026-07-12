import { FaBus, FaUsers, FaRoute, FaMapMarkedAlt } from "react-icons/fa";

const cards = [
  {
    title: "Total Vehicles",
    value: "120",
    icon: <FaBus size={35} />,
    color: "#2563EB"
  },
  {
    title: "Drivers",
    value: "85",
    icon: <FaUsers size={35} />,
    color: "#16A34A"
  },
  {
    title: "Routes",
    value: "24",
    icon: <FaRoute size={35} />,
    color: "#EA580C"
  },
  {
    title: "Active Trips",
    value: "42",
    icon: <FaMapMarkedAlt size={35} />,
    color: "#DC2626"
  }
];

export default function DashboardCards() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: "20px"
      }}
    >
      {cards.map((card, index) => (
        <div
          key={index}
          style={{
            background: "white",
            borderRadius: "12px",
            padding: "25px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div>
              <h3>{card.title}</h3>

              <h1
                style={{
                  color: card.color
                }}
              >
                {card.value}
              </h1>
            </div>

            <div
              style={{
                color: card.color
              }}
            >
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}