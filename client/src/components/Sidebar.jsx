import { NavLink } from "react-router-dom";
import { LayoutDashboard, Package, Users, Wallet, Settings, ReceiptText } from "lucide-react";

export default function Sidebar() {
  const links = [
    { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { to: "/inventory", label: "Inventory", icon: <Package size={18} /> },
    { to: "/employees", label: "Employees", icon: <Users size={18} /> },
    { to: "/invoices", label: "Invoices", icon: <ReceiptText size={18} /> },
    { to: "/finance", label: "Finance", icon: <Wallet size={18} /> },
    { to: "/settings", label: "Settings", icon: <Settings size={18} /> },
  ];

  return (
    <aside className="w-64 bg-white shadow-md h-screen fixed left-0 top-0 p-5">
      <h1 className="text-2xl font-bold mb-8"><a href="/">Ur company here!</a></h1>
      <nav className="flex flex-col gap-2">
        {links.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md transition ${isActive
                ? "bg-blue-100 text-blue-600 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            {icon}
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
