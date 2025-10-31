import type { NextApiRequest, NextApiResponse } from "next";
import { getAllProducts, addProduct } from "../../../lib/products";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const products = getAllProducts();
    return res.status(200).json(products);
  }

  if (req.method === "POST") {
    const key = req.headers["x-admin-key"];

    if (key !== "secret") {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const newProduct = req.body;

    // Optional: validate newProduct has required fields
    if (!newProduct || !newProduct.name || !newProduct.price) {
      return res.status(400).json({ error: "Invalid product data" });
    }

    const created = addProduct(newProduct);
    return res.status(201).json(created);
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
