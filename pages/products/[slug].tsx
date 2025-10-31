// pages/products/[slug].tsx
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useCart } from "../../context/CartContext";
import { getAllProducts, getProductBySlug } from "../../lib/products";
import type { Product } from "../../lib/types";
import Image from "next/image";

interface Props {
  product: Product;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const products = getAllProducts();
  const paths = products.map((p) => ({
    params: { slug: p.slug },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string;
  const product = getProductBySlug(slug);

  if (!product) {
    return { notFound: true };
  }

  // Ensure image has a valid value
  if (!product.image) {
    product.image = "/images/default.png";
  }

  return {
    props: { product },
    revalidate: 60,
  };
};

export default function ProductDetail({ product }: Props) {
  const router = useRouter();
  const { addToCart } = useCart();

  if (router.isFallback) return <div>Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid md:grid-cols-2 gap-8">
      {/* Main Product Info */}
      <div>
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

        <div className="mb-4">
          <img
            src={product.image}   // Use image path directly
            alt={product.name}
            width={400}
            height={400}
            className="rounded-lg object-cover"
          />
        </div>

        <p className="mb-4 text-gray-700">{product.description}</p>
        <p className="font-semibold mb-2">Price: ₹{product.price}</p>
        <p className="mb-4">Stock: {product.inventory ?? 0}</p>

        <button
          onClick={() => addToCart(product, 1)}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded transition-colors"
        >
          Add to Cart
        </button>
      </div>

      {/* Sidebar / Quick Info */}
      <aside className="border border-gray-200 rounded-lg p-4 bg-white h-fit">
        <h3 className="font-semibold mb-2">Quick Info</h3>
        <p>Category: {product.category ?? "—"}</p>
        <p>Last Updated: {product.lastUpdated ?? "—"}</p>
        <p>Inventory: {product.inventory ?? 0}</p>
      </aside>
    </div>
  );
}
