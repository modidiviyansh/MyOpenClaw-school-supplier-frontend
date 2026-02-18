"use client";

import { motion } from "framer-motion";

type CategoryType =
  | "science"
  | "kindergarten"
  | "sports"
  | "art"
  | "stationery"
  | "books"
  | "default";

const categoryColors: Record<CategoryType, { primary: string; secondary: string; accent: string }> = {
  science: { primary: "#4F46E5", secondary: "#818CF8", accent: "#C7D2FE" },
  kindergarten: { primary: "#F59E0B", secondary: "#FBBF24", accent: "#FDE68A" },
  sports: { primary: "#10B981", secondary: "#34D399", accent: "#A7F3D0" },
  art: { primary: "#EC4899", secondary: "#F472B6", accent: "#FBCFE8" },
  stationery: { primary: "#8B5CF6", secondary: "#A78BFA", accent: "#DDD6FE" },
  books: { primary: "#EF4444", secondary: "#F87171", accent: "#FECACA" },
  default: { primary: "#6B7280", secondary: "#9CA3AF", accent: "#D1D5DB" },
};

function mapCategory(category: string): CategoryType {
  const lower = category?.toLowerCase() || "";
  if (lower.includes("science") || lower.includes("tech") || lower.includes("lab") || lower.includes("physics"))
    return "science";
  if (lower.includes("kinder") || lower.includes("montessori") || lower.includes("play") || lower.includes("pre"))
    return "kindergarten";
  if (lower.includes("sport") || lower.includes("game") || lower.includes("physical") || lower.includes("active"))
    return "sports";
  if (lower.includes("art") || lower.includes("craft") || lower.includes("paint") || lower.includes("draw"))
    return "art";
  if (lower.includes("station") || lower.includes("pen") || lower.includes("notebook") || lower.includes("write"))
    return "stationery";
  if (lower.includes("book") || lower.includes("read") || lower.includes("text") || lower.includes("novel"))
    return "books";
  return "default";
}

// Animated geometric illustrations per category
function ScienceIllustration({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      {/* Atom-like orbits */}
      <motion.ellipse
        cx="60" cy="60" rx="45" ry="18"
        stroke="#818CF8" strokeWidth="1.5" opacity="0.6"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "60px 60px" }}
      />
      <motion.ellipse
        cx="60" cy="60" rx="45" ry="18"
        stroke="#4F46E5" strokeWidth="1.5" opacity="0.6"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "60px 60px", rotate: "60deg" }}
      />
      <motion.ellipse
        cx="60" cy="60" rx="45" ry="18"
        stroke="#C7D2FE" strokeWidth="1.5" opacity="0.6"
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "60px 60px", rotate: "120deg" }}
      />
      {/* Nucleus */}
      <motion.circle
        cx="60" cy="60" r="8"
        fill="#4F46E5"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      {/* Electrons */}
      <motion.circle cx="60" cy="42" r="3" fill="#818CF8"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "60px 60px" }}
      />
      <motion.circle cx="60" cy="42" r="3" fill="#4F46E5"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "60px 60px" }}
      />
    </svg>
  );
}

function KindergartenIllustration({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      {/* Floating blocks */}
      <motion.rect
        x="20" y="50" width="25" height="25" rx="4"
        fill="#FBBF24" opacity="0.8"
        animate={{ y: [50, 42, 50], rotate: [0, 5, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.rect
        x="50" y="35" width="22" height="22" rx="4"
        fill="#F59E0B" opacity="0.8"
        animate={{ y: [35, 28, 35], rotate: [0, -5, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
      />
      <motion.rect
        x="77" y="45" width="20" height="20" rx="4"
        fill="#FDE68A" opacity="0.8"
        animate={{ y: [45, 38, 45], rotate: [0, 8, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      />
      {/* Star */}
      <motion.path
        d="M60 10 L63 20 L74 20 L65 26 L68 36 L60 30 L52 36 L55 26 L46 20 L57 20Z"
        fill="#F59E0B"
        animate={{ scale: [1, 1.15, 1], rotate: [0, 15, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{ transformOrigin: "60px 23px" }}
      />
      {/* Circle */}
      <motion.circle
        cx="35" cy="85" r="12"
        fill="#FBBF24" opacity="0.5"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />
      <motion.circle
        cx="80" cy="90" r="8"
        fill="#FDE68A" opacity="0.5"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.7 }}
      />
    </svg>
  );
}

function SportsIllustration({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      {/* Dynamic lines */}
      <motion.line
        x1="20" y1="100" x2="60" y2="20"
        stroke="#10B981" strokeWidth="3" strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.line
        x1="40" y1="100" x2="80" y2="20"
        stroke="#34D399" strokeWidth="2" strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", delay: 0.3 }}
      />
      <motion.line
        x1="60" y1="100" x2="100" y2="20"
        stroke="#A7F3D0" strokeWidth="2" strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: 0.6 }}
      />
      {/* Ball */}
      <motion.circle
        cx="60" cy="60" r="20"
        stroke="#10B981" strokeWidth="2" fill="none"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.path
        d="M40 60 Q60 40 80 60 Q60 80 40 60"
        stroke="#34D399" strokeWidth="1.5" fill="none"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "60px 60px" }}
      />
    </svg>
  );
}

function ArtIllustration({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      {/* Palette blob shapes */}
      <motion.circle cx="40" cy="50" r="15" fill="#EC4899" opacity="0.7"
        animate={{ cx: [40, 45, 40], cy: [50, 45, 50] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.circle cx="70" cy="40" r="12" fill="#F472B6" opacity="0.6"
        animate={{ cx: [70, 65, 70], cy: [40, 45, 40] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.circle cx="55" cy="75" r="18" fill="#FBCFE8" opacity="0.5"
        animate={{ r: [18, 20, 18] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      {/* Brush stroke */}
      <motion.path
        d="M20 90 Q40 60 60 70 Q80 80 100 50"
        stroke="#EC4899" strokeWidth="3" strokeLinecap="round" fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
      />
    </svg>
  );
}

function StationeryIllustration({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      {/* Pencil */}
      <motion.g
        animate={{ rotate: [-5, 5, -5] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ transformOrigin: "50px 60px" }}
      >
        <rect x="42" y="25" width="16" height="60" rx="2" fill="#8B5CF6" />
        <polygon points="42,85 58,85 50,100" fill="#DDD6FE" />
        <rect x="42" y="25" width="16" height="10" rx="2" fill="#A78BFA" />
      </motion.g>
      {/* Floating dots */}
      <motion.circle cx="80" cy="30" r="4" fill="#A78BFA" opacity="0.6"
        animate={{ y: [30, 24, 30] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.circle cx="90" cy="60" r="3" fill="#DDD6FE" opacity="0.5"
        animate={{ y: [60, 54, 60] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
      />
      <motion.circle cx="25" cy="50" r="5" fill="#8B5CF6" opacity="0.4"
        animate={{ y: [50, 44, 50] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
      />
    </svg>
  );
}

function BooksIllustration({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      {/* Stacked books */}
      <motion.rect x="25" y="70" width="70" height="14" rx="2" fill="#EF4444" opacity="0.8"
        animate={{ x: [25, 28, 25] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.rect x="30" y="54" width="60" height="14" rx="2" fill="#F87171" opacity="0.7"
        animate={{ x: [30, 27, 30] }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 0.3 }}
      />
      <motion.rect x="28" y="38" width="65" height="14" rx="2" fill="#FECACA" opacity="0.8"
        animate={{ x: [28, 32, 28] }}
        transition={{ duration: 4, repeat: Infinity, delay: 0.6 }}
      />
      {/* Page flutter */}
      <motion.path
        d="M60 35 Q70 20 80 25 Q70 15 60 20Z"
        fill="#EF4444" opacity="0.5"
        animate={{ rotate: [0, 10, 0], y: [0, -3, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ transformOrigin: "60px 35px" }}
      />
    </svg>
  );
}

function DefaultIllustration({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <motion.rect
        x="30" y="30" width="60" height="60" rx="12"
        stroke="#6B7280" strokeWidth="2" fill="none"
        animate={{ rotate: [0, 90, 180, 270, 360] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "60px 60px" }}
      />
      <motion.circle
        cx="60" cy="60" r="18"
        stroke="#9CA3AF" strokeWidth="2" fill="none"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.circle cx="60" cy="60" r="5" fill="#6B7280"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </svg>
  );
}

const illustrations: Record<CategoryType, React.FC<{ size?: number }>> = {
  science: ScienceIllustration,
  kindergarten: KindergartenIllustration,
  sports: SportsIllustration,
  art: ArtIllustration,
  stationery: StationeryIllustration,
  books: BooksIllustration,
  default: DefaultIllustration,
};

export default function ProductIllustration({
  category,
  size = 120,
}: {
  category: string;
  size?: number;
}) {
  const cat = mapCategory(category);
  const colors = categoryColors[cat];
  const IllustrationComponent = illustrations[cat];

  return (
    <div
      className="flex h-full w-full items-center justify-center"
      style={{
        background: `linear-gradient(135deg, ${colors.accent}10, transparent 50%, ${colors.primary}05)`,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <IllustrationComponent size={size} />
      </motion.div>
    </div>
  );
}

export { mapCategory, categoryColors };
export type { CategoryType };
