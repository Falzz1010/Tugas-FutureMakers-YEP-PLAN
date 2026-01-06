"use client";

import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "@/components/Modal";
import { Button, Input } from "@/components/ui/shared";
import { useStore } from "@/hooks/useStore";
import { ImagePlus, ChevronDown } from "lucide-react";
import { Product } from "@/types";

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialData: Product | null;
}

interface ProductFormValues {
    name: string;
    categoryId: string;
    price: number;
    stock: number;
    description: string;
}

export function ProductModal({ isOpen, onClose, initialData }: ProductModalProps) {
    const { addProduct, updateProduct, categories } = useStore();
    const [preview, setPreview] = useState<string | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<ProductFormValues>({
        defaultValues: {
            name: "",
            categoryId: "",
            price: 0,
            stock: 0,
            description: ""
        }
    });

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                reset({
                    name: initialData.name,
                    categoryId: initialData.categoryId,
                    price: initialData.price,
                    stock: initialData.stock,
                    description: initialData.description || ""
                });
                setPreview(initialData.image || null);
            } else {
                reset({
                    name: "",
                    categoryId: categories[0]?.id || "",
                    price: 0,
                    stock: 0,
                    description: ""
                });
                setPreview(null);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, initialData, reset]); // Removed 'categories' dependency to prevent auto-reset

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = (data: ProductFormValues) => {
        const productData = {
            name: data.name,
            categoryId: data.categoryId,
            price: Number(data.price), // Ensure strict number
            stock: Number(data.stock), // Ensure strict number
            description: data.description,
            image: preview || undefined
        };

        if (initialData) {
            updateProduct({
                ...productData,
                id: initialData.id
            });
        } else {
            addProduct(productData);
        }
        onClose();
        reset();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={initialData ? "Update Product" : "Add New Product"}
            maxWidth="max-w-4xl"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8">
                    <div className="space-y-3">
                        <label className="text-[11px] font-black text-gray-900 uppercase tracking-widest block ml-1">Product Image</label>
                        <div
                            onClick={() => fileRef.current?.click()}
                            className="aspect-square bg-gray-50 border-2 border-dashed border-gray-100 rounded-2xl flex flex-col items-center justify-center gap-3 text-gray-300 hover:bg-white hover:border-primary/30 hover:text-primary cursor-pointer transition-all group overflow-hidden relative shadow-inner"
                        >
                            {preview ? (
                                <>
                                    <img src={preview} className="w-full h-full object-cover" alt="Preview" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="text-white font-black uppercase text-xs tracking-widest">Change Photo</span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                        <ImagePlus size={24} strokeWidth={2} className="text-primary" />
                                    </div>
                                    <p className="text-[10px] font-bold text-rose-500">Click to Upload</p>
                                </>
                            )}
                            <input type="file" ref={fileRef} className="hidden" accept="image/*" onChange={handleFile} />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Input
                            label="Product Name"
                            placeholder="e.g. Running Shoes"
                            error={errors.name?.message}
                            {...register("name", { required: "Product name is required" })}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Price (IDR)"
                                type="number"
                                placeholder="0"
                                error={errors.price?.message}
                                {...register("price", {
                                    required: "Price is required",
                                    valueAsNumber: true,
                                    validate: (value) => !isNaN(value) || "Price must be a number"
                                })}
                            />
                            <Input
                                label="Stock"
                                type="number"
                                placeholder="0"
                                error={errors.stock?.message}
                                {...register("stock", {
                                    required: "Stock is required",
                                    valueAsNumber: true,
                                    validate: (value) => !isNaN(value) || "Stock must be a number"
                                })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[13px] font-bold text-gray-900 block ml-1">Category</label>
                            <div className="relative">
                                <select
                                    className="w-full px-4 py-2.5 rounded-xl border-2 border-transparent bg-gray-50 focus:bg-white focus:border-[#FF4D00]/20 focus:outline-none focus:shadow-lg focus:shadow-[#FF4D00]/5 transition-all font-bold text-gray-900 text-sm appearance-none cursor-pointer"
                                    {...register("categoryId", { required: "Category is required" })}
                                >
                                    <option value="" disabled>Select Category</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} strokeWidth={3} />
                            </div>
                            {errors.categoryId && <p className="text-[10px] text-rose-500 font-bold ml-1">{errors.categoryId.message}</p>}
                        </div>
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-[13px] font-bold text-gray-900 block ml-1">Description</label>
                    <textarea
                        rows={4}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-100 bg-gray-50/50 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all resize-none placeholder:text-gray-300 text-sm"
                        placeholder="Product Details..."
                        {...register("description")}
                    />
                </div>

                <div className="flex justify-end gap-3 pt-6">
                    <Button type="submit" className="px-8 h-12 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 rounded-xl font-bold text-sm">
                        {initialData ? "Save Changes" : "Create Product"}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
