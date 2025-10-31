import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { Product } from "../lib/types"; // ✅ keep only this import

interface CartContextType {
  items: Product[];
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>(() => {
    try {
      if (typeof window !== "undefined") {
        const raw = localStorage.getItem("cart");
        return raw ? JSON.parse(raw) : [];
      }
      return [];
    } catch {
      return [];
    }
  });

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(items));
    } catch {}
  }, [items]);

  function addToCart(product: Product, qty: number = 1) {
    setItems((prev) => {
      const idx = prev.findIndex((p) => p.slug === product.slug);
      if (idx !== -1) {
        const updated = [...prev];
        updated[idx].quantity = (updated[idx].quantity || 0) + qty;
        return updated;
      }
      return [...prev, { ...product, quantity: qty }];
    });
  }

  function removeFromCart(slug: string) {
    setItems((prev) => prev.filter((p) => p.slug !== slug));
  }

  function updateQuantity(slug: string, quantity: number) {
    setItems((prev) =>
      prev.map((p) => (p.slug === slug ? { ...p, quantity } : p))
    );
  }

  function clearCart() {
    setItems([]);
  }

  function getTotalItems() {
    return items.reduce((sum, p) => sum + (p.quantity || 0), 0);
  }

  function getTotalPrice() {
    return items.reduce(
      (sum, p) => sum + (p.price || 0) * (p.quantity || 0),
      0
    );
  }

  const value: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
