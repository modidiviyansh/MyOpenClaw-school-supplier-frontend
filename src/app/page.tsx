"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Beaker, Palette, Trophy, BookOpen, PenTool, GraduationCap, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getProducts } from "@/lib/api";
import ProductIllustration from "@/components/ProductIllustration";
import { cn } from "@/lib/utils";

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

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 1,
    product_name: "Advanced Physics Lab Kit",
    description: "Complete physics lab setup with precision instruments for advanced experiments.",
    price_inr: 4999,
    product_category: "Science & Tech",
    stock_status: "In Stock",
    target_school_level: "Senior Secondary",
    quantity_in_set: 1,
  },
  {
    id: 2,
    product_name: "Montessori Sensory Play Set",
    description: "Handcrafted wooden sensory materials for early childhood development.",
    price_inr: 2499,
    product_category: "Kindergarten",
    stock_status: "In Stock",
    target_school_level: "Pre-Primary",
    quantity_in_set: 15,
  },
  {
    id: 3,
    product_name: "Premium Watercolor Collection",
    description: "Professional-grade watercolor set with 48 vibrant pigments and brushes.",
    price_inr: 1899,
    product_category: "Art & Craft",
    stock_status: "In Stock",
    target_school_level: "All Levels",
    quantity_in_set: 1,
  },
];

const bentoCategories = [
  {
    title: "Science & Tech",
    description: "Advanced lab equipment for modern learning.",
    icon: Beaker,
    className: "md:col-span-2 md:row-span-2",
    bg: "bg-blue-50 dark:bg-blue-950/20",
    text: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Kindergarten",
    description: "Montessori & Play-based learning tools.",
    icon: GraduationCap,
    className: "md:col-span-1",
    bg: "bg-orange-50 dark:bg-orange-950/20",
    text: "text-orange-600 dark:text-orange-400",
  },
  {
    title: "Sports & Active",
    description: "Quality equipment for physical education.",
    icon: Trophy,
    className: "md:col-span-1",
    bg: "bg-green-50 dark:bg-green-950/20",
    text: "text-green-600 dark:text-green-400",
  },
  {
    title: "Art & Craft",
    description: "Professional-grade supplies for creativity.",
    icon: Palette,
    className: "md:col-span-1",
    bg: "bg-pink-50 dark:bg-pink-950/20",
    text: "text-pink-600 dark:text-pink-400",
  },
  {
    title: "Stationery",
    description: "Premium writing essentials.",
    icon: PenTool,
    className: "md:col-span-1",
    bg: "bg-violet-50 dark:bg-violet-950/20",
    text: "text-violet-600 dark:text-violet-400",
  },
  {
    title: "Library",
    description: "Books & reference guides.",
    icon: BookOpen,
    className: "md:col-span-1",
    bg: "bg-amber-50 dark:bg-amber-950/20",
    text: "text-amber-600 dark:text-amber-400",
  },
];

function BentoCard({ item }: { item: typeof bentoCategories[0] }) {
  const Icon = item.icon;
  return (
    <div className={cn(
      "group relative overflow-hidden rounded-2xl border border-gray-200 bg-card p-6 transition-all hover:shadow-lg dark:border-gray-800",
      item.className
    )}>
      <div className={cn("mb-4 inline-flex rounded-lg p-3", item.bg)}>
        <Icon className={cn("h-6 w-6", item.text)} />
      </div>
      <h3 className="mb-2 font-display text-xl font-bold text-foreground">{item.title}</h3>
      <p className="text-sm text-muted-foreground">{item.description}</p>
    </div>
  );
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

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

  return (
    <div className="flex min-h-screen flex-col bg-background font-body text-foreground">
      
      {/* Hero Section - Clean & Modern */}
      <section className="relative overflow-hidden pt-32 pb-24 lg:pt-48 lg:pb-32">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-4xl"
          >
            <div className="mb-6 inline-flex items-center rounded-full border border-gray-200 bg-white/50 px-3 py-1 text-sm font-medium text-gray-600 backdrop-blur-sm dark:border-gray-800 dark:bg-white/5 dark:text-gray-400">
              <Sparkles className="mr-2 h-4 w-4 text-primary" />
              <span>Premium School Supplies</span>
            </div>
            <h1 className="mb-8 font-display text-5xl font-extrabold tracking-tight text-foreground sm:text-7xl lg:text-8xl">
              Elevate <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-500">Education</span>.
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Equipping the next generation of thinkers and creators with premium tools. 
              From Montessori essentials to advanced science labs.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/products"
                className="inline-flex h-12 w-full items-center justify-center rounded-full bg-primary px-8 text-sm font-bold text-white transition-colors hover:bg-primary/90 sm:w-auto"
              >
                Shop Collection
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-12 w-full items-center justify-center rounded-full border border-gray-200 bg-background px-8 text-sm font-bold text-foreground transition-colors hover:bg-gray-100 sm:w-auto dark:border-gray-800 dark:hover:bg-gray-800"
              >
                Bulk Inquiries
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Abstract Background Elements - CSS Only, Lightweight */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 rounded-full blur-[100px] opacity-50 dark:opacity-20" />
          <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-violet-500/5 rounded-full blur-[120px] opacity-30 dark:opacity-10" />
        </div>
      </section>

      {/* Categories - Bento Grid */}
      <section className="py-24 bg-gray-50/50 dark:bg-gray-950/50">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our Categories</h2>
            <p className="mt-4 text-lg text-muted-foreground">Everything a modern school needs, organized for you.</p>
          </div>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[180px]">
            {bentoCategories.map((item) => (
              <BentoCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Featured Products</h2>
              <p className="mt-2 text-muted-foreground">Handpicked selections for your institution.</p>
            </div>
            <Link href="/products" className="text-sm font-bold text-primary hover:underline">
              View All Products &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => {
              const name = (getProductField(product, "product_name") as string) || "Product";
              const desc = (getProductField(product, "description") as string) || "";
              const price = (getProductField(product, "price_inr") as number) || 0;
              const category = (getProductField(product, "product_category") as string) || "default";

              return (
                <Link key={product.id} href={`/products/${product.id}`} className="group block">
                  <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-900">
                    <ProductIllustration category={category} size={200} />
                    <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/5 dark:group-hover:bg-white/5" />
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-lg font-bold text-foreground">{name}</h3>
                      <span className="font-mono text-sm font-medium text-foreground">₹{price.toLocaleString()}</span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="border-t border-gray-200 py-24 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 text-center">
            <div className="flex flex-col items-center">
              <div className="mb-4 rounded-full bg-green-100 p-3 dark:bg-green-900/30">
                <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-bold text-foreground">Quality Guaranteed</h3>
              <p className="mt-2 text-sm text-muted-foreground">Certified products meeting educational standards.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-4 rounded-full bg-blue-100 p-3 dark:bg-blue-900/30">
                <Trophy className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-bold text-foreground">Trusted by Top Schools</h3>
              <p className="mt-2 text-sm text-muted-foreground">Partnering with 500+ institutions nationwide.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-4 rounded-full bg-purple-100 p-3 dark:bg-purple-900/30">
                <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-bold text-foreground">Bulk Customization</h3>
              <p className="mt-2 text-sm text-muted-foreground">Tailored kits and branding for your school.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
