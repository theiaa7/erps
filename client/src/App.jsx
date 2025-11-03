import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Invoices from "./pages/Invoices";
import Inventory from "./pages/Inventory";
import Employees from "./pages/Employees";
import Finance from "./pages/Finance";
import Settings from "./pages/Settings";

function Layout() {
  const location = useLocation();
  const noLayoutRoutes = ["/"]; // route yang tidak perlu sidebar & header

  const hideSidebar = noLayoutRoutes.includes(location.pathname);
  const hideHeader = noLayoutRoutes.includes(location.pathname);

  return (
    <div className="flex">
      {/* Sidebar */}
      {!hideSidebar && <Sidebar />}

      <main className={`${!hideSidebar ? "ml-64 flex-1 min-h-screen bg-gray-50" : "w-full flex-1 min-h-screen bg-gray-50"}`}>
        {/* Header */}
        {!hideHeader && <Header />}

        <div className={`${!hideSidebar ? "p-6" : ""}`}>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
