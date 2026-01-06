"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, FolderPen } from "lucide-react";
import { useStore } from "@/hooks/useStore";
import { Button, Card } from "@/components/ui/shared";
import { CategoryModal } from "./_components/CategoryModal";
import { Category } from "@/types";

export default function CategoriesPage() {
    const { categories, isLoading, deleteCategory } = useStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    const handleOpenAdd = () => {
        setEditingCategory(null);
        setIsModalOpen(true);
    };

    const handleOpenEdit = (category: Category) => {
        setEditingCategory(category);
        setIsModalOpen(true);
    };

    if (isLoading) return <div className="p-8 animate-pulse text-gray-400 font-bold uppercase tracking-widest text-xs">Loading taxonomy...</div>;

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-12">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Category Management</h1>
                    <p className="text-gray-500 font-medium">Organize your products into categories.</p>
                </div>
                <Button onClick={handleOpenAdd} className="h-12 px-6 bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 rounded-xl">
                    <Plus size={18} strokeWidth={3} className="mr-2" />
                    <span>Add Category</span>
                </Button>
            </header>

            <Card className="border border-gray-100 shadow-xl shadow-gray-200/20">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-[#FAFBFD] border-b border-gray-100">
                            <tr>
                                <th className="px-10 py-6 text-[13px] font-bold text-gray-900">Category</th>
                                <th className="px-10 py-6 text-[13px] font-bold text-gray-900">Description</th>
                                <th className="px-10 py-6 text-[13px] font-bold text-gray-900 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {categories.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="px-10 py-24 text-center text-gray-300 font-bold italic">No categories defined yet.</td>
                                </tr>
                            ) : categories.map((c) => (
                                <tr key={c.id} className="group hover:bg-[#FDFEFF] transition-all">
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-6">
                                            <div className="w-12 h-12 rounded-lg bg-gray-100/50 border border-gray-100 flex items-center justify-center overflow-hidden">
                                                {c.image ? (
                                                    <img src={c.image} className="w-full h-full object-cover" alt="" />
                                                ) : (
                                                    <FolderPen className="text-gray-300" size={24} />
                                                )}
                                            </div>
                                            <span className="text-gray-900 font-bold text-sm">{c.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <p className="text-gray-900 font-medium text-sm">{c.description}</p>
                                    </td>
                                    <td className="px-10 py-8 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                                            <button
                                                onClick={() => handleOpenEdit(c)}
                                                className="p-3.5 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-gray-900 hover:shadow-lg transition-all"
                                            >
                                                <Pencil size={20} />
                                            </button>
                                            <button
                                                onClick={() => deleteCategory(c.id)}
                                                className="p-3.5 bg-rose-50 text-rose-300 hover:text-rose-600 rounded-2xl transition-all"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            <CategoryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                initialData={editingCategory}
            />
        </div>
    );
}
