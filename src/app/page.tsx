"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { getProducts, getStrapiMedia } from "@/lib/api";

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
  };
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchFeaturedProducts() {
      try {
        const data = await getProducts();
        // Just take first 3 for featured section
        setProducts(data.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    }
    fetchFeaturedProducts();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-background via-gray-50 to-gray-100 px-6 py-20 text-center">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl"
      >
        <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
          <Sparkles className="mr-1 h-3 w-3" /> New Collection Live
        </span>
        <h1 className="mt-6 text-5xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-7xl">
          The Future of <span className="text-primary">Learning</span> Starts Here.
        </h1>
        <p className="mt-6 text-lg text-gray-600 md:text-xl">
          Premium school supplies for the next generation of thinkers. From
          kindergarten essentials to advanced lab equipment.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center space-y-4 md:flex-row md:space-x-6 md:space-y-0">
          <Link
            href="/products"
            className="group inline-flex items-center rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-primary/90 hover:shadow-lg"
          >
            Shop All Products
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-8 py-3 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50 hover:shadow-sm"
          >
            Bulk Orders
          </Link>
        </div>
      </motion.div>

      {/* Featured Products Section */}
      <section className="mt-24 w-full max-w-6xl">
        <div className="mb-12 flex items-center justify-between border-b pb-4">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Featured Products</h2>
          <Link href="/products" className="text-sm font-medium text-primary hover:underline">
            View all &rarr;
          </Link>
        </div>
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.05 }}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-md"
            >
              <div className="aspect-video w-full bg-gray-100 object-cover group-hover:bg-gray-200">
                {product.attributes.image?.data && (
                  <img
                    src={getStrapiMedia(product.attributes.image.data.attributes.url)}
                    alt={product.attributes.product_name}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <div className="p-6 text-left">
                <h3 className="text-lg font-semibold text-gray-900">{product.attributes.product_name}</h3>
                <p className="mt-2 text-sm text-gray-500 line-clamp-2">{product.attributes.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">₹{product.attributes.price_inr}</span>
                  <Link 
                    href={`/products/${product.id}`}
                    className="rounded-full bg-gray-900 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-gray-700"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
