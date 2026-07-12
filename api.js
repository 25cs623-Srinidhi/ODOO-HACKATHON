// src/api.js
// Central place for talking to the TransitOPS backend.
// Put this file in your React project's src/ folder.

const BASE_URL = "http://localhost:5000/api";

function getToken() {
  return localStorage.getItem("token");
}

async function request(path, options = {}) {
  const token = getToken();

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

export const api = {
  login: (email, password) =>
    request("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),

  getVehicles: () => request("/vehicles"),
  getDrivers: () => request("/drivers"),
  getTrips: () => request("/trips"),
  getFuelLogs: () => request("/fuel"),
  getMaintenance: () => request("/maintenance"),
  getExpenses: () => request("/expenses"),
  getDashboardSummary: () => request("/dashboard/summary"),
  getVehicleDistribution: () => request("/dashboard/vehicle-distribution"),
  getFuelUsage: () => request("/dashboard/fuel-usage"),
};
