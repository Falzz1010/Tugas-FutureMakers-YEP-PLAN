import { useSyncExternalStore } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product, Category, BankAccount, Transaction, TransactionStatus } from "@/types";

interface StoreState {
    products: Product[];
    categories: Category[];
    bankAccounts: BankAccount[];
    transactions: Transaction[];
    isLoading: boolean;
}

interface StoreActions {
    addProduct: (product: Omit<Product, "id">) => void;
    updateProduct: (product: Product) => void;
    deleteProduct: (id: string) => void;

    addCategory: (category: Omit<Category, "id">) => void;
    updateCategory: (category: Category) => void;
    deleteCategory: (id: string) => void;

    addBank: (bank: Omit<BankAccount, "id">) => void;
    deleteBank: (id: string) => void;

    addTransaction: (transaction: Omit<Transaction, "id"> | Transaction) => void;
    updateTransactionStatus: (id: string, status: TransactionStatus) => void;
    setLoading: (loading: boolean) => void;
}

const useZustandStore = create<StoreState & StoreActions>()(
    persist(
        (set) => ({
            products: [],
            categories: [],
            bankAccounts: [],
            transactions: [],
            isLoading: true,

            addProduct: (product) => set((state) => ({
                products: [...state.products, { ...product, id: crypto.randomUUID() }]
            })),
            updateProduct: (product) => set((state) => ({
                products: state.products.map((p) => (p.id === product.id ? product : p))
            })),
            deleteProduct: (id) => set((state) => ({
                products: state.products.filter((p) => p.id !== id)
            })),

            addCategory: (category) => set((state) => ({
                categories: [...state.categories, { ...category, id: crypto.randomUUID() }]
            })),
            updateCategory: (category) => set((state) => ({
                categories: state.categories.map((c) => (c.id === category.id ? category : c))
            })),
            deleteCategory: (id) => set((state) => ({
                categories: state.categories.filter((c) => c.id !== id)
            })),

            addBank: (bank) => set((state) => ({
                bankAccounts: [...state.bankAccounts, { ...bank, id: crypto.randomUUID() }]
            })),
            deleteBank: (id) => set((state) => ({
                bankAccounts: state.bankAccounts.filter((b) => b.id !== id)
            })),

            addTransaction: (transaction) => set((state) => {
                const newTransaction: Transaction = 'id' in transaction && transaction.id
                    ? transaction as Transaction
                    : { ...transaction, id: crypto.randomUUID() };
                return {
                    transactions: [...state.transactions, newTransaction]
                };
            }),
            updateTransactionStatus: (id, status) => set((state) => ({
                transactions: state.transactions.map((t) => (t.id === id ? { ...t, status } : t))
            })),
            setLoading: (loading) => set({ isLoading: loading }),
        }),
        {
            name: "sporton-storage-v4",
            storage: createJSONStorage(() => localStorage),
            onRehydrateStorage: () => (state) => {
                state?.setLoading(false);
            },
        }
    )
);

const emptySubscribe = () => () => { };

export function useStore() {
    const store = useZustandStore();
    const isClient = useSyncExternalStore(
        emptySubscribe,
        () => true,
        () => false
    );

    if (!isClient) {
        return {
            ...store,
            isLoading: true,
            products: [],
            categories: [],
            bankAccounts: [],
            transactions: []
        };
    }

    return store;
}
