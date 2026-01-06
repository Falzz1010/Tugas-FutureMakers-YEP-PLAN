export interface Product {
    id: string;
    name: string;
    categoryId: string;
    price: number;
    stock: number;
    image?: string;
    description?: string;
}

export interface Category {
    id: string;
    name: string;
    description: string;
    image?: string;
}

export interface BankAccount {
    id: string;
    bankName: string;
    accountNumber: string;
    accountHolder: string;
}

export type TransactionStatus = 'PENDING' | 'PAID' | 'REJECTED';

export interface TransactionItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
}

export interface Transaction {
    id: string;
    date: string; // ISO 8601
    customer: string;
    total: number;
    contact: string;
    status: TransactionStatus;
    address: string;
    items: TransactionItem[];
}
