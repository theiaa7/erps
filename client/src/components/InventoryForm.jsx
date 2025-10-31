import { useState, useEffect } from "react";

export default function InventoryForm({ initialData, onSubmit, onClose }) {
    const [form, setForm] = useState({
        sku: "",
        name: "",
        stock: 0,
        price: 0,
    });

    useEffect(() => {
        if (initialData) setForm(initialData);
    }, [initialData]);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(form);
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">
                    {initialData ? "Edit Item" : "Add Item"}
                </h3>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input name="sku" value={form.sku} onChange={handleChange} placeholder="SKU" className="border p-2 rounded" />
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border p-2 rounded" />
                    <input type="number" name="stock" value={form.stock} onChange={handleChange} placeholder="Stock" className="border p-2 rounded" />
                    <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price" className="border p-2 rounded" />

                    <div className="flex justify-end gap-2 pt-3">
                        <button type="button" onClick={onClose} className="px-3 py-2 bg-gray-300 rounded">
                            Cancel
                        </button>
                        <button type="submit" className="px-3 py-2 bg-blue-600 text-white rounded">
                            {initialData ? "Update" : "Add"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
