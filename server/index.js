const express = require("express");
const path = require("path");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());

// === INVENTORY ===
app.get("/api/inventory", async (_, res) => {
  const items = await prisma.inventoryItem.findMany();
  res.json(items);
});

app.put("/api/inventory/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const updated = await prisma.inventoryItem.update({
      where: { id: Number(id) },
      data,
    });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update inventory item" });
  }
});

// === EMPLOYEES ===
app.get("/api/employees", async (_, res) => {
  const emps = await prisma.employee.findMany();
  res.json(emps);
});

// === INVOICES ===
app.get("/api/invoices", async (_, res) => {
  const inv = await prisma.invoice.findMany();
  res.json(inv);
});

// === VISIT LOG ===
app.post("/api/visit", async (req, res) => {
  const { name } = req.body;
  const log = await prisma.visitLog.create({ data: { name } });
  res.json(log);
});

app.get("/api/visit", async (_, res) => {
  const logs = await prisma.visitLog.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json(logs);
});

// === SERVE FRONTEND BUILD ===
app.use(express.static(path.join(__dirname, "build")));
app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`✅ Server running on port ${port}`));
