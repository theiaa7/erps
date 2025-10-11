import React from 'react'
import { useQuery } from '@tanstack/react-query'
import api from '../api/client'
import Table from '../components/Table'

async function fetchEmployees() {
  const { data } = await api.get('/employees')
  return data
}

export default function Employees() {
  const { data = [], isLoading } = useQuery(['employees'], fetchEmployees)

  const columns = [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Name' },
    { key: 'role', title: 'Role' },
    { key: 'email', title: 'Email' },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Employees</h2>
        <button className="px-3 py-2 bg-blue-600 text-white rounded">Add Employee</button>
      </div>

      {isLoading ? <div>Loading...</div> : <Table columns={columns} data={data} />}
    </div>
  )
}
