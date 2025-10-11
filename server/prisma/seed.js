const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  await prisma.inventoryItem.createMany({
    data: [
      { sku: 'ACM-001', name: 'Widget A', stock: 120, price: 50000 },
      { sku: 'ACM-002', name: 'Widget B', stock: 30, price: 150000 }
    ]
  })

  await prisma.employee.createMany({
    data: [
      { name: 'Bryan Alsty', role: 'Engineer', email: 'bryan@example.com' },
      { name: 'Siti', role: 'Accountant', email: 'siti@example.com' }
    ]
  })

  await prisma.invoice.createMany({
    data: [
      { customer: 'PT ABC', total: 250000, status: 'PAID' },
      { customer: 'CV XYZ', total: 125000, status: 'PENDING' }
    ]
  })
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
