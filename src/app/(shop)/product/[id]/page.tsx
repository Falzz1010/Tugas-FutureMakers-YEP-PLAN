"use client";

import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { CartPopup } from "@/components/CartPopup";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
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
  const { addToCart } = useCart();

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
      <Navbar />

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="bg-[#F5F5F5] rounded-3xl p-16 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-full max-w-lg h-auto object-contain"
              />
            </div>

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

      <Footer />
    </div>
  );
}
