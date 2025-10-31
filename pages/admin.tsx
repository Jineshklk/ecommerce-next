// pages/admin.tsx
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { Product } from "../lib/types";

interface FormData {
  name: string;
  slug: string;
  price: number;
  inventory?: number;
}

export default function Admin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<FormData>({ name: "", slug: "", price: 0, inventory: 0 });
  const [loading, setLoading] = useState(false);

  // Fetch products from API
  async function fetchProducts() {
    try {
      const res = await fetch("/api/products");
      const data: Product[] = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle form submission
  async function handleAdd(e: FormEvent) {
    e.preventDefault();
    if (!form.name || !form.slug || form.price <= 0) return;

    setLoading(true);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": "secret",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to add/update product");

      setForm({ name: "", slug: "", price: 0, inventory: 0 });
      await fetchProducts();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === "price" || name === "inventory" ? Number(value) : value,
    }));
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Admin Dashboard</h1>

        {/* Add / Update Product Form */}
        <form
          onSubmit={handleAdd}
          className="bg-white shadow-xl rounded-2xl p-8 mb-12 transition-transform transform hover:scale-105"
        >
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Add / Update Product</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <input
              name="name"
              placeholder="Product Name"
              value={form.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
            <input
              name="slug"
              placeholder="Slug (unique)"
              value={form.slug}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
            <input
              name="price"
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              // Add a custom class for styling
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition hide-number-arrows" 
            />
            <input
              name="inventory"
              type="number"
              placeholder="Inventory"
              value={form.inventory ?? 0}
              onChange={handleChange}
              // Also add the custom class here
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition hide-number-arrows"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all"
          >
            {loading ? "Saving..." : "Add / Update Product"}
          </button>
        </form>

        {/* Product List */}
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Current Products</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse shadow-lg rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-indigo-100 text-gray-700 uppercase text-sm">
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Slug</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Inventory</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, idx) => (
                <tr
                  key={p.id}
                  className={`transition-all hover:bg-indigo-50 cursor-pointer ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-4 text-gray-600">{p.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-800">{p.name}</td>
                  <td className="px-6 py-4 text-gray-600">{p.slug}</td>
                  <td className="px-6 py-4 text-gray-800">₹{p.price}</td>
                  <td className="px-6 py-4 text-gray-600">{p.inventory ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Add this CSS to your global stylesheet (e.g., globals.css)
// styles/globals.css
/*
  .hide-number-arrows::-webkit-outer-spin-button,
  .hide-number-arrows::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .hide-number-arrows[type="number"] {
    -moz-appearance: textfield;
  }
*/