import { useState } from "react";

export default function Settings() {
  const [company, setCompany] = useState("TransitOPS");
  const [email, setEmail] = useState("admin@transitops.com");
  const [theme, setTheme] = useState("Light");

  const handleSave = () => {
    alert("Settings Saved Successfully!");
  };

  return (
    <div
      style={{
        padding: "30px",
        background: "#F1F5F9",
        minHeight: "100vh",
      }}
    >
      <h1>Settings</h1>

      <div
        style={{
          background: "white",
          padding: "30px",
          marginTop: "20px",
          borderRadius: "10px",
          width: "500px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <label>Company Name</label>
        <br />
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "8px",
            marginBottom: "20px",
          }}
        />

        <label>Admin Email</label>
        <br />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "8px",
            marginBottom: "20px",
          }}
        />

        <label>Theme</label>
        <br />
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "8px",
            marginBottom: "20px",
          }}
        >
          <option>Light</option>
          <option>Dark</option>
        </select>

        <button
          onClick={handleSave}
          style={{
            width: "100%",
            padding: "12px",
            background: "#0F172A",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}