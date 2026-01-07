"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export interface BankAccount {
  id: number;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  isActive: boolean;
}

interface BankContextType {
  banks: BankAccount[];
  addBank: (bank: Omit<BankAccount, "id">) => void;
  updateBank: (id: number, bank: Partial<BankAccount>) => void;
  deleteBank: (id: number) => void;
  toggleBankStatus: (id: number) => void;
}

const BankContext = createContext<BankContextType | undefined>(undefined);

export function BankProvider({ children }: { children: ReactNode }) {
  // Initialize with empty array, will be loaded from localStorage
  const [banks, setBanks] = useState<BankAccount[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedBanks = localStorage.getItem("bankAccounts");
    if (savedBanks) {
      setBanks(JSON.parse(savedBanks));
    } else {
      // Only set default banks if localStorage is empty
      const defaultBanks = [
        { id: 1, bankName: "BCA", accountNumber: "0123182312", accountHolder: "SportOn Store", isActive: true },
        { id: 2, bankName: "Mandiri", accountNumber: "83923912013203123", accountHolder: "SportOn Store", isActive: true },
        { id: 3, bankName: "BTPN", accountNumber: "5238218923", accountHolder: "SportOn Store", isActive: true },
      ];
      setBanks(defaultBanks);
      localStorage.setItem("bankAccounts", JSON.stringify(defaultBanks));
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage whenever banks change (but only after initialization)
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("bankAccounts", JSON.stringify(banks));
    }
  }, [banks, isInitialized]);

  const addBank = (bank: Omit<BankAccount, "id">) => {
    const newBank = {
      ...bank,
      id: Date.now(),
    };
    setBanks((prev) => [...prev, newBank]);
  };

  const updateBank = (id: number, updatedBank: Partial<BankAccount>) => {
    setBanks((prev) =>
      prev.map((bank) => (bank.id === id ? { ...bank, ...updatedBank } : bank))
    );
  };

  const deleteBank = (id: number) => {
    setBanks((prev) => prev.filter((bank) => bank.id !== id));
  };

  const toggleBankStatus = (id: number) => {
    setBanks((prev) =>
      prev.map((bank) =>
        bank.id === id ? { ...bank, isActive: !bank.isActive } : bank
      )
    );
  };

  return (
    <BankContext.Provider
      value={{
        banks,
        addBank,
        updateBank,
        deleteBank,
        toggleBankStatus,
      }}
    >
      {children}
    </BankContext.Provider>
  );
}

export function useBanks() {
  const context = useContext(BankContext);
  if (context === undefined) {
    throw new Error("useBanks must be used within a BankProvider");
  }
  return context;
}
