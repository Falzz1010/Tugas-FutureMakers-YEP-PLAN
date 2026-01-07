import Link from "next/link";

export function Footer() {
  return (
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
  );
}
