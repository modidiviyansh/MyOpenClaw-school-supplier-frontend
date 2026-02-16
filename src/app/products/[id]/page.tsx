"use client";

import { useEffect, useState } from "react";
import { getProduct, getStrapiMedia } from "@/lib/api";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, Truck, Package } from "lucide-react";
import Link from "next/link";

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
    quantity_in_set: number;
    stock_status: string;
    target_school_level: string;
  };
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchData() {
      try {
        const id = params?.id;
        if (id) {
          const data = await getProduct(id as string);
          setProduct(data);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [params?.id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleCheckout = () => {
    // Query-Based Order Logic
    // Redirect to checkout with params
    router.push(`/checkout?product=${product.id}&name=${encodeURIComponent(product.attributes.product_name)}&price=${product.attributes.price_inr}&qty=${quantity}`);
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <Link href="/products" className="mb-8 inline-flex items-center text-sm font-medium text-gray-500 hover:text-primary">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
      </Link>
      
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Product Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl bg-gray-100"
        >
          {product.attributes.image?.data ? (
            <img
              src={getStrapiMedia(product.attributes.image.data.attributes.url)}
              alt={product.attributes.product_name}
              className="h-full w-full object-cover"
            />
          ) : (
             <div className="flex h-96 w-full items-center justify-center text-gray-400">
                No Image
             </div>
          )}
        </motion.div>
        
        {/* Product Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-center"
        >
          <div className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary">
            {product.attributes.product_category}
          </div>
          <h1 className="mb-4 text-4xl font-extrabold text-gray-900">{product.attributes.product_name}</h1>
          <p className="mb-6 text-lg text-gray-600">{product.attributes.description}</p>
          
          <div className="mb-8 flex items-center space-x-4">
            <span className="text-3xl font-bold text-gray-900">₹{product.attributes.price_inr}</span>
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
              {product.attributes.stock_status}
            </span>
          </div>
          
          <div className="mb-8 space-y-3 rounded-xl bg-gray-50 p-6">
             <div className="flex items-center text-sm text-gray-700">
               <Package className="mr-3 h-5 w-5 text-gray-400" />
               <span>Pack Quantity: {product.attributes.quantity_in_set} units</span>
             </div>
             <div className="flex items-center text-sm text-gray-700">
               <CheckCircle className="mr-3 h-5 w-5 text-gray-400" />
               <span>Target Level: {product.attributes.target_school_level}</span>
             </div>
             <div className="flex items-center text-sm text-gray-700">
               <Truck className="mr-3 h-5 w-5 text-gray-400" />
               <span>Free shipping on bulk orders</span>
             </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center rounded-lg border border-gray-300">
              <button
                className="px-4 py-2 hover:bg-gray-100"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-16 border-none bg-transparent text-center focus:ring-0"
              />
              <button
                className="px-4 py-2 hover:bg-gray-100"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            
            <button
              onClick={handleCheckout}
              className="flex-1 rounded-lg bg-primary px-8 py-3 text-base font-bold text-white shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl active:scale-95"
            >
              Buy Now
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
