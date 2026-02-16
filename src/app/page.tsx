"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Beaker, Palette, Trophy, BookOpen, PenTool, GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getProducts } from "@/lib/api";
import ProductIllustration from "@/components/ProductIllustration";

const Scene3D = dynamic(() => import("@/components/Scene3D"), { ssr: false });

interface Product {
  id: number;
  product_name?: string;
  description?: string;
  price_inr?: number;
  product_category?: string;
  attributes?: {
    product_name: string;
    description: string;
    price_inr: number;
    product_category: string;
    image?: {
      data?: {
        attributes?: {
          url: string;
        };
      };
    };
  };
}

// Sample fallback products when Strapi is empty
const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 1,
    product_name: "Advanced Physics Lab Kit",
    description: "Complete physics lab setup with precision instruments for advanced experiments. Ideal for senior secondary schools.",
    price_inr: 4999,
    product_category: "Science & Tech",
  },
  {
    id: 2,
    product_name: "Montessori Sensory Play Set",
    description: "Handcrafted wooden sensory materials for early childhood development and tactile exploration.",
    price_inr: 2499,
    product_category: "Kindergarten",
  },
  {
    id: 3,
    product_name: "Premium Watercolor Collection",
    description: "Professional-grade watercolor set with 48 vibrant pigments, brushes, and mixing palette.",
    price_inr: 1899,
    product_category: "Art & Craft",
  },
];

const Marquee = () => (
  <div className="relative flex overflow-x-hidden bg-black py-4 text-white">
    <motion.div
      className="flex whitespace-nowrap"
      animate={{ x: [0, -1000] }}
      transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
    >
      {[...Array(10)].map((_, i) => (
        <span key={i} className="mx-8 text-sm font-bold uppercase tracking-widest">
          The Future of Learning • Premium Supplies • Fast Shipping • Bulk Discounts •{" "}
        </span>
      ))}
    </motion.div>
  </div>
);

// Bento grid category data with animated illustrations
const bentoCategories = [
  {
    title: "Science & Tech",
    subtitle: "Advanced lab equipment for modern learning",
    description: "From physics kits to chemistry sets — everything for hands-on STEM education.",
    icon: Beaker,
    bgClass: "bg-indigo-50",
    gradientClass: "from-indigo-500/20 to-purple-500/20",
    accentColor: "#4F46E5",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Kindergarten",
    subtitle: "Montessori & Play",
    description: "Sensory materials and play-based learning tools for early education.",
    icon: GraduationCap,
    bgClass: "bg-amber-50",
    gradientClass: "from-amber-500/20 to-orange-500/20",
    accentColor: "#F59E0B",
    span: "",
  },
  {
    title: "Sports & Active",
    subtitle: "Active Gear",
    description: "Quality equipment for every sport and physical education program.",
    icon: Trophy,
    bgClass: "bg-emerald-50",
    gradientClass: "from-emerald-500/20 to-teal-500/20",
    accentColor: "#10B981",
    span: "",
  },
  {
    title: "Art & Craft",
    subtitle: "Creative Studio",
    description: "Professional-grade art supplies for every creative expression.",
    icon: Palette,
    bgClass: "bg-pink-50",
    gradientClass: "from-pink-500/20 to-rose-500/20",
    accentColor: "#EC4899",
    span: "",
  },
  {
    title: "Stationery",
    subtitle: "Writing Essentials",
    description: "Premium pens, notebooks, and organizational tools for focused learning.",
    icon: PenTool,
    bgClass: "bg-violet-50",
    gradientClass: "from-violet-500/20 to-purple-500/20",
    accentColor: "#8B5CF6",
    span: "",
  },
  {
    title: "Books & Reading",
    subtitle: "Knowledge Library",
    description: "Textbooks, reference guides, and inspiring reads for every grade.",
    icon: BookOpen,
    bgClass: "bg-red-50",
    gradientClass: "from-red-500/20 to-orange-500/20",
    accentColor: "#EF4444",
    span: "",
  },
];

function BentoCard({
  category,
  index,
}: {
  category: (typeof bentoCategories)[0];
  index: number;
}) {
  const Icon = category.icon;
  const isLarge = index === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 0.98 }}
      className={`group relative overflow-hidden rounded-3xl ${category.bgClass} ${category.span} cursor-pointer`}
    >
      {/* Gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${category.gradientClass} transition-opacity duration-500 group-hover:opacity-100 opacity-50`} />

      {/* Animated geometric background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-10"
          style={{ backgroundColor: category.accentColor }}
          animate={{ scale: [1, 1.3, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-4 -left-4 h-24 w-24 rounded-2xl opacity-10"
          style={{ backgroundColor: category.accentColor }}
          animate={{ scale: [1, 1.2, 1], rotate: [0, -45, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: 1 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between p-8">
        <div className="flex items-start justify-between">
          <motion.div
            className="rounded-2xl p-3"
            style={{ backgroundColor: `${category.accentColor}15` }}
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Icon
              className={isLarge ? "h-8 w-8" : "h-6 w-6"}
              style={{ color: category.accentColor }}
            />
          </motion.div>
          <motion.div
            className="rounded-full px-3 py-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              backgroundColor: `${category.accentColor}15`,
              color: category.accentColor,
            }}
          >
            Explore →
          </motion.div>
        </div>

        <div className="mt-auto">
          <h3 className={`font-bold ${isLarge ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"}`}>
            {category.title}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{category.subtitle}</p>

          {/* Hidden description that reveals on hover */}
          <motion.div
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            whileHover={{ height: "auto", opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="mt-3 text-sm text-gray-600 leading-relaxed">
              {category.description}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Hover border glow */}
      <div
        className="absolute inset-0 rounded-3xl border-2 border-transparent transition-colors duration-300 group-hover:border-current opacity-20"
        style={{ color: category.accentColor }}
      />
    </motion.div>
  );
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchFeaturedProducts() {
      try {
        const data = await getProducts();
        if (data && data.length > 0) {
          // Normalize data shape (Strapi v4 vs v5)
          const normalized = data.slice(0, 3).map((p: Record<string, unknown>) => {
            if (p.attributes) return p;
            return {
              id: p.id,
              product_name: p.product_name,
              description: p.description,
              price_inr: p.price_inr,
              product_category: p.product_category,
            };
          });
          setProducts(normalized);
        } else {
          setProducts(SAMPLE_PRODUCTS);
        }
      } catch {
        setProducts(SAMPLE_PRODUCTS);
      }
    }
    fetchFeaturedProducts();
  }, []);

  const getProductField = (product: Product, field: string): string | number => {
    if (product.attributes) {
      return (product.attributes as unknown as Record<string, unknown>)[field] as string | number;
    }
    return (product as unknown as Record<string, unknown>)[field] as string | number;
  };

  return (
    <div className="min-h-screen bg-white text-black selection:bg-primary selection:text-white">
      <Marquee />

      {/* Hero Section with 3D Background */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-6 text-center overflow-hidden">
        {/* 3D Scene Background */}
        <Scene3D />

        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 -z-[5] bg-gradient-to-b from-white/60 via-white/30 to-white/80" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 max-w-5xl"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-6 inline-flex items-center rounded-full border border-black/5 bg-white/70 px-4 py-1.5 text-sm font-medium backdrop-blur-md"
          >
            <Sparkles className="mr-2 h-4 w-4 text-yellow-500" />
            Next-Gen School Supplies
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-6xl font-black leading-[0.9] tracking-tighter sm:text-8xl md:text-9xl"
          >
            ELEVATE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
              EDUCATION.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mx-auto mt-8 max-w-2xl text-lg font-medium text-gray-600 md:text-xl"
          >
            Premium tools for the next generation of thinkers, creators, and
            leaders. From Montessori essentials to advanced physics kits.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/products"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-black px-8 py-4 font-bold text-white transition-all hover:scale-105 hover:shadow-2xl"
            >
              <span className="mr-2">Shop Collection</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border-2 border-black/10 bg-white/60 px-8 py-4 font-bold text-black backdrop-blur-sm transition-all hover:bg-black/5"
            >
              Bulk Inquiries
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="h-10 w-6 rounded-full border-2 border-black/20 p-1">
            <motion.div
              className="h-2 w-2 rounded-full bg-black/30 mx-auto"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Bento Grid Categories */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="text-sm font-bold uppercase tracking-widest text-primary">
              Browse
            </span>
            <h2 className="mt-2 text-4xl font-bold tracking-tight md:text-6xl">
              Curated Categories
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-3 auto-rows-[180px] md:auto-rows-[200px]">
            {bentoCategories.map((category, index) => (
              <BentoCard key={category.title} category={category} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-black py-24 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 flex items-end justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-sm font-bold uppercase tracking-widest text-indigo-400">
                Featured
              </span>
              <h2 className="mt-2 text-4xl font-bold tracking-tight md:text-6xl">
                Trending Now
              </h2>
            </motion.div>
            <Link
              href="/products"
              className="hidden text-sm font-medium text-gray-400 hover:text-white transition-colors md:block"
            >
              View all products &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => {
              const name = (getProductField(product, "product_name") as string) || "Product";
              const desc = (getProductField(product, "description") as string) || "";
              const price = (getProductField(product, "price_inr") as number) || 0;
              const category = (getProductField(product, "product_category") as string) || "default";

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  whileHover={{ y: -10 }}
                  className="group cursor-pointer"
                >
                  <Link href={`/products/${product.id}`}>
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gray-900">
                      <ProductIllustration category={category} size={160} />
                      <div className="absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:opacity-0" />
                    </div>
                    <div className="mt-6">
                      <h3 className="text-lg font-bold">{name}</h3>
                      <p className="mt-1 text-sm text-gray-400 line-clamp-1">
                        {desc}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-xl font-bold">
                          ₹{price.toLocaleString()}
                        </span>
                        <span className="rounded-full border border-white/20 px-3 py-1 text-xs font-medium transition-colors group-hover:bg-white group-hover:text-black">
                          Buy Now
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile view all link */}
          <div className="mt-12 text-center md:hidden">
            <Link
              href="/products"
              className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white hover:text-black"
            >
              View All Products <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { value: "500+", label: "Products" },
              { value: "1,200+", label: "Schools Served" },
              { value: "98%", label: "Satisfaction" },
              { value: "24h", label: "Delivery" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-black tracking-tight md:text-5xl">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm font-medium text-gray-500">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
