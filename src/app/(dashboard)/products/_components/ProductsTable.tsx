"use client";

import { Pencil, Trash2 } from "lucide-react";
import { formatCurrency } from "@/lib/format";
import { Card } from "@/components/ui/shared";
import { Product, Category } from "@/types";

interface ProductsTableProps {
    products: Product[];
    categories: Category[];
    onEdit: (product: Product) => void;
    onDelete: (id: string) => void;
}

export function ProductsTable({ products, categories, onEdit, onDelete }: ProductsTableProps) {
    const getCategoryName = (id: string) => categories.find(c => c.id === id)?.name || "Uncategorized";

    return (
        <Card>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50/50 border-b border-gray-100">
                        <tr>
                            <th className="px-8 py-6 text-[13px] font-bold text-gray-900">Product</th>
                            <th className="px-8 py-6 text-[13px] font-bold text-gray-900">Category</th>
                            <th className="px-8 py-6 text-[13px] font-bold text-gray-900">Price</th>
                            <th className="px-8 py-6 text-[13px] font-bold text-gray-900">Stock</th>
                            <th className="px-8 py-6 text-[13px] font-bold text-gray-900 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-8 py-20 text-center text-gray-300 font-bold italic">
                                    No entries found in your inventory.
                                </td>
                            </tr>
                        ) : products.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50/80 transition-all group">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-5">
                                        <div className="w-12 h-12 rounded-lg bg-gray-100/50 border border-gray-100 overflow-hidden flex-shrink-0">
                                            {product.image ? (
                                                <img src={product.image} className="w-full h-full object-cover" alt="" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-[10px] font-black text-gray-300 uppercase italic">N/A</div>
                                            )}
                                        </div>
                                        <span className="text-gray-900 font-bold text-sm">{product.name}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <span className="inline-flex px-3 py-1 rounded bg-gray-100 text-gray-700 font-semibold text-xs">
                                        {getCategoryName(product.categoryId)}
                                    </span>
                                </td>
                                <td className="px-8 py-6 text-gray-900 font-black text-lg">
                                    {formatCurrency(product.price)}
                                </td>
                                <td className="px-8 py-6">
                                    <span className="font-medium text-gray-900">{product.stock} units</span>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <div className="flex items-center justify-end gap-2 translate-x-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                        <button
                                            onClick={() => onEdit(product)}
                                            className="p-3 text-gray-400 hover:text-gray-900 hover:bg-white rounded-xl border border-transparent hover:border-gray-100 transition-all"
                                        >
                                            <Pencil size={20} />
                                        </button>
                                        <button
                                            onClick={() => onDelete(product.id)}
                                            className="p-3 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
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
    );
}
