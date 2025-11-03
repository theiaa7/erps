import { useState } from "react";

export default function Table({ data, columns }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const valueA = a[sortConfig.key];
    const valueB = b[sortConfig.key];

    if (typeof valueA === "number" && typeof valueB === "number") {
      return sortConfig.direction === "asc" ? valueA - valueB : valueB - valueA;
    }

    if (!valueA || !valueB) return 0;

    return sortConfig.direction === "asc"
      ? valueA.toString().localeCompare(valueB.toString())
      : valueB.toString().localeCompare(valueA.toString());
  });

  return (
    <table className="w-full text-sm bg-white rounded-lg shadow">
      <thead className="bg-gray-100">
        <tr>
          {columns.map(col => (
            <th
              key={col.accessor}
              onClick={() => handleSort(col.accessor)}
              className="p-3 text-left font-semibold cursor-pointer"
            >
              {col.header}
              {sortConfig.key === col.accessor &&
                (sortConfig.direction === "asc" ? " ▲" : " ▼")}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} className="border-b">
            {columns.map((col) => (
              <td key={col.header} className="px-4 py-2">
                {col.cell ? col.cell(item) : item[col.accessor]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>

    </table>
  );
}
