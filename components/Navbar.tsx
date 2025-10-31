// components/Navbar.tsx
import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { items } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <nav className="bg-yellow-500 text-black shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <h1 className="text-xl font-bold cursor-pointer hover:text-yellow-700">
                MyShop
              </h1>
            </Link>
          </div>

          {/* Navigation links */}
          <div className="flex items-center space-x-6">
            <Link href="/" className="hover:text-gray-800 font-medium">
              Home
            </Link>

            <Link href="/cart" className="relative hover:text-gray-800 font-medium flex items-center">
              🛒 Cart
              {isMounted && items.length > 0 && (
                <span className="ml-1 bg-black text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {items.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
