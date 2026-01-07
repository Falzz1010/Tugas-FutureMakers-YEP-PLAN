import Link from "next/link";
import { Search, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function Navbar() {
  const { openCart, getTotalItems } = useCart();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img src="/Frame 5.png" alt="SportOn Logo" className="h-8" />
          </Link>

          {/* Nav Links - Center */}
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
  );
}
