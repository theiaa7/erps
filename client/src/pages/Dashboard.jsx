import { useEffect, useState } from "react";
import { Package, Users, Receipt, Wallet } from "lucide-react";

export default function Dashboard() {
  const [summary, setSummary] = useState({
    items: 0,
    employees: 0,
    invoices: 0,
    revenue: 0
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [invRes, empRes, invoiceRes] = await Promise.all([
          fetch("http://localhost:5000/api/inventory").then(r => r.json()),
          fetch("http://localhost:5000/api/employees").then(r => r.json()),
          fetch("http://localhost:5000/api/invoices").then(r => r.json())
        ]);

        const totalRevenue = invoiceRes
          .filter(i => i.status === "PAID")
          .reduce((acc, i) => acc + i.total, 0);

        setSummary({
          items: invRes.length,
          employees: empRes.length,
          invoices: invoiceRes.length,
          revenue: totalRevenue
        });
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);

  const cards = [
    { label: "Total Items", value: summary.items, icon: <Package /> },
    { label: "Employees", value: summary.employees, icon: <Users /> },
    { label: "Invoices", value: summary.invoices, icon: <Receipt /> },
    { label: "Revenue (PAID)", value: `Rp ${summary.revenue.toLocaleString()}`, icon: <Wallet /> }
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c, i) => (
          <div key={i} className="bg-white p-4 rounded-lg shadow flex items-center gap-3">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-md">
              {c.icon}
            </div>
            <div>
              <p className="text-gray-500 text-sm">{c.label}</p>
              <p className="text-xl font-bold">{c.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
