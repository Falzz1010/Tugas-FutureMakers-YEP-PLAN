"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    Package,
    Layers,
    ShoppingCart,
    CreditCard,
    LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
    {
        label: "Products",
        title: "Products",
        icon: Package,
        href: "/products",
    },
    {
        label: "Categories",
        title: "Categories",
        icon: Layers,
        href: "/categories",
    },
    {
        label: "Transactions",
        title: "Transactions",
        icon: ShoppingCart,
        href: "/transactions",
    },
    {
        label: "Bank Accounts",
        title: "Bank Informations",
        icon: CreditCard,
        href: "/bank-information",
    },
];

export function Sidebar({ isOpen, onClose }: { isOpen?: boolean, onClose?: () => void }) {
    const pathname = usePathname();
    const router = useRouter();

    return (
        <>
            <aside
                className={cn(
                    "w-72 bg-white border-r border-gray-100 flex flex-col h-screen fixed left-0 top-0 z-50 lg:z-auto transition-transform duration-300 lg:translate-x-0 lg:static shrink-0",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="p-8 pb-12 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                            <svg width="18" height="18" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M256 32L128 96V224C128 320 256 416 256 416C256 416 384 320 384 224V96L256 32Z" fill="white" />
                                <path d="M256 64L160 112V208C160 272 256 352 256 352C256 352 352 272 352 208V112L256 64Z" fill="#FF4D00" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-xl font-black text-gray-900 tracking-tight leading-none">
                                SPORT<span className="text-primary">ON</span>
                            </h1>
                        </div>
                    </div>
                    <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-gray-900">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                <div className="flex-1 px-6 space-y-2 overflow-y-auto">
                    <nav className="space-y-2" role="navigation" aria-label="Main Navigation">
                        {NAV_LINKS.map((link) => {
                            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => isOpen && onClose?.()}
                                    className={cn(
                                        "flex items-center gap-4 px-6 py-4 w-full rounded-2xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all duration-300 group border border-transparent hover:border-gray-100",
                                        isActive && "bg-gray-50 text-gray-900 border-gray-100"
                                    )}
                                >
                                    <link.icon
                                        size={22}
                                        className={cn(
                                            "text-gray-400 group-hover:text-gray-900 transition-colors",
                                            isActive && "text-gray-900"
                                        )}
                                    />
                                    <span className="font-black uppercase text-xs tracking-[0.2em]">{link.label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="p-8 mt-auto border-t border-gray-50">
                    <button
                        onClick={() => router.push("/login")}
                        className="flex items-center gap-3 text-gray-500 hover:text-gray-900 font-bold text-sm transition-colors group w-full text-left"
                    >
                        <LogOut size={20} strokeWidth={2.5} className="group-hover:text-rose-500 transition-colors" />
                        <span>Log Out</span>
                    </button>
                </div>
            </aside>

            <div
                className={cn(
                    "fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 backdrop-blur-sm",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
            />
        </>
    );
}
