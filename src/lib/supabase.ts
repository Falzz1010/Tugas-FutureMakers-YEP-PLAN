import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          name: string;
          category_id: string;
          price: number;
          stock: number;
          image: string | null;
          description: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['products']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['products']['Insert']>;
      };
      categories: {
        Row: {
          id: string;
          name: string;
          description: string;
          image: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['categories']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['categories']['Insert']>;
      };
      bank_accounts: {
        Row: {
          id: string;
          bank_name: string;
          account_number: string;
          account_holder: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['bank_accounts']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['bank_accounts']['Insert']>;
      };
      transactions: {
        Row: {
          id: string;
          date: string;
          customer: string;
          contact: string;
          address: string;
          total: number;
          status: 'PENDING' | 'PAID' | 'REJECTED';
          items: any; // JSONB
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['transactions']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['transactions']['Insert']>;
      };
    };
  };
};
