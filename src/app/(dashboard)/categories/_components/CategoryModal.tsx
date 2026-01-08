"use client";

import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "@/components/Modal";
import { Button, Input } from "@/components/ui/shared";
import { useSupabaseStore } from "@/hooks/useSupabaseStore";
import { ImagePlus } from "lucide-react";
import { Category } from "@/types";

interface CategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialData: Category | null;
}

interface CategoryFormValues {
    name: string;
    description: string;
}

export function CategoryModal({ isOpen, onClose, initialData }: CategoryModalProps) {
    const { addCategory, updateCategory } = useSupabaseStore();
    const [preview, setPreview] = useState<string | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<CategoryFormValues>({
        defaultValues: {
            name: "",
            description: ""
        }
    });

    useEffect(() => {
        if (initialData) {
            reset({
                name: initialData.name,
                description: initialData.description
            });
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setPreview(initialData.image || null);
        } else {
            reset({ name: "", description: "" });
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setPreview(null);
        }
    }, [initialData, isOpen, reset]);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = (data: CategoryFormValues) => {
        const categoryData = { ...data, image: preview || undefined };

        if (initialData) {
            updateCategory({ ...initialData, ...categoryData });
        } else {
            addCategory(categoryData);
        }
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={initialData ? "Update Category" : "Add New Category"}
            maxWidth="max-w-4xl"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8">
                    <div className="space-y-3">
                        <label className="text-[12px] font-bold text-gray-900 block ml-1">Category Image</label>
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

                    <div className="space-y-3 flex flex-col justify-start">
                        <Input
                            label="Category Name"
                            placeholder="e.g. Running Shoes"
                            error={errors.name?.message}
                            {...register("name", { required: "Category name is required" })}
                        />

                        <div className="space-y-1.5">
                            <label className="text-[12px] font-bold text-gray-900 block ml-1">Description</label>
                            <textarea
                                rows={4}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-100 bg-gray-50/50 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all resize-none placeholder:text-gray-300 text-sm"
                                placeholder="Product Details..."
                                {...register("description", { required: "Description is required" })}
                            />
                            {errors.description && <p className="text-[10px] text-rose-500 font-bold ml-1 text-left">{errors.description.message}</p>}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <Button type="submit" className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 rounded-xl font-bold text-sm">
                        {initialData ? "Save Changes" : "Create Category"}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
