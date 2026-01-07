"use client";

import { RefreshCw, CheckCircle, Clock, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useOrder } from "@/context/OrderContext";
import { useStore } from "@/hooks/useStore";
import { TransactionStatus } from "@/types";

interface StatusConfig {
  title: string;
  message: string;
  color: string;
  bgColor: string;
  icon: React.ReactNode;
}

const statusConfig: Record<TransactionStatus, StatusConfig> = {
  PENDING: {
    title: "Order Submitted",
    message: "We are confirming your payment. Please wait up to 12 hours for verification.",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    icon: <Clock size={48} className="text-blue-600" />,
  },
  PAID: {
    title: "Payment Confirmed",
    message: "Your payment has been received. Order is being processed and will be shipped soon.",
    color: "text-green-600",
    bgColor: "bg-green-100",
    icon: <CheckCircle size={48} className="text-green-600" />,
  },
  REJECTED: {
    title: "Payment Rejected",
    message: "Payment verification failed. Please contact our support team for assistance.",
    color: "text-red-600",
    bgColor: "bg-red-100",
    icon: <XCircle size={48} className="text-red-600" />,
  },
};

export default function OrderStatusPage() {
  const router = useRouter();
  const { currentOrderId } = useOrder();
  const { transactions } = useStore();
  const [status, setStatus] = useState<TransactionStatus>("PENDING");
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    if (currentOrderId) {
      const transaction = transactions.find((t) => t.id === currentOrderId);
      if (transaction) {
        setStatus(transaction.status);
        setOrderDetails(transaction);
      }
    } else {
      const lastTransaction = transactions[transactions.length - 1];
      if (lastTransaction) {
        setStatus(lastTransaction.status);
        setOrderDetails(lastTransaction);
      }
    }
  }, [currentOrderId, transactions]);

  useEffect(() => {
    const interval = setInterval(() => {
      router.refresh();
    }, 30000);

    return () => clearInterval(interval);
  }, [router]);

  const handleRefresh = () => {
    router.refresh();
  };

  const config = statusConfig[status];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="py-20 bg-gray-50 min-h-[calc(100vh-200px)] flex items-center">
        <div className="max-w-2xl mx-auto px-6 lg:px-8 w-full">
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm">
            <div className={`w-24 h-24 ${config.bgColor} rounded-full flex items-center justify-center mx-auto mb-8`}>
              {config.icon}
            </div>

            <h1 className={`text-4xl font-black mb-4 ${config.color}`}>
              {config.title}
            </h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
              {config.message}
            </p>

            {orderDetails && (
              <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left max-w-md mx-auto">
                <h3 className="font-bold text-black mb-4">Order Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-mono text-gray-800">{orderDetails.id.slice(0, 8)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Customer:</span>
                    <span className="text-gray-800">{orderDetails.customer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total:</span>
                    <span className="font-bold text-gray-800">
                      Rp. {orderDetails.total.toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="text-gray-800">
                      {new Date(orderDetails.date).toLocaleDateString("id-ID")}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3">
              <button
                onClick={handleRefresh}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-black text-white rounded-xl font-bold hover:opacity-90 transition-all"
              >
                <RefreshCw size={18} />
                Refresh Order Status
              </button>
              <p className="text-xs text-gray-500">
                Auto-refreshing every 30 seconds
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
