import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import Table from "../components/Table";
import InventoryForm from "../components/InventoryForm";

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const filteredItems = items.filter(item =>
    item.sku.toLowerCase().includes(search.toLowerCase()) ||
    item.name.toLowerCase().includes(search.toLowerCase())
  );



  function reload() {
    fetch("http://localhost:5000/api/inventory")
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setLoading(false);
      });
  }

  useEffect(() => { reload(); }, []);

  function handleSave(form) {
    const method = editItem ? "PUT" : "POST";
    const url = editItem
      ? "http://localhost:5000/api/inventory/" + editItem.id
      : "http://localhost:5000/api/inventory";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    }).then(() => {
      setShowForm(false);
      setEditItem(null);
      reload();
    });
  }

  function handleDelete(id) {
    fetch("http://localhost:5000/api/inventory/" + id, {
      method: "DELETE"
    }).then(() => reload());
  }

  const columns = [
    { header: "SKU", accessor: "sku" },
    { header: "Name", accessor: "name" },
    { header: "Stock", accessor: "stock" },
    { header: "Price", accessor: "price" },
    {
      header: "Action",
      cell: (item) => (
        <div className="flex gap-3">
          <button
            onClick={() => {
              setEditItem(item);
              setShowForm(true);
            }}
            className="text-blue-600 hover:underline"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(item.id)}
            className="text-red-600 hover:underline"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Inventory</h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search SKU / Name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="min-w-80 border px-8 py-2 rounded-md shadow-sm w-60 focus:outline-blue-500"
            />
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Add Item
          </button>
        </div>
      </div>

      <Table data={filteredItems} columns={columns} />

      {showForm && (
        <InventoryForm
          initialData={editItem}
          onSubmit={handleSave}
          onClose={() => {
            setShowForm(false);
            setEditItem(null);
          }}
        />
      )}
    </div>
  );
}
