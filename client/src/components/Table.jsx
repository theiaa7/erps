import React from 'react'
export default function Table({ columns, data }) {
  return (
    <div className="overflow-x-auto bg-white rounded-md shadow-sm">
      <table className="min-w-full">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} className="text-left px-4 py-2 text-xs text-gray-500">{c.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="border-t">
              {columns.map((c) => (
                <td key={c.key} className="px-4 py-3 text-sm">{c.render ? c.render(row) : row[c.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
