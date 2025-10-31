// pages/index.tsx
import { GetStaticProps } from "next";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { getAllProducts } from "../lib/products";
import type { Product } from "../lib/types";

export const getStaticProps: GetStaticProps = async () => {
  const products = getAllProducts();
  return { props: { products } };
};

interface Props {
  products: Product[];
}

export default function HomePage({ products }: Props) {
  const { addToCart } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        🛍️ Products
      </h1>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4 mb-8">
        <Link href="/recommendations">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition">
            Recommendations
          </button>
        </Link>
        <Link href="/admin">
          <button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded transition">
            Admin
          </button>
        </Link>
        <Link href="/dashboard">
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition">
            Dashboard
          </button>
        </Link>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => {
          const imageSrc = p.image ?? `/images/${p.slug}.jpg`; // fallback image
          return (
            <div
              key={p.slug}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Product Image */}
              <img
                src={imageSrc}
                alt={p.name}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{p.name}</h3>
                <p className="text-gray-600 mt-2">₹{p.price}</p>

                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={() => addToCart(p)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-1 px-3 rounded transition-colors"
                  >
                    Add to Cart
                  </button>
                  <Link href={`/products/${p.slug}`}>
                    <button className="border border-gray-300 text-gray-700 hover:bg-gray-100 py-1 px-3 rounded transition-colors">
                      View
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
