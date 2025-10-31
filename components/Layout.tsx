// components/Layout.tsx
import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { items } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="font-sans min-h-screen flex flex-col">
      {/* Header / Navbar */}
      <header className="bg-gray-900 text-white px-4 py-2 flex items-center justify-between shadow-md">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold cursor-pointer hover:text-yellow-400">
              MyShop
            </h1>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex-1 mx-4 hidden md:flex">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full rounded-md px-4 py-2 text-black focus:outline-none"
          />
        </div>

        {/* Right side: Cart & User */}
        <div className="flex items-center space-x-4">
          <Link href="/cart" className="relative flex items-center">
            <span className="text-xl cursor-pointer">🛒</span>
            {isMounted && items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                {items.length}
              </span>
            )}
          </Link>

          <Link href="/login" className="hover:text-yellow-400">
            Sign In
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-4 mt-auto">
        <p>© {new Date().getFullYear()} MyShop. All rights reserved.</p>
      </footer>
    </div>
  );
}
