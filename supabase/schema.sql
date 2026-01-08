-- SportOn Database Schema
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add unique constraint if not exists
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'categories_name_key'
    ) THEN
        ALTER TABLE categories ADD CONSTRAINT categories_name_key UNIQUE (name);
    END IF;
END $$;

-- Products Table
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
    price NUMERIC(10, 2) NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0,
    image TEXT,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bank Accounts Table
CREATE TABLE IF NOT EXISTS bank_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    bank_name TEXT NOT NULL,
    account_number TEXT NOT NULL,
    account_holder TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Transactions Table
CREATE TABLE IF NOT EXISTS transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date TEXT NOT NULL,
    customer TEXT NOT NULL,
    contact TEXT NOT NULL,
    address TEXT NOT NULL,
    total NUMERIC(10, 2) NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('PENDING', 'PAID', 'REJECTED')),
    items JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);
CREATE INDEX IF NOT EXISTS idx_transactions_created ON transactions(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE bank_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read categories" ON categories;
DROP POLICY IF EXISTS "Allow public read products" ON products;
DROP POLICY IF EXISTS "Allow public read banks" ON bank_accounts;
DROP POLICY IF EXISTS "Allow public read transactions" ON transactions;
DROP POLICY IF EXISTS "Allow public insert categories" ON categories;
DROP POLICY IF EXISTS "Allow public update categories" ON categories;
DROP POLICY IF EXISTS "Allow public delete categories" ON categories;
DROP POLICY IF EXISTS "Allow public insert products" ON products;
DROP POLICY IF EXISTS "Allow public update products" ON products;
DROP POLICY IF EXISTS "Allow public delete products" ON products;
DROP POLICY IF EXISTS "Allow public insert banks" ON bank_accounts;
DROP POLICY IF EXISTS "Allow public delete banks" ON bank_accounts;
DROP POLICY IF EXISTS "Allow public insert transactions" ON transactions;
DROP POLICY IF EXISTS "Allow public update transactions" ON transactions;

-- Public read access (for now - you can add auth later)
CREATE POLICY "Allow public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public read banks" ON bank_accounts FOR SELECT USING (true);
CREATE POLICY "Allow public read transactions" ON transactions FOR SELECT USING (true);

-- Public write access (for now - you should add auth later)
CREATE POLICY "Allow public insert categories" ON categories FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update categories" ON categories FOR UPDATE USING (true);
CREATE POLICY "Allow public delete categories" ON categories FOR DELETE USING (true);

CREATE POLICY "Allow public insert products" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update products" ON products FOR UPDATE USING (true);
CREATE POLICY "Allow public delete products" ON products FOR DELETE USING (true);

CREATE POLICY "Allow public insert banks" ON bank_accounts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public delete banks" ON bank_accounts FOR DELETE USING (true);

CREATE POLICY "Allow public insert transactions" ON transactions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update transactions" ON transactions FOR UPDATE USING (true);

-- Insert default bank accounts
INSERT INTO bank_accounts (bank_name, account_number, account_holder) VALUES
    ('BCA', '0123182312', 'SportOn Store'),
    ('Mandiri', '83923912013203123', 'SportOn Store'),
    ('BTPN', '5238218923', 'SportOn Store')
ON CONFLICT DO NOTHING;

-- Insert default categories
INSERT INTO categories (name, description, image) VALUES
    ('Running', 'Running shoes and gear', '/icon/category-running.png'),
    ('Tennis', 'Tennis equipment', '/icon/category-Tennis.png'),
    ('Basketball', 'Basketball gear', '/icon/category-basketball.png'),
    ('Football', 'Football equipment', '/icon/category-football.png'),
    ('Badminton', 'Badminton gear', '/icon/category-badminton.png'),
    ('Swimming', 'Swimming equipment', '/icon/category-swimming.png')
ON CONFLICT (name) DO NOTHING;

-- Insert sample products
INSERT INTO products (name, category_id, price, stock, image, description) VALUES
    ('SportsOn Hyperfast Shoes', (SELECT id FROM categories WHERE name = 'Running' LIMIT 1), 339000, 25, '/product-3.png', 'Sepatu lari ringan dengan teknologi cushioning terbaru. Cocok untuk lari jarak jauh maupun sprint.'),
    ('SportsOn Rockets Tennis', (SELECT id FROM categories WHERE name = 'Tennis' LIMIT 1), 918000, 15, '/product-2.png', 'Raket tenis profesional dengan frame carbon fiber. Memberikan power dan kontrol maksimal.'),
    ('SportsOn Slowlvin', (SELECT id FROM categories WHERE name = 'Running' LIMIT 1), 99000, 30, '/product-1.png', 'Sepatu running casual untuk jogging santai. Nyaman dipakai sehari-hari.'),
    ('SportsOn Hypersoccer V2', (SELECT id FROM categories WHERE name = 'Football' LIMIT 1), 458000, 20, '/product-4.png', 'Sepatu bola dengan desain hitam putih aksen merah. Sol karet memberikan traksi optimal di lapangan.'),
    ('SportsOn Hypersoccer v3', (SELECT id FROM categories WHERE name = 'Football' LIMIT 1), 486000, 18, '/product-4.png', 'Versi terbaru sepatu bola dengan fit lebih nyaman dan grip lebih baik.'),
    ('SportsOn Slowlivin', (SELECT id FROM categories WHERE name = 'Running' LIMIT 1), 118000, 35, '/product-5.png', 'Sepatu lifestyle sporty yang bisa dipakai untuk olahraga ringan atau jalan-jalan.'),
    ('SportsOn Pro Basketball', (SELECT id FROM categories WHERE name = 'Basketball' LIMIT 1), 229000, 22, '/product-6.png', 'Bola basket ukuran standar dengan grip karet yang bagus. Cocok untuk indoor dan outdoor.'),
    ('SportsOn Elite Racket', (SELECT id FROM categories WHERE name = 'Tennis' LIMIT 1), 999000, 10, '/product-2.png', 'Raket tenis premium untuk pemain profesional. Teknologi terbaru untuk power maksimal.')
ON CONFLICT DO NOTHING;
