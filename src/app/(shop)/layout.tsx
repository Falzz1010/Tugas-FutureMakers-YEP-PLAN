import { ShopProviders } from "@/components/ShopProviders";

/**
 * Shop layout - wraps customer-facing pages with Cart + Order providers
 * Routes: /, /product/[id], /checkout, /payment, /order-status
 */
export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ShopProviders>{children}</ShopProviders>;
}
