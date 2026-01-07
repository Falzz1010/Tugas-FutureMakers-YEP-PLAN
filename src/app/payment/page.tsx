"use client";

import Link from "next/link";
import { Search, ShoppingBag, CreditCard, Upload, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useStore } from "@/hooks/useStore";
import { CartPopup } from "@/components/CartPopup";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const router = useRouter();
  const { cart, getTotalItems, getTotalPrice, clearCart } = useCart();
  const { bankAccounts, isLoading, addTransaction } = useStore();
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [checkoutData, setCheckoutData] = useState<any>(null);

  const formatPrice = (price: number) => {
    return `Rp. ${price.toLocaleString("id-ID")}`;
  };

  // Load checkout data from localStorage
  useEffect(() => {
    const savedCheckoutData = localStorage.getItem('checkoutData');
    if (savedCheckoutData) {
      setCheckoutData(JSON.parse(savedCheckoutData));
    }
  }, []);

  // Set first bank as default
  useEffect(() => {
    if (selectedBank === null && bankAccounts.length > 0) {
      setSelectedBank(bankAccounts[0].id);
    }
  }, [bankAccounts, selectedBank]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">Loading payment methods...</p>
      </div>
    );
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleConfirmPayment = () => {
    console.log('=== CONFIRM PAYMENT DEBUG ===');
    console.log('uploadedFile:', uploadedFile);
    console.log('selectedBank:', selectedBank);
    console.log('checkoutData:', checkoutData);
    console.log('cart:', cart);
    console.log('getTotalPrice():', getTotalPrice());

    if (!uploadedFile || !selectedBank) {
      alert('Please upload payment receipt and select a bank');
      return;
    }

    if (!checkoutData) {
      alert('Checkout data not found. Please go back to checkout.');
      return;
    }

    // Create transaction from cart and checkout data
    const transaction = {
      date: new Date().toISOString(),
      customer: checkoutData.fullName || 'Customer',
      contact: checkoutData.phone || checkoutData.email || '-',
      address: checkoutData.address || '-',
      total: getTotalPrice(),
      status: 'PENDING' as const,
      items: cart.map(item => ({
        productId: item.id.toString(),
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }))
    };

    console.log('Transaction to save:', transaction);

    // Save transaction to store
    try {
      addTransaction(transaction);
      console.log('Transaction saved successfully');
    } catch (error) {
      console.error('Error saving transaction:', error);
      alert('Error saving transaction: ' + error);
      return;
    }

    // Clear cart and checkout data
    clearCart();
    localStorage.removeItem('checkoutData');

    // Redirect to order status page
    router.push('/order-status');
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

      {/* Payment Content */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h1 className="text-4xl font-black text-black mb-12 text-center">Payment</h1>

          {bankAccounts.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center">
              <p className="text-gray-500 mb-4">No payment methods available</p>
              <p className="text-sm text-gray-400">Please contact admin to add payment methods</p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left - Payment Options */}
              <div className="bg-white rounded-2xl p-8">
                <h2 className="text-xl font-bold text-black mb-6">Payment Options</h2>
                <div className="space-y-3">
                  {bankAccounts.map((bank) => (
                    <button
                      key={bank.id}
                      onClick={() => setSelectedBank(bank.id)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                        selectedBank === bank.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <CreditCard size={24} className="text-blue-600" />
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-black">{bank.bankName}</p>
                          <p className="text-sm text-gray-500">{bank.accountNumber}</p>
                          <p className="text-xs text-gray-400">{bank.accountHolder}</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                        Bank Transfer
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right - Payment Steps */}
              <div className="bg-white rounded-2xl p-8">
                <h2 className="text-xl font-bold text-black mb-6">Payment Steps</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold">
                      1
                    </span>
                    <p className="text-sm text-gray-700">
                      Transfer the total amount of <span className="font-bold" style={{ color: '#FF5F3F' }}>{formatPrice(getTotalPrice())}</span> to your preferred bank account listed under Payment Options.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold">
                      2
                    </span>
                    <p className="text-sm text-gray-700">
                      After completing the transfer, <span className="font-semibold">keep the payment receipt</span> or a screenshot of the transfer confirmation. This will be needed for the next step.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold">
                      3
                    </span>
                    <p className="text-sm text-gray-700">
                      Upload the payment receipt/screenshot using the <span className="font-semibold">'Upload Receipt & Confirm'</span> button below to validate your transaction.
                    </p>
                  </div>
                </div>

                {/* Upload Area */}
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 mb-6 text-center bg-gray-50">
                  <input
                    type="file"
                    id="receipt-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileUpload}
                  />
                  <label htmlFor="receipt-upload" className="cursor-pointer">
                    {uploadedFile ? (
                      <div className="flex flex-col items-center gap-2">
                        <CheckCircle size={48} className="text-green-500" />
                        <p className="text-sm font-semibold text-green-600">{uploadedFile.name}</p>
                        <p className="text-xs text-gray-500">Click to change file</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <Upload size={48} style={{ color: '#FF5F3F' }} />
                        <p className="text-sm font-semibold text-black">Upload Your Payment Receipt here</p>
                        <p className="text-xs text-gray-500">Click to browse files</p>
                      </div>
                    )}
                  </label>
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
                  onClick={handleConfirmPayment}
                  disabled={!uploadedFile}
                  className={`flex items-center justify-center gap-2 w-full py-4 rounded-lg font-bold text-white transition-all ${
                    uploadedFile
                      ? 'bg-black hover:opacity-90'
                      : 'bg-gray-300 cursor-not-allowed'
                  }`}
                >
                  <CheckCircle size={18} />
                  Upload Receipt & Confirm
                </button>
              </div>
            </div>
          )}
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
