const { PrismaClient } = require('@prisma/client')
const { faker } = require('@faker-js/faker')
const prisma = new PrismaClient()

async function main() {
  console.log("Seeding mulai ...")

  const inventoryData = Array.from({ length: 20 }).map(() => ({
    sku: faker.string.alphanumeric(8).toUpperCase(),
    name: faker.commerce.productName(),
    stock: faker.number.int({ min: 0, max: 500 }),
    price: faker.number.int({ min: 10000, max: 500000 })
  }))
  await prisma.inventoryItem.createMany({ data: inventoryData })
  console.log("seed #1 done")

  const roles = ['Engineer', 'Accountant', 'Sales', 'HR', 'Manager']
  const employeeData = Array.from({ length: 10 }).map(() => ({
    name: faker.person.fullName(),
    role: faker.helpers.arrayElement(roles),
    email: faker.internet.email()
  }))
  await prisma.employee.createMany({ data: employeeData })
  console.log("seed #2 done")

  const invoiceData = Array.from({ length: 15 }).map(() => ({
    customer: faker.company.name(),
    total: faker.number.int({ min: 100000, max: 2000000 }),
    status: faker.helpers.arrayElement(['PAID', 'PENDING'])
  }))
  await prisma.invoice.createMany({ data: invoiceData })
  console.log("seed #3 done")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
