// pages/checkout.tsx
import { useCart } from "../context/CartContext";
import Link from "next/link";

export default function Checkout() {
  const { items, getTotalPrice } = useCart();

  if (!items || items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Checkout</h1>
        <p className="text-gray-600 mb-6">Your cart is empty.</p>
        <Link
          href="/"
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Checkout</h1>

      {/* Order Summary */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
        <div className="divide-y divide-gray-200">
          {items.map((item) => (
            <div key={item.slug} className="flex justify-between py-4">
              <div className="flex items-center space-x-4">
                <img
                  src={item.image ?? `/images/${item.slug}.jpg`}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <span className="font-medium">{item.name}</span>
              </div>
              <div className="text-right">
                <span className="text-gray-700">
                  ₹{(item.price * (item.quantity ?? 1)).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-6 text-xl font-bold">
          <span>Total:</span>
          <span>₹{getTotalPrice().toFixed(2)}</span>
        </div>
      </div>

      {/* Payment Placeholder */}
      <div className="bg-white shadow-lg rounded-xl p-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">Payment</h2>
        <p className="text-gray-600 mb-6">
          Payment gateway integration will be added here soon.
        </p>
        <button
          disabled
          className="bg-green-500 text-white font-semibold py-2 px-6 rounded cursor-not-allowed"
        >
          Pay Now
        </button>
      </div>

      <div className="text-center mt-6">
        <Link
          href="/cart"
          className="text-blue-600 hover:underline font-medium"
        >
          ← Back to Cart
        </Link>
      </div>
    </div>
  );
}
