"use client";

import { CreditCard, Upload, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useOrder } from "@/context/OrderContext";
import { useStore } from "@/hooks/useStore";
import { CartPopup } from "@/components/CartPopup";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const router = useRouter();
  const { cart, getTotalPrice, clearCart } = useCart();
  const { setCurrentOrderId } = useOrder();
  const { bankAccounts, isLoading, addTransaction } = useStore();
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [checkoutData, setCheckoutData] = useState<any>(null);

  const formatPrice = (price: number) => {
    return `Rp. ${price.toLocaleString("id-ID")}`;
  };

  useEffect(() => {
    const savedCheckoutData = localStorage.getItem('checkoutData');
    if (savedCheckoutData) {
      setCheckoutData(JSON.parse(savedCheckoutData));
    }
  }, []);

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
    if (!uploadedFile || !selectedBank) {
      alert('Please upload payment receipt and select a bank');
      return;
    }

    if (!checkoutData) {
      alert('Checkout data not found. Please go back to checkout.');
      return;
    }

    const transactionId = crypto.randomUUID();
    const transaction = {
      id: transactionId,
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

    addTransaction(transaction);
    setCurrentOrderId(transactionId);
    clearCart();
    localStorage.removeItem('checkoutData');
    router.push('/order-status');
  };

  return (
    <div className="min-h-screen bg-white">
      <CartPopup />
      <Navbar />

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

      <Footer />
    </div>
  );
}
