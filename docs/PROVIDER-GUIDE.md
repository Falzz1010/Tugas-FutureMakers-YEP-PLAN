# Provider Architecture Guide

## Quick Reference

### Where to Add New Contexts

#### Global State (Rare)
Add to `src/components/Providers.tsx`
- Theme/Dark mode
- Auth state (if used across all routes)
- i18n/Localization

#### Shop-Specific State
Add to `src/components/ShopProviders.tsx`
- Shopping cart
- Order tracking
- Wishlist
- Product filters

#### Admin-Specific State
Add to `src/components/AdminProviders.tsx`
- Bank accounts
- Admin settings
- Dashboard filters

## How to Add a New Context

### 1. Create the Context
```typescript
// src/context/WishlistContext.tsx
"use client";

import { createContext, useContext, useState } from "react";

interface WishlistContextType {
  items: string[];
  addItem: (id: string) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<string[]>([]);
  
  const addItem = (id: string) => {
    setItems(prev => [...prev, id]);
  };

  return (
    <WishlistContext.Provider value={{ items, addItem }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within WishlistProvider");
  return context;
}
```

### 2. Add to Appropriate Provider

#### For Shop Pages:
```typescript
// src/components/ShopProviders.tsx
import { WishlistProvider } from "@/context/WishlistContext";

export function ShopProviders({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <OrderProvider>
        <WishlistProvider>  {/* Add here */}
          {children}
        </WishlistProvider>
      </OrderProvider>
    </CartProvider>
  );
}
```

#### For Admin Pages:
```typescript
// src/components/AdminProviders.tsx
import { SettingsProvider } from "@/context/SettingsContext";

export function AdminProviders({ children }: { children: React.ReactNode }) {
  return (
    <BankProvider>
      <SettingsProvider>  {/* Add here */}
        {children}
      </SettingsProvider>
    </BankProvider>
  );
}
```

### 3. Use in Components
```typescript
"use client";

import { useWishlist } from "@/context/WishlistContext";

export function ProductCard({ id }: { id: string }) {
  const { addItem } = useWishlist();
  
  return (
    <button onClick={() => addItem(id)}>
      Add to Wishlist
    </button>
  );
}
```

## Best Practices

### ✅ DO
- Keep contexts focused on single responsibility
- Use route-specific providers when possible
- Add "use client" directive to context files
- Provide clear error messages in hooks
- Document which routes use which providers

### ❌ DON'T
- Add all contexts to root layout
- Create contexts for simple prop drilling (2-3 levels)
- Mix unrelated state in one context
- Forget to memoize expensive computations
- Use contexts for frequently changing values (consider Zustand)

## Performance Tips

### 1. Split Large Contexts
Instead of:
```typescript
// ❌ One big context
<ShopContext>  // cart, wishlist, filters, etc.
```

Do:
```typescript
// ✅ Separate concerns
<CartProvider>
  <WishlistProvider>
    <FilterProvider>
```

### 2. Memoize Context Values
```typescript
const value = useMemo(
  () => ({ items, addItem, removeItem }),
  [items]
);
```

### 3. Use Reducers for Complex State
```typescript
const [state, dispatch] = useReducer(cartReducer, initialState);
```

## When to Consider Zustand

Migrate from Context to Zustand when:
- You have 5+ contexts
- Performance issues with re-renders
- Need devtools for debugging
- Want simpler API
- Need computed/derived state

Example migration:
```typescript
// Before: Context
const { cart, addToCart } = useCart();

// After: Zustand
const { cart, addToCart } = useStore();
```

## Troubleshooting

### Error: "useCart must be used within CartProvider"
**Cause:** Component using context is outside provider tree

**Fix:** Check that the page is in the correct route group:
- Shop pages → `(shop)` folder
- Admin pages → `(dashboard)` folder

### Unnecessary Re-renders
**Cause:** Context value not memoized or too broad

**Fix:** 
1. Memoize context value
2. Split into smaller contexts
3. Use `React.memo()` on child components

### Bundle Size Too Large
**Cause:** All contexts loaded globally

**Fix:** Use route-specific providers (already implemented!)
