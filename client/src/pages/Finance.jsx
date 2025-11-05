import { useEffect, useState } from "react";
import Table from "../components/Table";

export default function Finance() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/invoices")
      .then((res) => res.json())
      .then((data) => {
        setInvoices(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  const totalRevenue = invoices
    .filter(i => i.status === "PAID")
    .reduce((sum, i) => sum + i.total, 0);

  const columns = [
    { header: "Customer", accessor: "customer" },
    { header: "Total", accessor: "total" },
    { header: "Status", accessor: "status" },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <div className="bg-blue-600 text-white p-5 rounded-lg shadow">
        <h3 className="text-lg font-semibold">Total Revenue</h3>
        <p className="text-3xl font-bold">Rp {totalRevenue.toLocaleString()}</p>
      </div>

      {/* Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Finance Overview</h2>
        <Table data={invoices} columns={columns} />
      </div>
    </div>
  );
}
