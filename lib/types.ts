// lib/types.ts
export interface Product {
  id: string;               // make it required
  slug: string;
  name: string;
  description?: string;
  price: number;
  category?: string;
  inventory?: number;
  lastUpdated?: string;
  image?: string;
  quantity?: number;
}
