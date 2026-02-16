"use client";

import { useEffect, useState } from "react";
import { getProducts, getStrapiMedia } from "@/lib/api";
import Link from "next/link";
import { motion } from "framer-motion";

interface Product {
  id: number;
  attributes: {
    product_name: string;
    description: string;
    price_inr: number;
    image: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    product_category: string;
  };
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="mb-8 text-4xl font-bold text-gray-900">Our Products</h1>
      
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="group flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition-shadow hover:shadow-lg"
          >
            <Link href={`/products/${product.id}`} className="relative block aspect-square overflow-hidden bg-gray-100">
               {product.attributes.image?.data ? (
                  <img
                    src={getStrapiMedia(product.attributes.image.data.attributes.url)}
                    alt={product.attributes.product_name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
            </Link>
            
            <div className="flex flex-1 flex-col p-4">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                {product.attributes.product_category}
              </div>
              <h2 className="mb-2 text-lg font-bold text-gray-900 line-clamp-1">
                <Link href={`/products/${product.id}`} className="hover:text-primary">
                  {product.attributes.product_name}
                </Link>
              </h2>
              <p className="mb-4 flex-1 text-sm text-gray-600 line-clamp-2">
                {product.attributes.description}
              </p>
              
              <div className="mt-auto flex items-center justify-between border-t pt-4">
                <span className="text-xl font-bold text-gray-900">₹{product.attributes.price_inr}</span>
                <Link
                  href={`/products/${product.id}`}
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
                >
                  View Details
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
