// pages/cart.tsx
import Link from "next/link";
import { useRouter } from "next/router";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const router = useRouter();
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();

  const handleCheckout = () => {
    if (items.length > 0) {
      router.push("/checkout");
    }
  };

  if (!items || items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
        <p className="text-gray-600 mb-6">Your cart is empty.</p>
        <Link href="/" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
            <tr>
              <th className="py-3 px-4 text-left">Product</th>
              <th className="py-3 px-4 text-center">Price</th>
              <th className="py-3 px-4 text-center">Qty</th>
              <th className="py-3 px-4 text-center">Subtotal</th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((p) => {
              const qty = p.quantity ?? 1;
              return (
                <tr key={p.slug} className="border-t">
                  <td className="py-3 px-4">
                    <Link href={`/products/${p.slug}`} className="font-medium hover:underline">
                      {p.name}
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-center">₹{p.price}</td>
                  <td className="py-3 px-4 text-center">
                    <input
                      type="number"
                      min={1}
                      value={qty}
                      onChange={(e) =>
                        updateQuantity(p.slug, Math.max(1, Number(e.target.value)))
                      }
                      className="w-16 text-center border rounded px-1 py-0.5"
                    />
                  </td>
                  <td className="py-3 px-4 text-center font-semibold">₹{(p.price * qty).toFixed(2)}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => removeFromCart(p.slug)}
                      className="text-red-500 hover:text-red-700 font-semibold"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mt-6 space-y-4 md:space-y-0">
        <div className="flex space-x-4">
          <button
            onClick={() => clearCart()}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded"
          >
            Clear Cart
          </button>
          <Link
            href="/"
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded"
          >
            Continue Shopping
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-xl font-bold">Total: ₹{getTotalPrice().toFixed(2)}</span>
          <button
            onClick={handleCheckout}
            disabled={items.length === 0}
            className={`${
              items.length === 0 ? "bg-green-300 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            } text-white font-semibold py-2 px-4 rounded transition`}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
