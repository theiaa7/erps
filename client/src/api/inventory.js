app.post('/api/inventory', async (req, res) => {
  try {
    const item = await prisma.inventoryItem.create({
      data: req.body
    });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/inventory/:id', async (req, res) => {
  try {
    const item = await prisma.inventoryItem.update({
      where: { id: Number(req.params.id) },
      data: req.body
    });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/inventory/:id', async (req, res) => {
  try {
    await prisma.inventoryItem.delete({
      where: { id: Number(req.params.id) }
    });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
