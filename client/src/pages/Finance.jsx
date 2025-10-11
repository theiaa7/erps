import React from 'react'
import { useQuery } from '@tanstack/react-query'
import api from '../api/client'
import Table from '../components/Table'

async function fetchInvoices() {
  const { data } = await api.get('/invoices')
  return data
}

export default function Finance() {
  const { data = [], isLoading } = useQuery(['invoices'], fetchInvoices)
  const columns = [
    { key: 'id', title: 'ID' },
    { key: 'customer', title: 'Customer' },
    { key: 'total', title: 'Total' },
    { key: 'status', title: 'Status' },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Finance</h2>
        <button className="px-3 py-2 bg-blue-600 text-white rounded">New Invoice</button>
      </div>

      {isLoading ? <div>Loading...</div> : <Table columns={columns} data={data} />}
    </div>
  )
}
