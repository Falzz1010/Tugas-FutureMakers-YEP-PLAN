"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    maxWidth?: string;
    closeOnOverlay?: boolean;
    size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "full";
}

export function Modal({
    isOpen,
    onClose,
    title,
    children,
    maxWidth,
    closeOnOverlay = true,
    size = "2xl"
}: ModalProps) {
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const sizeClasses = {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        "2xl": "max-w-2xl",
        "3xl": "max-w-3xl",
        "4xl": "max-w-4xl",
        full: "max-w-full"
    };

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={() => closeOnOverlay && onClose()}
            />
            <div className={cn(
                "relative bg-white w-full rounded-2xl shadow-2xl overflow-hidden transition-all transform animate-in fade-in zoom-in duration-200",
                sizeClasses[size],
                maxWidth
            )}>
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h3 id="modal-title" className="text-xl font-bold text-gray-900">{title}</h3>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-all"
                    >
                        <X size={24} />
                    </button>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}
