"use client";

import { ShoppingBag, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { CartPopup } from "@/components/CartPopup";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useParams, useRouter } from "next/navigation";
import { useSupabaseStore } from "@/hooks/useSupabaseStore";

export const dynamic = 'force-dynamic';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { products, categories, isLoading } = useSupabaseStore();

  const product = products.find(p => p.id === productId);
  const categoryName = product ? categories.find(c => c.id === product.categoryId)?.name || "Uncategorized" : "";

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      id: product.id,
      name: product.name,
      category: categoryName,
      price: product.price,
      image: product.image || '/product-1.png',
      quantity: quantity,
    });
  };

  const handleCheckoutNow = () => {
    if (!product) return;
    addToCart({
      id: product.id,
      name: product.name,
      category: categoryName,
      price: product.price,
      image: product.image || '/product-1.png',
      quantity: quantity,
    });
    router.push('/checkout');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <p className="text-gray-400 font-bold">Loading product...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-gray-400 font-bold mb-4">Product not found</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-primary text-white rounded-lg font-bold"
          >
            Back to Home
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <CartPopup />
      <Navbar />

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="bg-[#F5F5F5] rounded-3xl p-16 flex items-center justify-center">
              <img
                src={product.image || '/product-1.png'}
                alt={product.name}
                className="w-full max-w-lg h-auto object-contain"
              />
            </div>

            <div className="space-y-6">
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4" style={{ backgroundColor: '#FFE5E0', color: '#FF5F3F' }}>
                  {categoryName}
                </span>
                <h1 className="text-5xl font-black text-black mb-6 leading-tight">
                  {product.name}
                </h1>
              </div>

              <p className="text-gray-600 leading-relaxed text-base">
                {product.description || "No description available."}
              </p>

              <div className="pt-4">
                <span className="text-5xl font-bold" style={{ color: '#FF5F3F' }}>
                  Rp. {product.price.toLocaleString("id-ID")}
                </span>
              </div>

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

                <button
                  onClick={handleCheckoutNow}
                  className="h-12 px-6 rounded-lg font-bold text-white transition-all hover:opacity-90 flex items-center justify-center gap-2 bg-black"
                >
                  Checkout Now
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
