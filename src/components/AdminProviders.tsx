"use client";

import { BankProvider } from "@/context/BankContext";

/**
 * Admin-specific providers for dashboard pages
 * Used in: dashboard routes only
 */
export function AdminProviders({ children }: { children: React.ReactNode }) {
  return (
    <BankProvider>
      {children}
    </BankProvider>
  );
}
