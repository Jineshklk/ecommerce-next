import type { NextApiRequest, NextApiResponse } from "next";
import { getProductById } from "../../../lib/products";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  // Ensure id is a string (Next.js can give string | string[])
  if (typeof id !== "string") {
    return res.status(400).json({ error: "Invalid product ID" });
  }

  const product = getProductById(id);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  return res.status(200).json(product);
}
