"use client";

/**
 * Root providers - only include truly global state here
 * Route-specific providers should be in their own layouts:
 * - ShopProviders: Cart + Order (customer pages)
 * - AdminProviders: Bank (dashboard pages)
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
