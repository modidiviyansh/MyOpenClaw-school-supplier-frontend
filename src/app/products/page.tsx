"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/lib/api";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import ProductIllustration from "@/components/ProductIllustration";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

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

// Comprehensive fallback product catalog
const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 1,
    product_name: "Advanced Physics Lab Kit",
    description: "Complete physics lab setup with precision instruments for mechanics, optics, and electromagnetism experiments. Includes detailed experiment guides.",
    price_inr: 4999,
    product_category: "Science & Tech",
    stock_status: "In Stock",
    target_school_level: "Senior Secondary",
    quantity_in_set: 1,
  },
  {
    id: 2,
    product_name: "Montessori Sensory Play Set",
    description: "Handcrafted wooden sensory materials for early childhood development. Includes texture boards, color tablets, and geometric solids.",
    price_inr: 2499,
    product_category: "Kindergarten",
    stock_status: "In Stock",
    target_school_level: "Pre-Primary",
    quantity_in_set: 15,
  },
  {
    id: 3,
    product_name: "Premium Watercolor Collection",
    description: "Professional-grade watercolor set with 48 vibrant pigments, sable brushes, and mixing palette. Ideal for art classes.",
    price_inr: 1899,
    product_category: "Art & Craft",
    stock_status: "In Stock",
    target_school_level: "All Levels",
    quantity_in_set: 1,
  },
  {
    id: 4,
    product_name: "Championship Football Kit",
    description: "FIFA-grade match football with training cones, pump, and carry bag. Durable construction for daily training sessions.",
    price_inr: 1299,
    product_category: "Sports",
    stock_status: "In Stock",
    target_school_level: "All Levels",
    quantity_in_set: 5,
  },
  {
    id: 5,
    product_name: "Executive Stationery Bundle",
    description: "Premium fountain pen, ruled notebooks (200 pages each), geometric instruments, and organizational accessories.",
    price_inr: 899,
    product_category: "Stationery",
    stock_status: "In Stock",
    target_school_level: "Secondary",
    quantity_in_set: 10,
  },
  {
    id: 6,
    product_name: "Chemistry Lab Starter Pack",
    description: "Essential chemistry apparatus including beakers, flasks, burettes, and safety equipment. Perfect for school labs.",
    price_inr: 6499,
    product_category: "Science & Tech",
    stock_status: "In Stock",
    target_school_level: "Senior Secondary",
    quantity_in_set: 1,
  },
  {
    id: 7,
    product_name: "NCERT Reference Library Set",
    description: "Complete NCERT reference collection for classes 9-12 covering Physics, Chemistry, Biology, and Mathematics.",
    price_inr: 3499,
    product_category: "Books",
    stock_status: "In Stock",
    target_school_level: "Secondary",
    quantity_in_set: 12,
  },
  {
    id: 8,
    product_name: "Digital Art Tablet for Schools",
    description: "Pressure-sensitive drawing tablet with stylus pen. Compatible with all major design software. Perfect for digital art classes.",
    price_inr: 7999,
    product_category: "Art & Craft",
    stock_status: "Limited Stock",
    target_school_level: "Senior Secondary",
    quantity_in_set: 1,
  },
  {
    id: 9,
    product_name: "Alphabet & Numbers Learning Kit",
    description: "Magnetic letters, number blocks, and activity cards for foundational literacy and numeracy development.",
    price_inr: 1599,
    product_category: "Kindergarten",
    stock_status: "In Stock",
    target_school_level: "Pre-Primary",
    quantity_in_set: 50,
  },
  {
    id: 10,
    product_name: "Badminton Pro Training Set",
    description: "Professional badminton rackets (pair), feather shuttlecocks (box of 12), and portable net with carrying case.",
    price_inr: 2199,
    product_category: "Sports",
    stock_status: "In Stock",
    target_school_level: "All Levels",
    quantity_in_set: 1,
  },
  {
    id: 11,
    product_name: "Robotics Starter Kit",
    description: "Arduino-based robotics kit with sensors, motors, breadboard, and step-by-step project guide. Learn electronics hands-on.",
    price_inr: 5499,
    product_category: "Science & Tech",
    stock_status: "In Stock",
    target_school_level: "Senior Secondary",
    quantity_in_set: 1,
  },
  {
    id: 12,
    product_name: "Calligraphy Master Set",
    description: "Traditional and modern calligraphy pens with ink sets, practice sheets, and instructional booklet for beautiful handwriting.",
    price_inr: 1199,
    product_category: "Stationery",
    stock_status: "In Stock",
    target_school_level: "All Levels",
    quantity_in_set: 1,
  },
];

const CATEGORIES = [
  "All",
  "Science & Tech",
  "Kindergarten",
  "Art & Craft",
  "Sports",
  "Stationery",
  "Books",
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"name" | "price-asc" | "price-desc">("name");
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProducts();
        if (data && data.length > 0) {
          setProducts(data);
        } else {
          setProducts(SAMPLE_PRODUCTS);
        }
      } catch {
        setProducts(SAMPLE_PRODUCTS);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const getField = (product: Product, field: string): string | number => {
    if (product.attributes) {
      return (product.attributes as unknown as Record<string, unknown>)[field] as string | number;
    }
    return (product as unknown as Record<string, unknown>)[field] as string | number;
  };

  // Filter and sort
  const filteredProducts = products
    .filter((p) => {
      const name = ((getField(p, "product_name") as string) || "").toLowerCase();
      const desc = ((getField(p, "description") as string) || "").toLowerCase();
      const category = (getField(p, "product_category") as string) || "";
      const matchesSearch =
        name.includes(searchQuery.toLowerCase()) ||
        desc.includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      const nameA = (getField(a, "product_name") as string) || "";
      const nameB = (getField(b, "product_name") as string) || "";
      const priceA = (getField(a, "price_inr") as number) || 0;
      const priceB = (getField(b, "price_inr") as number) || 0;

      switch (sortBy) {
        case "price-asc":
          return priceA - priceB;
        case "price-desc":
          return priceB - priceA;
        default:
          return nameA.localeCompare(nameB);
      }
    });

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background dark:bg-dark-background">
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-primary dark:border-dark-card/50 dark:border-t-primary" />
          <p className="font-body text-sm font-medium text-gray-400 dark:text-gray-500">Loading products...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-body text-foreground dark:bg-dark-background dark:text-dark-foreground">
      {/* Hero banner */}
      <div className="bg-foreground px-4 py-16 text-background dark:bg-dark-foreground dark:text-dark-background">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-body font-bold uppercase tracking-widest text-primary">
              Collection
            </span>
            <h1 className="mt-2 font-display text-5xl font-black tracking-tight md:text-7xl">
              Our Products
            </h1>
            <p className="mt-4 max-w-xl text-lg font-body text-gray-400">
              Premium school supplies curated for excellence. From science labs to art studios.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12 space-y-6"
        >
          {/* Search bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-gray-200 bg-card px-4 py-3 pl-11 pr-4 text-sm font-body font-medium text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-dark-card/30 dark:bg-dark-card dark:text-dark-foreground"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Category pills */}
            <SlidersHorizontal className="h-4 w-4 text-gray-400" />
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-body font-bold uppercase tracking-wider transition-all",
                  selectedCategory === cat
                    ? "bg-foreground text-background shadow-lg hover:bg-primary dark:bg-dark-foreground dark:text-dark-background"
                    : "bg-card text-gray-600 hover:bg-gray-100 dark:bg-dark-card dark:text-gray-400 dark:hover:bg-dark-card/70"
                )}
              >
                {cat}
              </button>
            ))}

            {/* Sort */}
            <div className="ml-auto flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="rounded-lg border border-gray-200 bg-card px-3 py-2 text-xs font-body font-medium text-foreground focus:border-primary focus:outline-none focus:ring-primary/20 dark:border-dark-card/30 dark:bg-dark-card dark:text-dark-foreground"
              >
                <option value="name">Name A-Z</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Results count */}
        <p className="mb-6 text-sm font-body text-gray-500 dark:text-gray-400">
          Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
        </p>

        {/* Product grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => {
              const name = (getField(product, "product_name") as string) || "Product";
              const desc = (getField(product, "description") as string) || "";
              const price = (getField(product, "price_inr") as number) || 0;
              const category = (getField(product, "product_category") as string) || "default";
              const stock = (getField(product, "stock_status") as string) || "In Stock";

              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ y: -5, boxShadow: isDark ? "0 10px 20px rgba(255,255,255,0.05)" : "0 10px 20px rgba(0,0,0,0.1)", scale: 1.01 }}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-card shadow-sm transition-all duration-300 hover:border-primary/20 dark:border-dark-card/20 dark:bg-dark-card"
                >
                  <Link
                    href={`/products/${product.id}`}
                    className="relative block aspect-square overflow-hidden"
                  >
                    <ProductIllustration category={category} size={140} />

                    {/* Stock badge */}
                    <div className="absolute top-3 right-3">
                      <span
                        className={cn(
                          "rounded-full px-2 py-1 text-[10px] font-body font-bold uppercase tracking-wider",
                          stock === "In Stock"
                            ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                            : "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300"
                        )}
                      >
                        {stock}
                      </span>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/5 dark:group-hover:bg-white/5">
                      <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        className="rounded-full bg-foreground px-4 py-2 text-xs font-body font-bold text-background opacity-0 transition-opacity duration-300 hover:bg-primary dark:bg-dark-foreground dark:text-dark-background"
                      >
                        View Details
                      </motion.span>
                    </div>
                  </Link>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-2 text-[10px] font-body font-bold uppercase tracking-widest text-primary">
                      {category}
                    </div>
                    <h2 className="mb-2 font-display text-lg font-bold text-foreground line-clamp-1 dark:text-dark-foreground">
                      <Link
                        href={`/products/${product.id}`}
                        className="transition-colors hover:text-primary"
                      >
                        {name}
                      </Link>
                    </h2>
                    <p className="mb-4 flex-1 text-sm font-body text-gray-500 line-clamp-2 leading-relaxed dark:text-gray-400">
                      {desc}
                    </p>

                    <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4 dark:border-dark-card/20">
                      <span className="font-display text-2xl font-black text-foreground dark:text-dark-foreground">
                        ₹{price.toLocaleString()}
                      </span>
                      <Link
                        href={`/products/${product.id}`}
                        className="rounded-full bg-foreground px-4 py-2 text-xs font-body font-bold text-background transition-all hover:bg-primary hover:shadow-lg active:scale-95 dark:bg-dark-foreground dark:text-dark-background"
                      >
                        Buy Now
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="mb-4 text-6xl text-gray-400">🔍</div>
            <h3 className="font-display text-xl font-bold text-foreground dark:text-dark-foreground">No products found</h3>
            <p className="mt-2 text-sm font-body text-gray-500 dark:text-gray-400">
              Try adjusting your search or filter criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-6 rounded-full bg-foreground px-6 py-2 text-sm font-body font-bold text-background transition-colors hover:bg-primary dark:bg-dark-foreground dark:text-dark-background"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
