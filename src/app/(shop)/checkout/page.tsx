"use client";

import Link from "next/link";
import { CreditCard, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CartPopup } from "@/components/CartPopup";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, removeFromCart, getTotalPrice } = useCart();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: ""
  });

  const formatPrice = (price: number) => {
    return `Rp. ${price.toLocaleString("id-ID")}`;
  };

  const handleProceedToPayment = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.phone || !formData.address) {
      alert('Please fill in all fields');
      return;
    }

    localStorage.setItem('checkoutData', JSON.stringify(formData));
    router.push('/payment');
  };

  return (
    <div className="min-h-screen bg-white">
      <CartPopup />
      <Navbar />

      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h1 className="text-4xl font-black text-black mb-12 text-center">Checkout Now</h1>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8">
              <h2 className="text-xl font-bold text-black mb-6">Order Information</h2>
              <div className="space-y-5">
                <div>
                  <label className="text-sm font-semibold text-black block mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                    placeholder="Type your full name"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-black block mb-2">Whatsapp Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                    placeholder="+62xxxxx"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-black block mb-2">Shipping Address</label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                    rows={4}
                    placeholder="Example Street, 16, West Jakarta, Indonesia, 65521"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8">
              <h2 className="text-xl font-bold text-black mb-6">Cart Items</h2>
              
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">Your cart is empty</p>
                  <Link href="/#products" className="text-sm mt-4 inline-block" style={{ color: '#FF5F3F' }}>
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-8">
                    {cart.map((item) => (
                      <div key={`${item.id}-${item.size}`} className="flex gap-4 items-start">
                        <div className="w-16 h-16 bg-gray-50 rounded-lg p-2 flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm text-black mb-1">
                            {item.name}
                          </h3>
                          <p className="text-xs text-gray-600 mb-1">
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

                  <div className="border-t border-gray-200 pt-6 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-black">Total</span>
                      <span className="text-2xl font-bold" style={{ color: '#FF5F3F' }}>
                        {formatPrice(getTotalPrice())}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleProceedToPayment}
                    className="flex items-center justify-center gap-2 w-full py-4 rounded-lg font-bold text-white transition-all hover:opacity-90 bg-black"
                  >
                    <CreditCard size={18} />
                    Proceed to Payment
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
