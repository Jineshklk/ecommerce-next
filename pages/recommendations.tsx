"use client";

import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import type { Product } from "../lib/types";

export default function Recommendations() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then((data: Product[]) => setProducts(data.slice(0, 3)))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Recommended Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white/70 backdrop-blur-md shadow-xl rounded-2xl p-4 flex flex-col items-center hover:shadow-2xl transition"
          >
            {/* Product Image */}
            <img
              src={`/images/${p.slug}.jpg`} // assuming images are named by slug
              alt={p.name}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />

            {/* Product Info */}
            <h2 className="text-lg font-semibold text-gray-800">{p.name}</h2>
            <p className="text-purple-700 font-bold mb-4">₹{p.price}</p>

            <button
              onClick={() => addToCart(p)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
