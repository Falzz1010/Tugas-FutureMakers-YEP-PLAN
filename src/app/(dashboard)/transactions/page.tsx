"use client";

import { useState } from "react";
import { useSupabaseStore } from "@/hooks/useSupabaseStore";
import { Modal } from "@/components/Modal";
import { Button, Card } from "@/components/ui/shared";
import { Eye, Check, X, FileText, BadgeCheck, Landmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { Transaction } from "@/types";
import { formatCurrency } from "@/lib/format";

export const dynamic = 'force-dynamic';

export default function TransactionsPage() {
    const { transactions, isLoading, updateTransactionStatus } = useSupabaseStore();
    const [selectedTrx, setSelectedTrx] = useState<Transaction | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    console.log('📊 Transactions page - Total transactions:', transactions.length);
    console.log('📊 Transactions data:', transactions);

    const handleOpenDetail = (trx: Transaction) => {
        setSelectedTrx(trx);
        setIsModalOpen(true);
    };

    const handleAction = (status: Transaction['status']) => {
        if (selectedTrx) {
            updateTransactionStatus(selectedTrx.id, status);
            setIsModalOpen(false);
        }
    };

    if (isLoading) return <div className="p-8 text-gray-400 font-bold uppercase tracking-[0.4em] text-[10px] animate-pulse">Loading transactions...</div>;

    return (
        <div className="max-w-[1400px] mx-auto space-y-10 pb-12">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Transactions</h1>
                    <p className="text-gray-500 font-medium">Monitor and manage your transactions.</p>
                </div>
            </header>

            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-[#FAFBFD] border-b border-gray-100">
                            <tr>
                                <th className="px-8 py-6 text-[13px] font-bold text-gray-900">Date</th>
                                <th className="px-8 py-6 text-[13px] font-bold text-gray-900">Customer</th>
                                <th className="px-8 py-6 text-[13px] font-bold text-gray-900">Contact</th>
                                <th className="px-8 py-6 text-[13px] font-bold text-gray-900">Total</th>
                                <th className="px-8 py-6 text-[13px] font-bold text-gray-900">Status</th>
                                <th className="px-8 py-6 text-[13px] font-bold text-gray-900 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {transactions.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-8 py-24 text-center text-gray-300 font-black italic uppercase tracking-widest">No active settlements in record</td>
                                </tr>
                            ) : transactions.map((trx) => (
                                <tr key={trx.id} className="hover:bg-gray-50/50 transition-all duration-300 group">
                                    <td className="px-8 py-7 font-medium text-gray-900 text-sm">
                                        {trx.date}
                                    </td>
                                    <td className="px-8 py-7 font-medium text-gray-900 text-sm">
                                        {trx.customer}
                                    </td>
                                    <td className="px-8 py-7 font-medium text-gray-900 text-sm">
                                        {trx.contact}
                                    </td>
                                    <td className="px-8 py-7 font-medium text-gray-900 text-sm">
                                        {formatCurrency(trx.total)}
                                    </td>
                                    <td className="px-8 py-7">
                                        <div className={cn(
                                            "inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase",
                                            trx.status === "PENDING" ? "bg-[#FFF9C4] text-[#F9A825]" :
                                                trx.status === "PAID" ? "bg-[#E8F5E9] text-[#2E7D32]" :
                                                    "bg-[#FFEBEE] text-[#C62828]"
                                        )}>
                                            {trx.status}
                                        </div>
                                    </td>
                                    <td className="px-8 py-7 text-right">
                                        <button
                                            onClick={() => handleOpenDetail(trx)}
                                            className="inline-flex items-center gap-2 text-gray-900 font-bold hover:underline"
                                        >
                                            <Eye size={18} />
                                            <span className="text-sm">View Details</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Verify Transactions"
                maxWidth="max-w-4xl"
            >
                {selectedTrx && (
                    <div className="space-y-6 py-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                            <div className="space-y-3">
                                <h4 className="text-[13px] font-bold text-gray-900">Payment Proof</h4>
                                <div className="bg-[#1D91E1] rounded-2xl p-4 aspect-[3/4] flex flex-col items-center relative overflow-hidden shadow-lg max-w-[280px] mx-auto">
                                    <div className="w-full flex justify-between items-center text-white mb-4">
                                        <div className="p-1.5 bg-white/20 rounded-lg">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></svg>
                                        </div>
                                        <div className="p-1.5">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>
                                        </div>
                                    </div>

                                    <div className="bg-white text-gray-900 w-full flex-1 rounded-t-xl relative">
                                        <div className="absolute -top-2 left-0 right-0 h-2 bg-white" style={{ clipPath: 'polygon(0% 100%, 5% 0%, 10% 100%, 15% 0%, 20% 100%, 25% 0%, 30% 100%, 35% 0%, 40% 100%, 45% 0%, 50% 100%, 55% 0%, 60% 100%, 65% 0%, 70% 100%, 75% 0%, 80% 100%, 85% 0%, 90% 100%, 95% 0%, 100% 100%)' }}></div>

                                        <div className="p-4 flex flex-col items-center text-center space-y-3 pt-6">
                                            <div className="w-10 h-10 bg-[#1D91E1] rounded-full flex items-center justify-center text-white mb-1">
                                                <BadgeCheck size={20} strokeWidth={3} />
                                            </div>
                                            <h5 className="font-bold text-base">Transfer Successful</h5>
                                            <p className="text-[10px] text-gray-400 font-medium">Feb 23, 2026 • 19:32:05 WIB<br />Ref: 202612838123</p>

                                            <div className="w-full border-t border-dashed border-gray-200 my-2" />

                                            <div className="w-full space-y-2 text-[10px]">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-400">Source Bank</span>
                                                    <span className="font-bold">BANK BRI</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-400">Recipient Name</span>
                                                    <span className="font-bold">SPORTON CORP</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-400">Account No</span>
                                                    <span className="font-bold">88231291231</span>
                                                </div>
                                            </div>

                                            <div className="w-full border-t border-dashed border-gray-200 my-2" />

                                            <div className="flex justify-between w-full items-center">
                                                <span className="text-gray-400 text-[10px] text-left">Total Amount</span>
                                                <span className="text-lg font-black text-[#1D91E1]">{formatCurrency(selectedTrx.total)}</span>
                                            </div>
                                        </div>

                                        <div className="px-4 pb-4">
                                            <div className="w-full bg-[#1D91E1] text-white text-[10px] font-bold py-2 rounded-lg flex items-center justify-center">
                                                Done
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-[13px] font-bold text-gray-900 mb-4">Order Details</h4>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-gray-400 font-medium">Date</span>
                                            <span className="text-gray-900 font-bold">{selectedTrx.date}</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-gray-400 font-medium">Customer</span>
                                            <span className="text-gray-900 font-bold">{selectedTrx.customer}</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-gray-400 font-medium">Contact</span>
                                            <span className="text-gray-900 font-bold">{selectedTrx.contact}</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-gray-400 font-medium">Shipping Address</span>
                                            <span className="text-gray-900 font-bold text-right max-w-[200px] leading-relaxed">
                                                {selectedTrx.address}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <h5 className="text-[12px] font-bold text-gray-900">Items Purchased</h5>
                                        {selectedTrx.items.map((item, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                                                        <img src="/placeholder-shoe.png" alt="" className="w-6 h-6 opacity-50" />
                                                    </div>
                                                    <span className="font-bold text-gray-900 text-xs">{item.name}</span>
                                                </div>
                                                <span className="text-xs font-bold text-gray-900">{item.quantity} units</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex justify-between items-center pt-6 mt-3">
                                        <span className="font-bold text-gray-900 text-sm">Total</span>
                                        <span className="text-lg font-bold text-primary">{formatCurrency(selectedTrx.total)}</span>
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-3">
                                    <Button
                                        onClick={() => handleAction('REJECTED')}
                                        className="flex-1 h-11 bg-white border border-rose-200 text-rose-500 hover:bg-rose-50 rounded-xl font-bold text-xs"
                                    >
                                        <X size={16} className="mr-2" />
                                        Reject
                                    </Button>
                                    <Button
                                        onClick={() => handleAction('PAID')}
                                        className="flex-1 h-11 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-200 text-xs"
                                    >
                                        <Check size={16} className="mr-2" />
                                        Approve
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
