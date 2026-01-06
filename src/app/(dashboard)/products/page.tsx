"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useStore } from "@/hooks/useStore";
import { ProductModal } from "./_components/ProductModal";
import { Product } from "@/types";
import { ProductsHeader } from "./_components/ProductsHeader";
import { ProductsFilter } from "./_components/ProductsFilter";
import { ProductsTable } from "./_components/ProductsTable";

interface FilterFormValues {
    search: string;
}

export default function ProductsPage() {
    const { products, isLoading, deleteProduct, categories } = useStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const { register, watch } = useForm<FilterFormValues>({
        defaultValues: {
            search: ""
        }
    });

    const searchQuery = watch("search");

    const getCategoryName = (id: string) => categories.find(c => c.id === id)?.name || "Uncategorized";

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        getCategoryName(p.categoryId).toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleOpenAdd = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    };

    const handleOpenEdit = (product: Product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    if (isLoading) return <div className="p-8 animate-pulse text-gray-400 font-bold">Loading product database...</div>;

    return (
        <div className="max-w-[1400px] mx-auto space-y-8 pb-12">
            <ProductsHeader onAdd={handleOpenAdd} />

            <ProductsFilter register={register} />

            <ProductsTable
                products={filteredProducts}
                categories={categories}
                onEdit={handleOpenEdit}
                onDelete={deleteProduct}
            />

            <ProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                initialData={editingProduct}
            />
        </div>
    );
}
