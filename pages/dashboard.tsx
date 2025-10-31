// pages/admin.tsx
import { useState, useEffect } from "react";
import { Product } from "../lib/types";

export default function Admin() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const res = await fetch("/api/products");
      const data: Product[] = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  }

  // Compute statistics
  const totalProducts = products.length;
  const lowStock = products.filter(p => (p.inventory ?? 0) <= 5).length;

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-50">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-10 text-center drop-shadow-lg">
        Admin Dashboard
      </h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white/70 backdrop-blur-md shadow-xl rounded-2xl p-6 flex flex-col items-center justify-center hover:shadow-2xl transition-all">
          <h2 className="text-gray-700 font-semibold text-lg mb-2">Total Products</h2>
          <p className="text-3xl font-bold text-purple-700">{totalProducts}</p>
        </div>
        <div className="bg-white/70 backdrop-blur-md shadow-xl rounded-2xl p-6 flex flex-col items-center justify-center hover:shadow-2xl transition-all">
          <h2 className="text-gray-700 font-semibold text-lg mb-2">Low Stock</h2>
          <p className="text-3xl font-bold text-red-500">{lowStock}</p>
        </div>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto">
        <div className="bg-white/70 backdrop-blur-md shadow-xl rounded-2xl p-6 transition-all hover:shadow-2xl">
          <table className="min-w-full text-left divide-y divide-gray-200">
            <thead className="bg-purple-100 text-purple-800 uppercase text-sm font-semibold">
              <tr>
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Slug</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Inventory</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-purple-50 transition-all">
                  <td className="py-3 px-4 font-medium text-gray-700">{p.id}</td>
                  <td className="py-3 px-4">{p.name}</td>
                  <td className="py-3 px-4">{p.slug}</td>
                  <td className="py-3 px-4 font-semibold text-purple-700">₹{p.price}</td>
                  <td className={`py-3 px-4 font-semibold ${p.inventory !== undefined && p.inventory <= 5 ? "text-red-500" : "text-gray-700"}`}>
                    {p.inventory ?? 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
