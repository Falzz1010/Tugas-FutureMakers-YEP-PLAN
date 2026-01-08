"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Product, Category, BankAccount, Transaction, TransactionStatus } from '@/types';

export function useSupabaseStore() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all data on mount
  useEffect(() => {
    fetchAllData();
    
    // Subscribe to real-time changes
    const transactionsSubscription = supabase
      .channel('transactions-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'transactions' }, () => {
        fetchTransactions();
      })
      .subscribe();

    return () => {
      transactionsSubscription.unsubscribe();
    };
  }, []);

  const fetchAllData = async () => {
    setIsLoading(true);
    await Promise.all([
      fetchProducts(),
      fetchCategories(),
      fetchBankAccounts(),
      fetchTransactions(),
    ]);
    setIsLoading(false);
  };

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setProducts(data.map(p => ({
        id: p.id,
        name: p.name,
        categoryId: p.category_id,
        price: Number(p.price),
        stock: p.stock,
        image: p.image || undefined,
        description: p.description || undefined,
      })));
    }
  };

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setCategories(data.map(c => ({
        id: c.id,
        name: c.name,
        description: c.description,
        image: c.image || undefined,
      })));
    }
  };

  const fetchBankAccounts = async () => {
    const { data, error } = await supabase
      .from('bank_accounts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setBankAccounts(data.map(b => ({
        id: b.id,
        bankName: b.bank_name,
        accountNumber: b.account_number,
        accountHolder: b.account_holder,
      })));
    }
  };

  const fetchTransactions = async () => {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      console.log('🟢 Fetched transactions from Supabase:', data.length);
      setTransactions(data.map(t => ({
        id: t.id,
        date: t.date,
        customer: t.customer,
        contact: t.contact,
        address: t.address,
        total: Number(t.total),
        status: t.status as TransactionStatus,
        items: t.items,
      })));
    } else {
      console.error('❌ Error fetching transactions:', error);
    }
  };

  // Products
  const addProduct = async (product: Omit<Product, 'id'>) => {
    const { data, error } = await supabase
      .from('products')
      .insert({
        name: product.name,
        category_id: product.categoryId,
        price: product.price,
        stock: product.stock,
        image: product.image,
        description: product.description,
      })
      .select()
      .single();

    if (!error && data) {
      await fetchProducts();
    }
  };

  const updateProduct = async (product: Product) => {
    const { error } = await supabase
      .from('products')
      .update({
        name: product.name,
        category_id: product.categoryId,
        price: product.price,
        stock: product.stock,
        image: product.image,
        description: product.description,
      })
      .eq('id', product.id);

    if (!error) {
      await fetchProducts();
    }
  };

  const deleteProduct = async (id: string) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (!error) {
      await fetchProducts();
    }
  };

  // Categories
  const addCategory = async (category: Omit<Category, 'id'>) => {
    const { error } = await supabase
      .from('categories')
      .insert({
        name: category.name,
        description: category.description,
        image: category.image,
      });

    if (!error) {
      await fetchCategories();
    }
  };

  const updateCategory = async (category: Category) => {
    const { error } = await supabase
      .from('categories')
      .update({
        name: category.name,
        description: category.description,
        image: category.image,
      })
      .eq('id', category.id);

    if (!error) {
      await fetchCategories();
    }
  };

  const deleteCategory = async (id: string) => {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);

    if (!error) {
      await fetchCategories();
    }
  };

  // Bank Accounts
  const addBank = async (bank: Omit<BankAccount, 'id'>) => {
    const { error } = await supabase
      .from('bank_accounts')
      .insert({
        bank_name: bank.bankName,
        account_number: bank.accountNumber,
        account_holder: bank.accountHolder,
      });

    if (!error) {
      await fetchBankAccounts();
    }
  };

  const deleteBank = async (id: string) => {
    const { error } = await supabase
      .from('bank_accounts')
      .delete()
      .eq('id', id);

    if (!error) {
      await fetchBankAccounts();
    }
  };

  // Transactions
  const addTransaction = async (transaction: Omit<Transaction, 'id'> | Transaction) => {
    console.log('🔵 Adding transaction to Supabase:', transaction);
    
    const { data, error } = await supabase
      .from('transactions')
      .insert({
        date: transaction.date,
        customer: transaction.customer,
        contact: transaction.contact,
        address: transaction.address,
        total: transaction.total,
        status: transaction.status,
        items: transaction.items,
      })
      .select()
      .single();

    if (error) {
      console.error('❌ Error adding transaction:', error);
    } else {
      console.log('✅ Transaction added successfully:', data);
      await fetchTransactions();
    }
  };

  const updateTransactionStatus = async (id: string, status: TransactionStatus) => {
    const { error } = await supabase
      .from('transactions')
      .update({ status })
      .eq('id', id);

    if (!error) {
      await fetchTransactions();
    }
  };

  return {
    products,
    categories,
    bankAccounts,
    transactions,
    isLoading,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    updateCategory,
    deleteCategory,
    addBank,
    deleteBank,
    addTransaction,
    updateTransactionStatus,
  };
}
