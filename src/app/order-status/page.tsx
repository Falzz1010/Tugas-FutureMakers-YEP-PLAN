"use client";

import Link from "next/link";
import { Search, ShoppingBag, RefreshCw } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function OrderStatusPage() {
  const { getTotalItems } = useCart();

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-white">
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

      {/* Order Status Content */}
      <section className="py-20 bg-gray-50 min-h-[calc(100vh-200px)] flex items-center">
        <div className="max-w-2xl mx-auto px-6 lg:px-8 w-full">
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm">
            {/* Success Icon */}
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-blue-600">
                <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            <h1 className="text-4xl font-black text-black mb-4">Order Submitted !!</h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
              Your Order is recorded in our system, we are still confirming the payment status, please wait and your order status will be updated in less than 12 hours.
            </p>

            <button
              onClick={handleRefresh}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-black text-white rounded-xl font-bold hover:opacity-90 transition-all"
            >
              <RefreshCw size={18} />
              Refresh Order Status
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <Link href="/" className="inline-block">
                <img src="/Frame 4.png" alt="SportOn Logo" className="h-8" />
              </Link>
              <p className="text-gray-500 text-xs leading-relaxed max-w-[200px]">
                Engineered for endurance and designed for speed. Experience gear that moves as fast as you do.
              </p>
            </div>

            <div className="space-y-4">
              <ul className="space-y-3">
                <li><Link href="/" className="text-gray-400 text-sm hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/#categories" className="text-gray-400 text-sm hover:text-white transition-colors">Categories</Link></li>
                <li><Link href="/#products" className="text-gray-400 text-sm hover:text-white transition-colors">Explore Products</Link></li>
                <li><Link href="#" className="text-gray-400 text-sm hover:text-white transition-colors">About Us</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <ul className="space-y-3">
                <li><Link href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Instagram</Link></li>
                <li><Link href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Facebook</Link></li>
                <li><Link href="#" className="text-gray-400 text-sm hover:text-white transition-colors">TikTok</Link></li>
                <li><Link href="#" className="text-gray-400 text-sm hover:text-white transition-colors">YouTube</Link></li>
              </ul>
            </div>

            <div></div>
          </div>

          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-xs">SportOn © 2025 All Rights Reserved.</p>
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
