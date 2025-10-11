const express = require('express')
const cors = require('cors')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const app = express()
app.use(cors())
app.use(express.json())

// Inventory
app.get('/api/inventory', async (req, res) => {
  const items = await prisma.inventoryItem.findMany()
  res.json(items)
})

// Employees
app.get('/api/employees', async (req, res) => {
  const emps = await prisma.employee.findMany()
  res.json(emps)
})

// Invoices
app.get('/api/invoices', async (req, res) => {
  const inv = await prisma.invoice.findMany()
  res.json(inv)
})

const port = process.env.PORT || 5000
app.listen(port, () => console.log('Server running on', port))
