"use client";

import { useEffect, useState } from "react";
import { getProduct } from "@/lib/api";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, Truck, Package, Shield, Star } from "lucide-react";
import Link from "next/link";
import ProductIllustration from "@/components/ProductIllustration";

interface Product {
  id: number;
  product_name?: string;
  description?: string;
  price_inr?: number;
  product_category?: string;
  stock_status?: string;
  target_school_level?: string;
  quantity_in_set?: number;
  attributes?: {
    product_name: string;
    description: string;
    price_inr: number;
    product_category: string;
    quantity_in_set: number;
    stock_status: string;
    target_school_level: string;
    image?: {
      data?: {
        attributes?: {
          url: string;
        };
      };
    };
  };
}

// Fallback product details
const FALLBACK_PRODUCTS: Record<number, Product> = {
  1: {
    id: 1,
    product_name: "Advanced Physics Lab Kit",
    description: "Complete physics lab setup with precision instruments for mechanics, optics, and electromagnetism experiments. Includes detailed experiment guides.",
    price_inr: 4999,
    product_category: "Science & Tech",
    stock_status: "In Stock",
    target_school_level: "Senior Secondary",
    quantity_in_set: 1,
  },
  2: {
    id: 2,
    product_name: "Montessori Sensory Play Set",
    description: "Handcrafted wooden sensory materials for early childhood development. Includes texture boards, color tablets, and geometric solids.",
    price_inr: 2499,
    product_category: "Kindergarten",
    stock_status: "In Stock",
    target_school_level: "Pre-Primary",
    quantity_in_set: 15,
  },
  3: {
    id: 3,
    product_name: "Premium Watercolor Collection",
    description: "Professional-grade watercolor set with 48 vibrant pigments, sable brushes, and mixing palette. Ideal for art classes.",
    price_inr: 1899,
    product_category: "Art & Craft",
    stock_status: "In Stock",
    target_school_level: "All Levels",
    quantity_in_set: 1,
  },
  4: {
    id: 4,
    product_name: "Championship Football Kit",
    description: "FIFA-grade match football with training cones, pump, and carry bag. Durable construction for daily training sessions.",
    price_inr: 1299,
    product_category: "Sports",
    stock_status: "In Stock",
    target_school_level: "All Levels",
    quantity_in_set: 5,
  },
  5: {
    id: 5,
    product_name: "Executive Stationery Bundle",
    description: "Premium fountain pen, ruled notebooks (200 pages each), geometric instruments, and organizational accessories.",
    price_inr: 899,
    product_category: "Stationery",
    stock_status: "In Stock",
    target_school_level: "Secondary",
    quantity_in_set: 10,
  },
  6: {
    id: 6,
    product_name: "Chemistry Lab Starter Pack",
    description: "Essential chemistry apparatus including beakers, flasks, burettes, and safety equipment. Perfect for school labs.",
    price_inr: 6499,
    product_category: "Science & Tech",
    stock_status: "In Stock",
    target_school_level: "Senior Secondary",
    quantity_in_set: 1,
  },
  7: {
    id: 7,
    product_name: "NCERT Reference Library Set",
    description: "Complete NCERT reference collection for classes 9-12 covering Physics, Chemistry, Biology, and Mathematics.",
    price_inr: 3499,
    product_category: "Books",
    stock_status: "In Stock",
    target_school_level: "Secondary",
    quantity_in_set: 12,
  },
  8: {
    id: 8,
    product_name: "Digital Art Tablet for Schools",
    description: "Pressure-sensitive drawing tablet with stylus pen. Compatible with all major design software. Perfect for digital art classes.",
    price_inr: 7999,
    product_category: "Art & Craft",
    stock_status: "Limited Stock",
    target_school_level: "Senior Secondary",
    quantity_in_set: 1,
  },
  9: {
    id: 9,
    product_name: "Alphabet & Numbers Learning Kit",
    description: "Magnetic letters, number blocks, and activity cards for foundational literacy and numeracy development.",
    price_inr: 1599,
    product_category: "Kindergarten",
    stock_status: "In Stock",
    target_school_level: "Pre-Primary",
    quantity_in_set: 50,
  },
  10: {
    id: 10,
    product_name: "Badminton Pro Training Set",
    description: "Professional badminton rackets (pair), feather shuttlecocks (box of 12), and portable net with carrying case.",
    price_inr: 2199,
    product_category: "Sports",
    stock_status: "In Stock",
    target_school_level: "All Levels",
    quantity_in_set: 1,
  },
  11: {
    id: 11,
    product_name: "Robotics Starter Kit",
    description: "Arduino-based robotics kit with sensors, motors, breadboard, and step-by-step project guide. Learn electronics hands-on.",
    price_inr: 5499,
    product_category: "Science & Tech",
    stock_status: "In Stock",
    target_school_level: "Senior Secondary",
    quantity_in_set: 1,
  },
  12: {
    id: 12,
    product_name: "Calligraphy Master Set",
    description: "Traditional and modern calligraphy pens with ink sets, practice sheets, and instructional booklet for beautiful handwriting.",
    price_inr: 1199,
    product_category: "Stationery",
    stock_status: "In Stock",
    target_school_level: "All Levels",
    quantity_in_set: 1,
  },
};

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
          if (data) {
            setProduct(data);
          } else {
            // Use fallback
            const fallback = FALLBACK_PRODUCTS[parseInt(id as string)];
            if (fallback) setProduct(fallback);
          }
        }
      } catch {
        // Use fallback
        const id = params?.id;
        if (id) {
          const fallback = FALLBACK_PRODUCTS[parseInt(id as string)];
          if (fallback) setProduct(fallback);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [params?.id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-primary" />
          <p className="text-sm font-medium text-gray-400">Loading product...</p>
        </motion.div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white">
        <div className="text-6xl mb-4">📦</div>
        <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
        <p className="mt-2 text-gray-500">This product doesn&apos;t exist or has been removed.</p>
        <Link
          href="/products"
          className="mt-6 rounded-full bg-black px-6 py-3 text-sm font-bold text-white hover:bg-primary transition-colors"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  const getField = (field: string): string | number => {
    if (product.attributes) {
      return (product.attributes as unknown as Record<string, unknown>)[field] as string | number;
    }
    return (product as unknown as Record<string, unknown>)[field] as string | number;
  };

  const name = (getField("product_name") as string) || "Product";
  const desc = (getField("description") as string) || "";
  const price = (getField("price_inr") as number) || 0;
  const category = (getField("product_category") as string) || "default";
  const stock = (getField("stock_status") as string) || "In Stock";
  const level = (getField("target_school_level") as string) || "All Levels";
  const qtyInSet = (getField("quantity_in_set") as number) || 1;

  const handleCheckout = () => {
    router.push(
      `/checkout?product=${product.id}&name=${encodeURIComponent(name)}&price=${price}&qty=${quantity}`
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link
            href="/products"
            className="mb-8 inline-flex items-center rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
          </Link>
        </motion.div>

        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Product Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative aspect-square overflow-hidden rounded-3xl border border-gray-100"
          >
            <ProductIllustration category={category} size={240} />
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <div className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">
              {category}
            </div>
            <h1 className="mb-4 text-4xl font-black tracking-tight text-gray-900 md:text-5xl">
              {name}
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-gray-500">{desc}</p>

            <div className="mb-8 flex items-center gap-4">
              <span className="text-4xl font-black text-gray-900">
                ₹{price.toLocaleString()}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                  stock === "In Stock"
                    ? "bg-green-100 text-green-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {stock}
              </span>
            </div>

            {/* Info cards */}
            <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-4">
                <Package className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="text-xs text-gray-400">Pack Size</div>
                  <div className="text-sm font-bold text-gray-900">{qtyInSet} units</div>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-4">
                <Star className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="text-xs text-gray-400">Level</div>
                  <div className="text-sm font-bold text-gray-900">{level}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-4">
                <Truck className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="text-xs text-gray-400">Shipping</div>
                  <div className="text-sm font-bold text-gray-900">Free</div>
                </div>
              </div>
            </div>

            {/* Trust badges */}
            <div className="mb-8 flex flex-wrap gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <CheckCircle className="h-3.5 w-3.5 text-green-500" /> Quality Assured
              </span>
              <span className="flex items-center gap-1">
                <Shield className="h-3.5 w-3.5 text-blue-500" /> Secure Payment
              </span>
              <span className="flex items-center gap-1">
                <Truck className="h-3.5 w-3.5 text-purple-500" /> Fast Delivery
              </span>
            </div>

            {/* Quantity + Buy */}
            <div className="flex items-center gap-4">
              <div className="flex items-center overflow-hidden rounded-full border border-gray-200 bg-gray-50">
                <button
                  className="px-5 py-3 text-lg font-bold transition-colors hover:bg-gray-100"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  −
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-14 border-none bg-transparent text-center text-lg font-bold focus:ring-0 focus:outline-none"
                />
                <button
                  className="px-5 py-3 text-lg font-bold transition-colors hover:bg-gray-100"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCheckout}
                className="flex-1 rounded-full bg-black px-8 py-4 text-base font-bold text-white shadow-xl transition-all hover:bg-primary hover:shadow-2xl"
              >
                Buy Now — ₹{(price * quantity).toLocaleString()}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
