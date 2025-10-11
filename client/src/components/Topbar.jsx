import React from 'react'
export default function Topbar() {
  return (
    <header className="flex items-center justify-between p-4 border-b bg-white">
      <div className="text-sm text-gray-600">Welcome, Bryan</div>
      <div className="flex items-center gap-3">
        <button className="px-3 py-1 text-sm border rounded">+ New</button>
        <div className="w-8 h-8 rounded-full bg-gray-300" />
      </div>
    </header>
  )
}
