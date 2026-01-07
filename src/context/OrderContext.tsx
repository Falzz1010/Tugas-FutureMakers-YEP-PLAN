"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface OrderContextType {
  currentOrderId: string | null;
  setCurrentOrderId: (id: string | null) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);

  return (
    <OrderContext.Provider value={{ currentOrderId, setCurrentOrderId }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
}
