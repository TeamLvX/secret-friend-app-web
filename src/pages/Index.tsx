import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import Snowfall from "@/components/Snowfall";
import GiftIcon from "@/components/GiftIcon";
import { Button } from "@/components/ui/button";
import { Features } from "@/components/Features";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

export const Index = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Snowfall />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 flex flex-col"
        >
          <GiftIcon
            size={100}
            className={cn("mx-auto mb-6", isMobile ? "" : "")}
          />

          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-foreground">Secret </span>
            <span className="font-display text-gradient-festive">Santa</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto mb-8">
            Create magical gift exchanges with friends and family. Easy, fun,
            and full of holiday spirit! ✨
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/create">
              <Button className="btn-festive text-lg px-8 py-6 gap-2">
                <Plus size={24} />
                Create New Game
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Features */}
        <Features />
      </div>
    </div>
  );
};

export default Index;
