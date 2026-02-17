"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Beaker, Palette, Trophy, BookOpen, PenTool, GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getProducts } from "@/lib/api";
import ProductIllustration from "@/components/ProductIllustration";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

const Scene3D = dynamic(() => import("@/components/Scene3D"), { ssr: false });

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
    stock_status: string;
    target_school_level: string;
    quantity_in_set: number;
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
    stock_status: "In Stock",
    target_school_level: "Senior Secondary",
    quantity_in_set: 1,
  },
  {
    id: 2,
    product_name: "Montessori Sensory Play Set",
    description: "Handcrafted wooden sensory materials for early childhood development and tactile exploration.",
    price_inr: 2499,
    product_category: "Kindergarten",
    stock_status: "In Stock",
    target_school_level: "Pre-Primary",
    quantity_in_set: 15,
  },
  {
    id: 3,
    product_name: "Premium Watercolor Collection",
    description: "Professional-grade watercolor set with 48 vibrant pigments, brushes, and mixing palette. Ideal for art classes.",
    price_inr: 1899,
    product_category: "Art & Craft",
    stock_status: "In Stock",
    target_school_level: "All Levels",
    quantity_in_set: 1,
  },
];

const Marquee = () => (
  <div className="relative flex overflow-x-hidden bg-foreground py-4 text-background dark:bg-dark-foreground dark:text-dark-background">
    <motion.div
      className="flex whitespace-nowrap"
      animate={{ x: [0, -1000] }}
      transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
    >
      {[...Array(10)].map((_, i) => (
        <span key={i} className="mx-8 text-sm font-body font-bold uppercase tracking-widest">
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
    bgClass: "bg-indigo-50 dark:bg-indigo-950",
    gradientClass: "from-primary/20 to-secondary/20",
    accentColor: "var(--primary)",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Kindergarten",
    subtitle: "Montessori & Play",
    description: "Sensory materials and play-based learning tools for early education.",
    icon: GraduationCap,
    bgClass: "bg-yellow-50 dark:bg-yellow-950",
    gradientClass: "from-yellow-500/20 to-orange-500/20",
    accentColor: "#F59E0B",
    span: "",
  },
  {
    title: "Sports & Active",
    subtitle: "Active Gear",
    description: "Quality equipment for every sport and physical education program.",
    icon: Trophy,
    bgClass: "bg-green-50 dark:bg-green-950",
    gradientClass: "from-green-500/20 to-emerald-500/20",
    accentColor: "#10B981",
    span: "",
  },
  {
    title: "Art & Craft",
    subtitle: "Creative Studio",
    description: "Professional-grade art supplies for every creative expression.",
    icon: Palette,
    bgClass: "bg-pink-50 dark:bg-pink-950",
    gradientClass: "from-accent/20 to-rose-500/20",
    accentColor: "var(--accent)",
    span: "",
  },
  {
    title: "Stationery",
    subtitle: "Writing Essentials",
    description: "Premium pens, notebooks, and organizational tools for focused learning.",
    icon: PenTool,
    bgClass: "bg-violet-50 dark:bg-violet-950",
    gradientClass: "from-violet-500/20 to-purple-500/20",
    accentColor: "#8B5CF6",
    span: "",
  },
  {
    title: "Books & Reading",
    subtitle: "Knowledge Library",
    description: "Textbooks, reference guides, and inspiring reads for every grade.",
    icon: BookOpen,
    bgClass: "bg-red-50 dark:bg-red-950",
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
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.1 }}
      className={cn(
        "group relative overflow-hidden rounded-3xl p-8 transition-all duration-500 ease-out border",
        isDark ? "border-dark-card/20" : "border-gray-100",
        category.bgClass,
        category.span,
        "hover:shadow-3xl hover:shadow-black/20 dark:hover:shadow-white/5",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:opacity-0 before:transition-opacity before:duration-700 before:ease-out",
        `before:${category.gradientClass} hover:before:opacity-100` // Apply gradient on hover
      )}
    >
      {/* Animated geometric background (more subtle) */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, delay: index * 0.15 }}
      >
        <motion.div
          className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-5"
          style={{ backgroundColor: category.accentColor }}
          animate={{ scale: [1, 1.3, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-6 -left-6 h-32 w-32 rounded-2xl opacity-5"
          style={{ backgroundColor: category.accentColor }}
          animate={{ scale: [1, 1.2, 1], rotate: [0, -45, 0] }}
          transition={{ duration: 12, repeat: Infinity, delay: 2, ease: "linear" }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="flex items-start justify-between">
          <motion.div
            className="rounded-2xl p-3 inline-flex"
            style={{ backgroundColor: `${category.accentColor}1A` }}
            whileHover={{ rotate: 10, scale: 1.15 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <Icon
              className={cn(isLarge ? "h-8 w-8" : "h-6 w-6")}
              style={{ color: category.accentColor }}
            />
          </motion.div>
          <motion.div
            className="rounded-full px-3 py-1 text-xs font-body font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              backgroundColor: `${category.accentColor}1A`,
              color: category.accentColor,
            }}
          >
            Explore &rarr;
          </motion.div>
        </div>

        <div className="mt-auto pt-4">
          <h3 className={cn("font-display font-extrabold text-foreground leading-tight dark:text-dark-foreground", isLarge ? "text-4xl md:text-6xl" : "text-xl md:text-3xl")}>
            {category.title}
          </h3>
          <p className="mt-2 text-sm font-body text-gray-600 dark:text-gray-400">{category.subtitle}</p>

          {/* Hidden description that reveals on hover */}
          <motion.div
            className="overflow-hidden mt-3"
            initial={{ height: 0, opacity: 0 }}
            whileHover={{ height: "auto", opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <p className="text-sm font-body text-gray-600 leading-relaxed dark:text-gray-400">
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
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    async function fetchFeaturedProducts() {
      try {
        const data = await getProducts();
        if (data && data.length > 0) {
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

  const heroTextVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.1 + 0.5,
        duration: 0.8,
        ease: [0.2, 0.8, 0.2, 1], // Fixed: changed string to array for cubic-bezier
      },
    }),
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <div className="bg-background text-foreground selection:bg-primary selection:text-white font-body dark:bg-dark-background dark:text-dark-foreground">
      <Marquee />

      {/* Hero Section with 3D Background */}
      <section className="relative flex min-h-[90vh] items-center justify-center px-4 text-center overflow-hidden py-24 md:py-0">
        {/* 3D Scene Background */}
        <Scene3D />

        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/80 via-background/50 to-background/90 dark:from-dark-background/80 dark:via-dark-background/50 dark:to-dark-background/90" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="relative z-10 max-w-5xl mx-auto"
        >
          <motion.span
            variants={heroTextVariants}
            custom={0}
            className="mb-6 inline-flex items-center rounded-full border border-gray-200 bg-card/60 px-4 py-1.5 text-sm font-medium text-gray-600 backdrop-blur-md shadow-sm dark:border-dark-card/30 dark:bg-dark-card/60 dark:text-gray-400"
          >
            <Sparkles className="mr-2 h-4 w-4 text-yellow-500" />
            Next-Gen School Supplies
          </motion.span>

          <motion.h1
            className="font-display text-6xl font-black leading-[0.9] tracking-tighter sm:text-8xl md:text-[10rem] text-foreground dark:text-dark-foreground"
          >
            <motion.span variants={heroTextVariants} custom={1} className="block">
              ELEVATE
            </motion.span>
            <motion.span 
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              variants={heroTextVariants}
              custom={2}
            >
              EDUCATION.
            </motion.span>
          </motion.h1>

          <motion.p
            variants={heroTextVariants}
            custom={3}
            className="mx-auto mt-8 max-w-2xl text-lg font-body font-medium text-gray-600 md:text-xl dark:text-gray-400"
          >
            Premium tools for the next generation of thinkers, creators, and
            leaders. From Montessori essentials to advanced physics kits.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <motion.div variants={heroTextVariants} custom={4}>
              <Link
                href="/products"
                className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-foreground px-8 py-3 font-body font-bold text-background transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20 dark:bg-dark-foreground dark:text-dark-background"
              >
                <span className="relative z-10">Shop Collection</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 relative z-10" />
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Link>
            </motion.div>
            <motion.div variants={heroTextVariants} custom={5}>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-full border border-gray-300 bg-card/60 px-8 py-3 font-body font-bold text-foreground backdrop-blur-sm transition-all duration-300 hover:bg-gray-100 dark:border-dark-card/30 dark:bg-dark-card/60 dark:text-dark-foreground dark:hover:bg-dark-card"
              >
                Bulk Inquiries
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="h-10 w-6 rounded-full border-2 border-gray-400 p-1 dark:border-gray-600">
            <motion.div
              className="h-2 w-2 rounded-full bg-gray-500 mx-auto dark:bg-gray-400"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </section>

      {/* Bento Grid Categories */}
      <section className="px-4 py-24 bg-background dark:bg-dark-background">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="mb-16 text-center"
          >
            <span className="text-sm font-body font-bold uppercase tracking-widest text-primary">
              Browse Our Range
            </span>
            <h2 className="mt-2 font-display text-4xl font-extrabold tracking-tight md:text-7xl text-foreground dark:text-dark-foreground">
              Curated Categories
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-4 md:grid-rows-3 auto-rows-[200px] md:auto-rows-[220px]">
            {bentoCategories.map((category, index) => (
              <BentoCard key={category.title} category={category} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-foreground py-24 text-background dark:bg-dark-foreground dark:text-dark-background">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 flex flex-col md:flex-row items-center md:items-end justify-between text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <span className="text-sm font-body font-bold uppercase tracking-widest text-primary">
                Our Picks
              </span>
              <h2 className="mt-2 font-display text-4xl font-extrabold tracking-tight md:text-7xl text-background dark:text-dark-background">
                Trending Now
              </h2>
            </motion.div>
            <Link
              href="/products"
              className="mt-8 md:mt-0 inline-flex items-center rounded-full border border-gray-700 bg-transparent px-6 py-2 text-sm font-body font-medium text-gray-400 transition-colors hover:text-white hover:border-white/50 dark:border-dark-card/50 dark:hover:border-dark-foreground/50"
            >
              View all products <ArrowRight className="ml-2 h-4 w-4" />
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
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  whileHover={{ y: -8, scale: 1.01, boxShadow: "0 15px 30px rgba(0,0,0,0.3)" }}
                  className="group cursor-pointer rounded-2xl bg-card-foreground/5 p-6 border border-card-foreground/10 dark:bg-dark-card/5 dark:border-dark-card/10"
                >
                  <Link href={`/products/${product.id}`}>
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-card-foreground/10 mb-6 dark:bg-dark-card/10">
                      <ProductIllustration category={category} size={160} />
                      <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:opacity-0" />
                    </div>
                    <div className="mt-4">
                      <h3 className="font-display text-xl font-bold text-background dark:text-dark-background">{name}</h3>
                      <p className="mt-1 text-sm font-body text-gray-400 line-clamp-1">
                        {desc}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="font-display text-2xl font-black text-white dark:text-dark-background">
                          ₹{price.toLocaleString()}
                        </span>
                        <span className="rounded-full border border-white/20 px-3 py-1 text-xs font-body font-medium text-white transition-colors group-hover:bg-primary group-hover:border-primary dark:border-dark-card/30 dark:text-dark-background dark:group-hover:bg-primary">
                          View Item
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile view all link */}
          <div className="mt-16 text-center md:hidden">
            <Link
              href="/products"
              className="inline-flex items-center rounded-full bg-white/10 px-8 py-3 text-sm font-body font-bold text-white transition-colors hover:bg-primary dark:bg-dark-card/20 dark:hover:bg-primary"
            >
              View All Products <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-4 bg-background dark:bg-dark-background">
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
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <div className="font-display text-5xl font-black tracking-tight text-foreground md:text-7xl dark:text-dark-foreground">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm font-body font-medium text-gray-500 dark:text-gray-400">
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
