"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Beaker, Palette, Trophy, BookOpen, PenTool, GraduationCap, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getProducts } from "@/lib/api";
import ProductIllustration from "@/components/ProductIllustration";
import { cn } from "@/lib/utils";
import SpotlightCard from "@/components/ui/SpotlightCard";

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
    bg: "bg-blue-50/50 dark:bg-blue-900/10",
    text: "text-blue-600 dark:text-blue-400",
    spotlight: "rgba(59, 130, 246, 0.15)", // Blue spotlight
  },
  {
    title: "Kindergarten",
    description: "Montessori & Play-based learning tools.",
    icon: GraduationCap,
    className: "md:col-span-1",
    bg: "bg-orange-50/50 dark:bg-orange-900/10",
    text: "text-orange-600 dark:text-orange-400",
    spotlight: "rgba(245, 158, 11, 0.15)", // Orange spotlight
  },
  {
    title: "Sports & Active",
    description: "Quality equipment for physical education.",
    icon: Trophy,
    className: "md:col-span-1",
    bg: "bg-green-50/50 dark:bg-green-900/10",
    text: "text-green-600 dark:text-green-400",
    spotlight: "rgba(16, 185, 129, 0.15)", // Green spotlight
  },
  {
    title: "Art & Craft",
    description: "Professional-grade supplies for creativity.",
    icon: Palette,
    className: "md:col-span-1",
    bg: "bg-pink-50/50 dark:bg-pink-900/10",
    text: "text-pink-600 dark:text-pink-400",
    spotlight: "rgba(236, 72, 153, 0.15)", // Pink spotlight
  },
  {
    title: "Stationery",
    description: "Premium writing essentials.",
    icon: PenTool,
    className: "md:col-span-1",
    bg: "bg-violet-50/50 dark:bg-violet-900/10",
    text: "text-violet-600 dark:text-violet-400",
    spotlight: "rgba(139, 92, 246, 0.15)", // Violet spotlight
  },
  {
    title: "Library",
    description: "Books & reference guides.",
    icon: BookOpen,
    className: "md:col-span-1",
    bg: "bg-amber-50/50 dark:bg-amber-900/10",
    text: "text-amber-600 dark:text-amber-400",
    spotlight: "rgba(239, 68, 68, 0.15)", // Red spotlight
  },
  {
    title: "Bulk Orders",
    description: "Institutional pricing & logistics.",
    icon: Sparkles,
    className: "md:col-span-2", // Wider card to break the grid
    bg: "bg-primary/5 dark:bg-primary/10",
    text: "text-primary",
    spotlight: "rgba(79, 70, 229, 0.15)", // Primary spotlight
  },
];

function BentoCard({ item }: { item: typeof bentoCategories[0] }) {
  const Icon = item.icon;
  return (
    <Link href="/products" className={cn("group block", item.className)}>
      <SpotlightCard className={cn("h-full rounded-3xl p-8 transition-shadow hover:shadow-xl relative overflow-hidden", item.className)} spotlightColor={item.spotlight}>
        <div className={cn("mb-6 inline-flex rounded-2xl p-4 relative z-10", item.bg)}>
          <Icon className={cn("h-8 w-8", item.text)} />
        </div>
        <h3 className="mb-3 font-display text-2xl font-bold tracking-tight text-foreground relative z-10">{item.title}</h3>
        <p className="text-base leading-relaxed text-muted-foreground relative z-10">{item.description}</p>
        {/* Subtle background shape for visual interest */}
        <motion.div
          className={cn(
            "absolute inset-0 rounded-3xl opacity-30 transform scale-150",
            "bg-gradient-to-br from-transparent to-current", // Use current color for dynamic gradient
            item.bg // Fallback or base color for the background element
          )}
          style={{ color: item.text.split('-')[1] }} // Extract color name from Tailwind class
          initial={{ x: "-100%", y: "-100%", rotate: 0 }}
          whileInView={{ x: "0%", y: "0%", rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: Math.random() * 2 }}
          viewport={{ once: true, amount: 0.1 }}
        />
      </SpotlightCard>
    </Link>
  );
}

// Component for animating individual words
const Word = ({ children, gradient = false }: { children: string; gradient?: boolean }) => {
  return (
    <motion.span 
      variants={{
        hidden: { y: "100%", opacity: 0, filter: "blur(8px)" },
        visible: { y: "0%", opacity: 1, filter: "blur(0px)" }
      }}
      className={cn(
        "inline-block whitespace-nowrap",
        gradient && "text-transparent bg-clip-text bg-gradient-to-r from-primary via-violet-500 to-primary bg-[length:200%_auto] animate-gradient"
      )}
    >
      {children}
    </motion.span>
  );
};

// Component for animating lines of text
const Line = ({ children, gradientWord = "" }: { children: string; gradientWord?: string }) => {
  const words = children.split(" ");
  return (
    <motion.span 
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
      }}
      className="block overflow-hidden"
    >
      {words.map((word, i) => (
        <Word key={word + i} gradient={word === gradientWord}>{word}</Word>
      ))}
    </motion.span>
  );
};

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

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const heroStagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.5 } }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background font-body text-foreground selection:bg-primary/20 selection:text-primary relative overflow-hidden">
      
      {/* Hero Section - Kinetic Typography & Mesh Gradients */}
      <section className="relative overflow-hidden pt-32 pb-24 lg:pt-48 lg:pb-40 flex items-center justify-center min-h-[80vh]">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroStagger}
            className="mx-auto max-w-5xl"
          >
            <motion.div variants={sectionVariants} className="mb-8 flex justify-center">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-md">
                <Sparkles className="mr-2 h-4 w-4" />
                <span>Next-Gen School Supplies</span>
              </div>
            </motion.div>
            
            <motion.h1 
              variants={heroStagger}
              className="mb-8 font-display text-6xl font-black tracking-[-0.05em] text-foreground sm:text-8xl lg:text-[10rem] leading-[0.9] md:leading-[0.8]"
            >
              <Line>Elevate</Line>
              <Line gradientWord="Education.">Education.</Line>
            </motion.h1>
            
            <motion.p variants={sectionVariants} className="mx-auto mb-12 max-w-2xl text-xl text-muted-foreground sm:text-2xl leading-relaxed">
              Equipping the next generation of thinkers and creators with premium tools. 
              From Montessori essentials to advanced science labs.
            </motion.p>
            
            <motion.div variants={sectionVariants} className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/products"
                className="group inline-flex h-14 w-full items-center justify-center rounded-full bg-primary px-10 text-base font-bold text-white transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 sm:w-auto"
              >
                Shop Collection
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-14 w-full items-center justify-center rounded-full border border-gray-200 bg-background px-10 text-base font-bold text-foreground transition-all hover:bg-gray-50 hover:border-gray-300 sm:w-auto dark:border-gray-800 dark:hover:bg-gray-900"
              >
                Bulk Inquiries
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Refined Background Mesh - Subtle & Premium */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1400px] h-[1000px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/15 via-background/0 to-background/0 blur-[150px] dark:from-primary/10 dark:via-dark-background/0 dark:to-dark-background/0" />
          <div className="absolute bottom-[-10%] right-0 w-[1000px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-500/10 via-background/0 to-background/0 blur-[120px] dark:from-violet-500/5 dark:via-dark-background/0 dark:to-dark-background/0" />
        </div>
      </section>

      {/* Categories - Bento Grid with Spotlight */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4">
          <div className="mb-20 text-center max-w-3xl mx-auto">
            <h2 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Curated for Excellence</h2>
            <p className="mt-6 text-xl text-muted-foreground">Everything a modern institution needs, organized into premium collections.</p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4 md:auto-rows-[300px]">
            {bentoCategories.map((item) => (
              <BentoCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products - Spotlight treatment */}
      <section className="py-32 bg-gray-50/50 dark:bg-gray-950/30 border-y border-gray-100 dark:border-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="mb-16 flex flex-col items-end justify-between gap-6 sm:flex-row">
            <div className="w-full">
              <h2 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Trending Now</h2>
              <p className="mt-4 text-xl text-muted-foreground">Handpicked selections for your institution.</p>
            </div>
            <Link href="/products" className="group whitespace-nowrap text-sm font-bold text-primary hover:text-primary/80">
              View All Products <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => {
              const name = (getProductField(product, "product_name") as string) || "Product";
              const desc = (getProductField(product, "description") as string) || "";
              const price = (getProductField(product, "price_inr") as number) || 0;
              const category = (getProductField(product, "product_category") as string) || "default";

              return (
                <Link key={product.id} href={`/products/${product.id}`} className="group block h-full">
                  <SpotlightCard className="h-full rounded-2xl p-0 overflow-hidden border-gray-200/60 dark:border-gray-800/60 bg-white dark:bg-gray-900/50 transition-transform duration-300 hover:-translate-y-1" spotlightColor="rgba(79, 70, 229, 0.08)">
                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800/50">
                      <ProductIllustration category={category} size={240} />
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-display text-xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors">{name}</h3>
                        <span className="font-mono text-lg font-medium text-foreground">₹{price.toLocaleString()}</span>
                      </div>
                      <p className="mt-3 line-clamp-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
                      <div className="mt-6 flex items-center text-xs font-bold uppercase tracking-wider text-primary">
                        View Details <ArrowRight className="ml-2 h-3 w-3" />
                      </div>
                    </div>
                  </SpotlightCard>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-3 text-center divide-y sm:divide-y-0 sm:divide-x divide-gray-100 dark:divide-gray-800">
            <div className="flex flex-col items-center px-4">
              <div className="mb-6 rounded-full bg-green-50 p-4 dark:bg-green-900/20">
                <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground">Quality Guaranteed</h3>
              <p className="mt-2 text-base text-muted-foreground max-w-xs">Certified products meeting the highest educational standards.</p>
            </div>
            <div className="flex flex-col items-center px-4 pt-12 sm:pt-0">
              <div className="mb-6 rounded-full bg-blue-50 p-4 dark:bg-blue-900/20">
                <Trophy className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground">Trusted by Top Schools</h3>
              <p className="mt-2 text-base text-muted-foreground max-w-xs">Partnering with 500+ premium institutions nationwide.</p>
            </div>
            <div className="flex flex-col items-center px-4 pt-12 sm:pt-0">
              <div className="mb-6 rounded-full bg-purple-50 p-4 dark:bg-purple-900/20">
                <Sparkles className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground">Bulk Customization</h3>
              <p className="mt-2 text-base text-muted-foreground max-w-xs">Tailored kits and branding solutions for your school.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
