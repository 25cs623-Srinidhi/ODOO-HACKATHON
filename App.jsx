import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoutesPage from "./pages/RoutesPage";
import Trips from "./pages/Trips";
import Fuel from "./pages/Fuel";
// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Vehicles from "./pages/Vehicles";
import Drivers from "./pages/Drivers";
import Maintenance from "./pages/Maintenance";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication */}
        <Route path="/" element={<Login />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Vehicle Management */}
        <Route path="/vehicles" element={<Vehicles />} />

        {/* Driver Management */}
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/routes" element={<RoutesPage />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/fuel" element={<Fuel />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
