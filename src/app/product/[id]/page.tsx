"use client";

import Link from "next/link";
import { Search, ShoppingCart, ShoppingBag, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { CartPopup } from "@/components/CartPopup";
import { useParams } from "next/navigation";

// Product data - same as homepage
const products = [
  { id: 1, name: "SportsOn Hyperfast Shoes", category: "Running", price: 339000, image: "/product-3.png", description: "Engineered for endurance and designed for speed. Experience gear that moves as fast as you do. Premium fabrics. Unmatched comfort. Limitless motion. Perfect for your daily running activities." },
  { id: 2, name: "SportsOn Rockets Tennis", category: "Tennis", price: 918000, image: "/product-2.png", description: "Professional tennis racket designed for power and precision. Advanced carbon fiber construction provides exceptional control and durability on the court." },
  { id: 3, name: "SportsOn Slowlvin", category: "Running", price: 99000, image: "/product-1.png", description: "Comfortable everyday running shoes with superior cushioning. Perfect for casual runners and daily training sessions." },
  { id: 4, name: "SportsOn Hypersoccer V2", category: "Football", price: 458000, image: "/product-4.png", description: "The SportsOn HyperSoccer V2 is engineered for unmatched precision, power, and unrivaled speed on the field. The toned black and white design with deep crimson accents doesn't just perform—they make a statement. Experience the future of football footwear with V2's enhanced fit and cutting-edge traction." },
  { id: 5, name: "SportsOn Hypersoccer v3", category: "Football", price: 486000, image: "/product-4.png", description: "Latest version of our popular football boots with improved traction and comfort. Designed for professional players who demand the best." },
  { id: 6, name: "SportsOn Slowlivin", category: "Running", price: 118000, image: "/product-5.png", description: "Lifestyle running shoes that blend comfort with style. Perfect for everyday wear and light jogging." },
  { id: 7, name: "SportsOn Hyperfast Shoes", category: "Running", price: 229000, image: "/product-3.png", description: "Lightweight running shoes designed for speed. Advanced cushioning technology provides maximum comfort during long runs." },
  { id: 8, name: "SportsOn Rockets Tennis", category: "Tennis", price: 999000, image: "/product-2.png", description: "Premium tennis racket with advanced technology for professional players. Exceptional power and control in every shot." },
];

export default function ProductDetailPage() {
  const params = useParams();
  const productId = parseInt(params.id as string);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, openCart, getTotalItems } = useCart();

  // Find product by ID
  const product = products.find(p => p.id === productId) || products[0];

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity: quantity,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <CartPopup />
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 bg-dark rounded-lg flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 512 512" fill="none">
                  <path d="M256 32L128 96V224C128 320 256 416 256 416C256 416 384 320 384 224V96L256 32Z" fill="white" />
                  <path d="M256 64L160 112V208C160 272 256 352 256 352C256 352 352 272 352 208V112L256 64Z" fill="#FF5F3F" />
                </svg>
              </div>
              <span className="text-base font-bold text-dark tracking-tight">
                SPORT<span style={{ color: '#FF5F3F' }}>ON</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-12">
              <Link href="/" className="text-sm font-medium text-gray-400 hover:text-dark transition-colors">
                Home
              </Link>
              <Link href="/#categories" className="text-sm font-medium text-gray-400 hover:text-dark transition-colors">
                Category
              </Link>
              <Link href="/#products" className="text-sm font-medium text-dark border-b-2 border-dark pb-0.5">
                Explore Products
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Search size={18} className="text-dark" />
              </button>
              <button 
                onClick={openCart}
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ShoppingBag size={18} className="text-dark" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 text-white text-[9px] font-bold rounded-full flex items-center justify-center" style={{ backgroundColor: '#FF5F3F' }}>
                    {getTotalItems()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Product Detail */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Product Image */}
            <div className="bg-[#F5F5F5] rounded-3xl p-16 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-full max-w-lg h-auto object-contain"
              />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4" style={{ backgroundColor: '#FFE5E0', color: '#FF5F3F' }}>
                  {product.category}
                </span>
                <h1 className="text-5xl font-black text-black mb-6 leading-tight">
                  {product.name}
                </h1>
              </div>

              <p className="text-gray-600 leading-relaxed text-base">
                {product.description}
              </p>

              <div className="pt-4">
                <span className="text-5xl font-bold" style={{ color: '#FF5F3F' }}>
                  Rp. {product.price.toLocaleString("id-ID")}
                </span>
              </div>

              {/* Quantity and Actions */}
              <div className="flex items-center gap-4 pt-6">
                <div className="flex items-center border-2 border-gray-200 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors text-xl"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 h-12 text-center font-bold text-lg border-x-2 border-gray-200 focus:outline-none"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors text-xl"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 h-12 rounded-lg font-bold text-white transition-all hover:opacity-90 flex items-center justify-center gap-2"
                  style={{ backgroundColor: '#FF5F3F' }}
                >
                  <ShoppingBag size={18} />
                  Add to Cart
                </button>

                <Link
                  href="/checkout"
                  className="h-12 px-6 rounded-lg font-bold text-white transition-all hover:opacity-90 flex items-center justify-center gap-2 bg-black"
                >
                  Checkout Now
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16" style={{ backgroundColor: '#111111' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Logo & Description */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 512 512" fill="none">
                    <path d="M256 32L128 96V224C128 320 256 416 256 416C256 416 384 320 384 224V96L256 32Z" fill="#111" />
                    <path d="M256 64L160 112V208C160 272 256 352 256 352C256 352 352 272 352 208V112L256 64Z" fill="#FF5F3F" />
                  </svg>
                </div>
                <span className="text-base font-bold text-white tracking-tight">SPORT<span style={{ color: '#FF5F3F' }}>ON</span></span>
              </div>
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
