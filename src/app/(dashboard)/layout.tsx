"use client";

import { useStore } from "@/hooks/useStore";
import { Sidebar } from "@/components/Sidebar";
import { AdminProviders } from "@/components/AdminProviders";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/shared";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <AdminProviders>
            <div className="h-screen bg-body-bg font-sans selection:bg-primary/10 selection:text-primary flex overflow-hidden">
                <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

                <main className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto bg-gray-50/30">
                    <header className="sticky top-0 z-30 bg-white/70 backdrop-blur-xl border-b border-gray-100 h-20 flex items-center justify-between px-6 md:px-12">
                        <div className="flex items-center gap-4">
                            <Button
                                variant="ghost"
                                className="lg:hidden p-3 rounded-2xl"
                                onClick={() => setIsSidebarOpen(true)}
                            >
                                <Menu size={24} />
                            </Button>
                            <div className="hidden md:flex flex-col">
                                <span className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em]">Environment</span>
                                <span className="text-gray-900 font-black text-sm uppercase tracking-widest flex items-center gap-2">
                                    Production Master
                                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-sm shadow-emerald-500"></span>
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="h-10 w-[1px] bg-gray-100 mx-2" />
                        </div>
                    </header>

                    <div className="p-6 md:p-12 flex-1">
                        {children}
                    </div>
                </main>
            </div>
        </AdminProviders>
    );
}
