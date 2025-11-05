import { useEffect, useState } from "react";
import Table from "../components/Table";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/employees")
      .then(res => res.json())
      .then(data => {
        setEmployees(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "name" },
    { header: "Role", accessor: "role" },
    { header: "Email", accessor: "email" },
  ];


  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Employees</h2>
      <Table data={employees} columns={columns} />
    </div>
  );
}
