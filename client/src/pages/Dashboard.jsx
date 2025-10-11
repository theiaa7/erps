import React from 'react'
export default function Dashboard() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded shadow">Sales: <strong>Rp 120.000</strong></div>
        <div className="p-4 bg-white rounded shadow">Inventory Items: <strong>128</strong></div>
        <div className="p-4 bg-white rounded shadow">Employees: <strong>12</strong></div>
      </div>
    </div>
  )
}
