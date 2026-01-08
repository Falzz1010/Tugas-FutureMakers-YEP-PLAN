"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSupabaseStore } from "@/hooks/useSupabaseStore";
import { CategoryModal } from "./_components/CategoryModal";
import { Category } from "@/types";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";

export const dynamic = 'force-dynamic';

interface FilterFormValues {
    search: string;
}

export default function CategoriesPage() {
    const { categories, isLoading, deleteCategory } = useSupabaseStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    const { register, watch } = useForm<FilterFormValues>({
        defaultValues: {
            search: ""
        }
    });

    const searchQuery = watch("search");

    const filteredCategories = categories.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleOpenAdd = () => {
        setEditingCategory(null);
        setIsModalOpen(true);
    };

    const handleOpenEdit = (category: Category) => {
        setEditingCategory(category);
        setIsModalOpen(true);
    };

    if (isLoading) return <div className="p-8 animate-pulse text-gray-400 font-bold">Loading categories...</div>;

    return (
        <div className="max-w-[1400px] mx-auto space-y-8 pb-12">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-gray-900">Categories</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage product categories</p>
                </div>
                <button
                    onClick={handleOpenAdd}
                    className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 transition-all"
                >
                    <Plus size={18} />
                    Add Category
                </button>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Search categories..."
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
                    {...register("search")}
                />
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCategories.map((category) => (
                    <div
                        key={category.id}
                        className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all group"
                    >
                        <div className="flex items-start gap-4">
                            <div className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                                {category.image ? (
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                                        <span className="text-2xl font-bold">{category.name[0]}</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-gray-900 text-lg truncate">{category.name}</h3>
                                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{category.description}</p>
                            </div>
                        </div>

                        <div className="flex gap-2 mt-4 pt-4 border-t border-gray-50">
                            <button
                                onClick={() => handleOpenEdit(category)}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg font-bold text-sm transition-all"
                            >
                                <Pencil size={16} />
                                Edit
                            </button>
                            <button
                                onClick={() => {
                                    if (confirm(`Delete category "${category.name}"?`)) {
                                        deleteCategory(category.id);
                                    }
                                }}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg font-bold text-sm transition-all"
                            >
                                <Trash2 size={16} />
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredCategories.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-400 font-medium">No categories found</p>
                </div>
            )}

            <CategoryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                initialData={editingCategory}
            />
        </div>
    );
}
