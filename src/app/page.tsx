"use client";

import Link from "next/link";
import { Search, ShoppingBag, Plus, Play } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CartPopup } from "@/components/CartPopup";

// Product data - matched to actual product images
const products = [
  { id: 1, name: "SportsOn Hyperfast Shoes", category: "Running", price: 339000, image: "/product-3.png" },
  { id: 2, name: "SportsOn Rockets Tennis", category: "Tennis", price: 918000, image: "/product-2.png" },
  { id: 3, name: "SportsOn Slowlvin", category: "Running", price: 99000, image: "/product-1.png" },
  { id: 4, name: "SportsOn Hypersoccer V2", category: "Football", price: 458000, image: "/product-4.png" },
  { id: 5, name: "SportsOn Hypersoccer v3", category: "Football", price: 486000, image: "/product-4.png" },
  { id: 6, name: "SportsOn Slowlivin", category: "Running", price: 118000, image: "/product-5.png" },
  { id: 7, name: "SportsOn Hyperfast Shoes", category: "Running", price: 229000, image: "/product-3.png" },
  { id: 8, name: "SportsOn Rockets Tennis", category: "Tennis", price: 999000, image: "/product-2.png" },
];

// Format currency
const formatPrice = (price: number) => {
  return `Rp. ${price.toLocaleString("id-ID")}`;
};

export default function LandingPage() {
  const { addToCart, openCart, getTotalItems } = useCart();

  const handleAddToCart = (e: React.MouseEvent, product: typeof products[0]) => {
    e.preventDefault();
    addToCart({
      ...product,
      quantity: 1,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <CartPopup />
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 bg-dark rounded-lg flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 512 512" fill="none">
                  <path d="M256 32L128 96V224C128 320 256 416 256 416C256 416 384 320 384 224V96L256 32Z" fill="white" />
                  <path d="M256 64L160 112V208C160 272 256 352 256 352C256 352 352 272 352 208V112L256 64Z" fill="#FF5F3F" />
                </svg>
              </div>
              <span className="text-base font-bold text-dark tracking-tight">SPORT<span style={{ color: '#FF5F3F' }}>ON</span></span>
            </Link>

            {/* Nav Links - Center */}
            <div className="hidden md:flex items-center gap-12">
              <Link href="/" className="text-sm font-medium text-dark border-b-2 border-dark pb-0.5">
                Home
              </Link>
              <Link href="#categories" className="text-sm font-medium text-gray-400 hover:text-dark transition-colors">
                Category
              </Link>
              <Link href="#products" className="text-sm font-medium text-gray-400 hover:text-dark transition-colors">
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
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#F5F5F5] py-16 lg:py-20">
        {/* Basketball image watermark on left */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 w-[350px] h-[350px] opacity-[0.08]">
          <img
            src="/product-6.png"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>

        {/* Orange ornament on right - cut off */}
        <div className="absolute -right-48 top-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-90 pointer-events-none">
          <img
            src="/img-ornament-hero.svg"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex items-center">
            {/* Left - Text Content */}
            <div className="space-y-5 flex-shrink-0 w-full lg:w-[48%]">
              <p className="text-sm italic" style={{ color: '#FF5F3F' }}>
                Friday Sale, 50%
              </p>

              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black italic leading-[1.1]">
                <div className="text-black">WEAR YOUR</div>
                <div className="text-black">TOP-QUALITY</div>
                <div className="text-gray-400">SPORTSWEAR</div>
              </h1>

              <p className="text-gray-600 text-sm leading-relaxed max-w-md pt-2">
                Engineered for endurance and designed for speed. Experience gear
                that moves as fast as you do. Premium fabrics. Unmatched comfort.
                Limitless motion.
              </p>

              <div className="flex items-center gap-6 pt-4">
                <Link
                  href="#products"
                  className="inline-flex items-center gap-2 text-white px-7 py-3 rounded font-semibold text-sm"
                  style={{ backgroundColor: '#FF5F3F' }}
                >
                  Explore More
                  <span>&gt;&gt;</span>
                </Link>
                <button className="inline-flex items-center gap-2 text-black font-medium text-sm">
                  Watch Video
                  <Play size={16} fill="black" />
                </button>
              </div>
            </div>

            {/* Right - Product Images */}
            <div className="hidden lg:block relative flex-1 h-[550px] -ml-20">
              {/* Tennis Racket - center right */}
              <div className="absolute left-0 top-[45%] -translate-y-1/2 w-[450px] xl:w-[520px] z-20">
                <img
                  src="/product-2.png"
                  alt="Tennis Racket"
                  className="w-full h-auto object-contain"
                  style={{ 
                    filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))',
                    transform: 'rotate(-10deg)'
                  }}
                />
              </div>

              {/* Running Shoes - bottom right, overlapping racket */}
              <div className="absolute bottom-6 right-0 w-[350px] xl:w-[400px] z-30">
                <img
                  src="/product-3.png"
                  alt="Running Shoes"
                  className="w-full h-auto object-contain"
                  style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.2))' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-black">Browse By Categories</h2>
            <Link href="#" className="text-sm font-medium flex items-center gap-1" style={{ color: '#FF5F3F' }}>
              See All Categories
              <span>+</span>
            </Link>
          </div>

          {/* Category Cards */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {/* Running */}
            <button className="flex flex-col items-center gap-2 p-5 bg-[#F5F5F5] rounded-xl hover:shadow-sm transition-all">
              <div className="w-14 h-14 flex items-center justify-center">
                <img src="/icon/category-running.png" alt="Running" className="w-full h-full object-contain" />
              </div>
              <span className="text-xs font-semibold" style={{ color: '#FF5F3F' }}>Running</span>
            </button>

            {/* Tennis */}
            <button className="flex flex-col items-center gap-2 p-5 bg-[#F5F5F5] rounded-xl hover:shadow-sm transition-all">
              <div className="w-14 h-14 flex items-center justify-center">
                <img src="/icon/category-Tennis.png" alt="Tennis" className="w-full h-full object-contain" />
              </div>
              <span className="text-xs font-semibold" style={{ color: '#FF5F3F' }}>Tennis</span>
            </button>

            {/* Basketball */}
            <button className="flex flex-col items-center gap-2 p-5 bg-[#F5F5F5] rounded-xl hover:shadow-sm transition-all">
              <div className="w-14 h-14 flex items-center justify-center">
                <img src="/icon/category-basketball.png" alt="Basketball" className="w-full h-full object-contain" />
              </div>
              <span className="text-xs font-semibold" style={{ color: '#FF5F3F' }}>Basketball</span>
            </button>

            {/* Football */}
            <button className="flex flex-col items-center gap-2 p-5 bg-[#F5F5F5] rounded-xl hover:shadow-sm transition-all">
              <div className="w-14 h-14 flex items-center justify-center">
                <img src="/icon/category-football.png" alt="Football" className="w-full h-full object-contain" />
              </div>
              <span className="text-xs font-semibold" style={{ color: '#FF5F3F' }}>Football</span>
            </button>

            {/* Badminton */}
            <button className="flex flex-col items-center gap-2 p-5 bg-[#F5F5F5] rounded-xl hover:shadow-sm transition-all">
              <div className="w-14 h-14 flex items-center justify-center">
                <img src="/icon/category-badminton.png" alt="Badminton" className="w-full h-full object-contain" />
              </div>
              <span className="text-xs font-semibold" style={{ color: '#FF5F3F' }}>Badminton</span>
            </button>

            {/* Swimming */}
            <button className="flex flex-col items-center gap-2 p-5 bg-[#F5F5F5] rounded-xl hover:shadow-sm transition-all">
              <div className="w-14 h-14 flex items-center justify-center">
                <img src="/icon/category-swimming.png" alt="Swimming" className="w-full h-full object-contain" />
              </div>
              <span className="text-xs font-semibold" style={{ color: '#FF5F3F' }}>Swimming</span>
            </button>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold">
              <span style={{ color: '#FF5F3F' }}>OUR</span>
              <span className="text-dark"> PRODUCTS</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="group"
              >
                {/* Product Image */}
                <div className="relative aspect-square bg-gray-50 rounded-2xl p-4 overflow-hidden mb-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Add to cart button - top right */}
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    className="absolute top-3 right-3 w-7 h-7 text-white rounded-lg flex items-center justify-center shadow-md hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: '#FF5F3F' }}
                  >
                    <Plus size={16} strokeWidth={2.5} />
                  </button>
                </div>

                {/* Product Info */}
                <div className="space-y-0.5">
                  <h3 className="font-semibold text-dark text-sm line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-[11px] text-gray-400">
                    {product.category}
                  </p>
                  <p className="font-bold text-sm" style={{ color: '#FF5F3F' }}>
                    {formatPrice(product.price)}
                  </p>
                </div>
              </Link>
            ))}
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
                <li><Link href="#categories" className="text-gray-400 text-sm hover:text-white transition-colors">Categories</Link></li>
                <li><Link href="#products" className="text-gray-400 text-sm hover:text-white transition-colors">Explore Products</Link></li>
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
