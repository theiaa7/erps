import { useState, useEffect } from "react";
import Table from "../components/Table";

export default function Invoices() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/invoices")
      .then((res) => res.json())
      .then(setData);
  }, []);

  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Customer", accessor: "customer" },
    { header: "Total", accessor: "total" },
    { header: "Status", accessor: "status" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Invoices</h2>
      <Table data={data} columns={columns} />
    </div>
  );
}
