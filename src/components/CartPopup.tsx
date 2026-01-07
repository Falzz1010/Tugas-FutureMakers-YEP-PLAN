"use client";

import { X, ArrowRight, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export function CartPopup() {
  const { cart, isCartOpen, closeCart, removeFromCart, getTotalPrice } = useCart();

  if (!isCartOpen) return null;

  const formatPrice = (price: number) => {
    return `Rp. ${price.toLocaleString("id-ID")}`;
  };

  // Dynamic width based on cart items
  const getMaxWidth = () => {
    if (cart.length === 0) return '384px'; // max-w-sm
    if (cart.length <= 2) return '448px'; // max-w-md
    return '512px'; // max-w-lg
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 transition-opacity"
        onClick={closeCart}
      />

      {/* Cart Dropdown - Floating Card */}
      <div 
        className="fixed right-6 top-20 bg-white z-50 shadow-2xl rounded-2xl flex flex-col transition-all duration-300 border border-gray-100"
        style={{ maxWidth: getMaxWidth(), maxHeight: '600px' }}
      >
        {/* Header */}
        <div className="flex items-center justify-center p-6 border-b border-gray-200 relative">
          <h2 className="text-xl font-bold text-black">Shopping Cart</h2>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6" style={{ minHeight: '200px' }}>
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
              </div>
              <p className="text-gray-500 font-semibold text-sm mb-1">Your cart is empty</p>
              <p className="text-gray-400 text-xs">Add some products to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex gap-4 items-start bg-gray-50 rounded-xl p-4">
                  <div className="w-16 h-16 bg-white rounded-lg p-2 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-black mb-1 line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-600">
                      <span className="font-semibold">{item.quantity}x</span>{" "}
                      <span style={{ color: '#FF5F3F' }} className="font-bold">{formatPrice(item.price)}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-gray-200 p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-black">Total</span>
              <span className="text-2xl font-bold" style={{ color: '#FF5F3F' }}>
                {formatPrice(getTotalPrice())}
              </span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-lg font-bold text-white text-base transition-all hover:opacity-90 bg-black"
            >
              Checkout Now
              <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
