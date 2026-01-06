"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/shared";

interface ProductsHeaderProps {
    onAdd: () => void;
}

export function ProductsHeader({ onAdd }: ProductsHeaderProps) {
    return (
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-1">
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">Product Management</h1>
                <p className="text-gray-500 font-medium">Manage your inventory, prices and stock.</p>
            </div>
            <Button onClick={onAdd} className="h-12 px-6 bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 rounded-xl">
                <Plus size={18} strokeWidth={3} className="mr-2" />
                <span>Add Product</span>
            </Button>
        </header>
    );
}
