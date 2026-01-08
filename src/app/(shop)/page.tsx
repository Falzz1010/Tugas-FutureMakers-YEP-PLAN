"use client";

import Link from "next/link";
import { Plus, Play } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CartPopup } from "@/components/CartPopup";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useSupabaseStore } from "@/hooks/useSupabaseStore";

// Format currency
const formatPrice = (price: number) => {
  return `Rp. ${price.toLocaleString("id-ID")}`;
};

export default function LandingPage() {
  const { addToCart } = useCart();
  const { categories, products: supabaseProducts, isLoading } = useSupabaseStore();

  const getCategoryName = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.name || "Uncategorized";
  };

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    addToCart({
      id: product.id,
      name: product.name,
      category: getCategoryName(product.categoryId),
      price: product.price,
      image: product.image || '/product-1.png',
      quantity: 1,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <CartPopup />
      <Navbar />

      <main>
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
          {isLoading ? (
            <div className="text-center py-8 text-gray-400">Loading categories...</div>
          ) : (
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {categories.map((category) => (
                <button 
                  key={category.id}
                  className="flex flex-col items-center gap-2 p-5 bg-[#F5F5F5] rounded-xl hover:shadow-sm transition-all"
                >
                  <div className="w-14 h-14 flex items-center justify-center">
                    {category.image ? (
                      <img src={category.image} alt={category.name} className="w-full h-full object-contain" />
                    ) : (
                      <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 font-bold">
                        {category.name[0]}
                      </div>
                    )}
                  </div>
                  <span className="text-xs font-semibold" style={{ color: '#FF5F3F' }}>{category.name}</span>
                </button>
              ))}
            </div>
          )}
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

          {isLoading ? (
            <div className="text-center py-8 text-gray-400">Loading products...</div>
          ) : supabaseProducts.length === 0 ? (
            <div className="text-center py-12 text-gray-400">No products available</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {supabaseProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="group"
                >
                  {/* Product Image */}
                  <div className="relative aspect-square bg-gray-50 rounded-2xl p-4 overflow-hidden mb-3">
                    <img
                      src={product.image || '/product-1.png'}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Add to cart button - top right */}
                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      className="absolute top-3 right-3 w-7 h-7 text-white rounded-lg flex items-center justify-center shadow-md hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: '#FF5F3F' }}
                      aria-label={`Add ${product.name} to cart`}
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
                      {getCategoryName(product.categoryId)}
                    </p>
                    <p className="font-bold text-sm" style={{ color: '#FF5F3F' }}>
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
}
