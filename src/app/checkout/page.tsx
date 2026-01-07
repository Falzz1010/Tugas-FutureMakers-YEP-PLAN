"use client";

import Link from "next/link";
import { Search, ShoppingBag, CreditCard, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CartPopup } from "@/components/CartPopup";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, removeFromCart, getTotalItems, getTotalPrice } = useCart();
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

    // Save checkout data to localStorage
    localStorage.setItem('checkoutData', JSON.stringify(formData));
    
    // Navigate to payment page
    router.push('/payment');
  };

  return (
    <div className="min-h-screen bg-white">
      <CartPopup />
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <img src="/Frame 5.png" alt="SportOn Logo" className="h-8" />
            </Link>

            <div className="hidden md:flex items-center gap-12">
              <Link href="/" className="text-sm font-medium text-gray-400 hover:text-dark transition-colors">
                Home
              </Link>
              <Link href="/#categories" className="text-sm font-medium text-gray-400 hover:text-dark transition-colors">
                Category
              </Link>
              <Link href="/#products" className="text-sm font-medium text-gray-400 hover:text-dark transition-colors">
                Explore Products
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Search size={18} className="text-dark" />
              </button>
              <Link href="/" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ShoppingBag size={18} className="text-dark" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Checkout Content */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h1 className="text-4xl font-black text-black mb-12 text-center">Checkout Now</h1>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left - Order Information Form */}
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

            {/* Right - Cart Items */}
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

                  {/* Total */}
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

      {/* Footer */}
      <footer className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Logo & Description */}
            <div className="space-y-4">
              <Link href="/" className="inline-block">
                <img src="/Frame 4.png" alt="SportOn Logo" className="h-8" />
              </Link>
              <p className="text-gray-500 text-xs leading-relaxed max-w-[200px]">
                Engineered for endurance and designed for speed.
                Experience gear that moves as fast as you do.
              </p>
            </div>

            {/* Navigation Links */}
            <div className="space-y-4">
              <ul className="space-y-3">
                <li><Link href="/" className="text-gray-400 text-sm hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/#categories" className="text-gray-400 text-sm hover:text-white transition-colors">Categories</Link></li>
                <li><Link href="/#products" className="text-gray-400 text-sm hover:text-white transition-colors">Explore Products</Link></li>
                <li><Link href="#" className="text-gray-400 text-sm hover:text-white transition-colors">About Us</Link></li>
              </ul>
            </div>

            {/* Social */}
            <div className="space-y-4">
              <ul className="space-y-3">
                <li><Link href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Instagram</Link></li>
                <li><Link href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Facebook</Link></li>
                <li><Link href="#" className="text-gray-400 text-sm hover:text-white transition-colors">TikTok</Link></li>
                <li><Link href="#" className="text-gray-400 text-sm hover:text-white transition-colors">YouTube</Link></li>
              </ul>
            </div>

            {/* Empty for spacing */}
            <div></div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-xs">
              SportOn © 2025 All Rights Reserved.
            </p>
            <div className="flex items-center gap-8">
              <Link href="#" className="text-gray-500 text-xs hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="text-xs hover:text-white transition-colors" style={{ color: '#FF5F3F' }}>Terms Conditions</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
