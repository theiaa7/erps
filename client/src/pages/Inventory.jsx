import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import api from '../api/client'
import Table from '../components/Table'

async function fetchItems() {
  const { data } = await api.get('/inventory')
  return data
}

export default function Inventory() {
  const { data = [], isLoading } = useQuery(['inventory'], fetchItems)
  const [q, setQ] = useState('')

  const columns = [
    { key: 'sku', title: 'SKU' },
    { key: 'name', title: 'Name' },
    { key: 'stock', title: 'Stock' },
    { key: 'price', title: 'Price', render: (r) => `Rp ${r.price}` },
  ]

  const filtered = data.filter((d) => d.name.toLowerCase().includes(q.toLowerCase()))

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Inventory</h2>
        <div className="flex gap-2">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search item" className="px-3 py-2 border rounded" />
          <button className="px-3 py-2 bg-blue-600 text-white rounded">Add Item</button>
        </div>
      </div>

      {isLoading ? <div>Loading...</div> : <Table columns={columns} data={filtered} />}
    </div>
  )
}
