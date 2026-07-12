const notifications = [
  {
    id: 1,
    title: "Low Fuel Alert",
    message: "BUS101 fuel level dropped below 20%.",
    priority: "High",
    time: "10 mins ago"
  },
  {
    id: 2,
    title: "Maintenance Due",
    message: "TRK201 requires engine servicing tomorrow.",
    priority: "Medium",
    time: "30 mins ago"
  },
  {
    id: 3,
    title: "Trip Completed",
    message: "BUS102 has successfully completed Route R002.",
    priority: "Low",
    time: "1 hour ago"
  },
  {
    id: 4,
    title: "Driver Shift Reminder",
    message: "Driver Rajesh Kumar starts duty at 8:00 AM.",
    priority: "Medium",
    time: "Tomorrow"
  }
];

export default function Notifications() {
  return (
    <div
      style={{
        padding: "30px",
        background: "#F1F5F9",
        minHeight: "100vh"
      }}
    >
      <h1>Notification Center</h1>

      {notifications.map((item) => (
        <div
          key={item.id}
          style={{
            background: "white",
            padding: "20px",
            marginTop: "20px",
            borderLeft:
              item.priority === "High"
                ? "6px solid red"
                : item.priority === "Medium"
                ? "6px solid orange"
                : "6px solid green",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)"
          }}
        >
          <h3>{item.title}</h3>

          <p>{item.message}</p>

          <b>Priority:</b> {item.priority}

          <br />

          <b>Time:</b> {item.time}
        </div>
      ))}
    </div>
  );
}