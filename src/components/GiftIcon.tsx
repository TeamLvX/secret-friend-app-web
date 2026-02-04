import { motion } from "framer-motion";

interface GiftIconProps {
  className?: string;
  size?: number;
}

const GiftIcon = ({ className = "", size = 64 }: GiftIconProps) => {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Box */}
        <rect
          x="8"
          y="28"
          width="48"
          height="32"
          rx="4"
          fill="hsl(var(--primary))"
        />
        {/* Lid */}
        <rect
          x="4"
          y="20"
          width="56"
          height="12"
          rx="3"
          fill="hsl(var(--primary))"
        />
        {/* Ribbon vertical */}
        <rect x="28" y="20" width="8" height="40" fill="hsl(var(--holiday-gold))" />
        {/* Ribbon horizontal */}
        <rect x="4" y="24" width="56" height="6" fill="hsl(var(--holiday-gold))" />
        {/* Bow left */}
        <ellipse cx="24" cy="16" rx="8" ry="6" fill="hsl(var(--holiday-gold))" />
        {/* Bow right */}
        <ellipse cx="40" cy="16" rx="8" ry="6" fill="hsl(var(--holiday-gold))" />
        {/* Bow center */}
        <circle cx="32" cy="18" r="5" fill="hsl(var(--holiday-gold))" />
      </svg>
    </motion.div>
  );
};

export default GiftIcon;
