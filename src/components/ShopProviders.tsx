"use client";

import { CartProvider } from "@/context/CartContext";
import { OrderProvider } from "@/context/OrderContext";

/**
 * Shop-specific providers for customer-facing pages
 * Used in: product pages, checkout, payment, order status
 */
export function ShopProviders({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <OrderProvider>
        {children}
      </OrderProvider>
    </CartProvider>
  );
}
