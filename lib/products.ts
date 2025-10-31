// lib/products.ts
import fs from "fs";
import path from "path";
import type { Product } from "./types";

const DATA_PATH = path.join(process.cwd(), "data", "products.json");

export function getAllProducts(): Product[] {
  const json = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(json) as Product[];
}

export function getProductById(id: string): Product | undefined {
  const products = getAllProducts();
  return products.find((p) => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  const products = getAllProducts();
  return products.find((p) => p.slug === slug);
}

export function addProduct(newProduct: Partial<Product> & { id: string; name: string; price: number; slug: string }): Product {
  const products = getAllProducts();
  const product: Product = {
    ...newProduct,
    inventory: newProduct.inventory ?? 0,
    description: newProduct.description ?? "",
    category: newProduct.category ?? "",
    lastUpdated: new Date().toISOString(),
    image: newProduct.image ?? "",
    quantity: newProduct.quantity ?? 0,
  } as Product;

  products.push(product);
  fs.writeFileSync(DATA_PATH, JSON.stringify(products, null, 2));
  return product;
}

export function updateProduct(id: string, updates: Partial<Product>): Product | null {
  const products = getAllProducts();
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  const updated = { ...products[idx], ...updates, lastUpdated: new Date().toISOString() };
  products[idx] = updated;
  fs.writeFileSync(DATA_PATH, JSON.stringify(products, null, 2));
  return updated;
}
