"use client";

import { Search, Filter } from "lucide-react";
import { Button, Input } from "@/components/ui/shared";
import { UseFormRegister } from "react-hook-form";

interface FilterFormValues {
    search: string;
}

interface ProductsFilterProps {
    register: UseFormRegister<FilterFormValues>;
}

export function ProductsFilter({ register }: ProductsFilterProps) {
    return (
        <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" size={20} />
                <Input
                    placeholder="Search by name or category..."
                    className="pl-14 h-14 bg-white border-gray-100"
                    {...register("search")}
                />
            </div>
            <Button variant="secondary" className="h-14 px-8 border border-gray-100">
                <Filter size={20} />
                <span>Filter</span>
            </Button>
        </div>
    );
}
