"use client";

import { useStore } from "@/hooks/useStore";
import { Card, Button } from "@/components/ui/shared";
import { Plus, Trash2, Pencil, CreditCard } from "lucide-react";
import { Modal } from "@/components/Modal";
import { useState } from "react";
import { Input } from "@/components/ui/shared";
import { useForm } from "react-hook-form";

interface BankFormData {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
}

export default function BankInformationPage() {
    const { bankAccounts, isLoading, deleteBank, addBank } = useStore();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<BankFormData>({
        defaultValues: {
            bankName: "",
            accountNumber: "",
            accountHolder: "PT SportsOn Digital"
        }
    });

    if (isLoading) return <div className="p-8 text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px] animate-pulse">Loading bank data...</div>;

    const onSubmit = async (data: BankFormData) => {
        try {
            await addBank(data);
            setIsModalOpen(false);
            reset();
        } catch (error) {
            console.error("Failed to add bank:", error);
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-12 pb-12">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Bank Information</h1>
                    <p className="text-gray-500 font-medium">Manage your bank accounts.</p>
                </div>
                <Button onClick={() => setIsModalOpen(true)} className="h-12 px-6 bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 rounded-xl">
                    <Plus size={18} strokeWidth={3} className="mr-2" />
                    <span>Add Bank Account</span>
                </Button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {bankAccounts.map((bank) => (
                    <Card key={bank.id} className="border border-gray-100 shadow-sm p-8 rounded-2xl relative group bg-white">
                        <div className="flex justify-between items-start mb-8">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-500">
                                    <CreditCard size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg">{bank.bankName}</h3>
                                    <p className="text-gray-400 text-xs font-medium">Bank Transfer</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                                    <Pencil size={18} />
                                </button>
                                <button onClick={() => deleteBank(bank.id)} className="text-gray-400 hover:text-rose-500 transition-colors">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-1 mb-6">
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Account Number</p>
                            <p className="font-bold text-gray-900 text-xl tracking-tight tabular-nums">{bank.accountNumber}</p>
                        </div>

                        <div className="pt-6 border-t border-gray-50">
                            <p className="text-gray-400 text-xs font-bold">Holder : <span className="text-gray-900">{bank.accountHolder}</span></p>
                        </div>
                    </Card>
                ))}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Bank Account" maxWidth="max-w-xl">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <Input
                            label="Bank Name"
                            placeholder="e.g. Mandiri, BCA, BRI"
                            error={errors.bankName?.message}
                            {...register("bankName", { required: "Bank name is required" })}
                        />
                        <Input
                            label="Account Number"
                            placeholder="123124344234234"
                            error={errors.accountNumber?.message}
                            {...register("accountNumber", { required: "Account number is required" })}
                        />
                        <Input
                            label="Account Holder"
                            placeholder="Holder Name as registered on the account"
                            error={errors.accountHolder?.message}
                            {...register("accountHolder", { required: "Account holder is required" })}
                        />
                    </div>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-12 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 rounded-xl font-bold text-sm mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? "Saving..." : "Add Bank Account"}
                    </Button>
                </form>
            </Modal>
        </div>
    );
}
