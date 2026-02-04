import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Gift, Sparkles, Users, Calendar } from "lucide-react";
import Snowfall from "@/components/Snowfall";
import GiftIcon from "@/components/GiftIcon";
import { Button } from "@/components/ui/button";

export const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Snowfall />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
          >
            <GiftIcon size={100} className="mx-auto mb-6" />
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-foreground">Secret </span>
            <span className="font-display text-gradient-festive">Santa</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto mb-8">
            Create magical gift exchanges with friends and family. Easy, fun, and full of holiday spirit! ✨
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
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-3 gap-6 max-w-4xl w-full"
        >
          <div className="card-holiday text-center">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Users size={28} className="text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2">Add Players</h3>
            <p className="text-muted-foreground text-sm">
              Invite all your friends and family to join the fun gift exchange
            </p>
          </div>

          <div className="card-holiday text-center">
            <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <Sparkles size={28} className="text-accent" />
            </div>
            <h3 className="font-bold text-lg mb-2">Auto Matching</h3>
            <p className="text-muted-foreground text-sm">
              We secretly assign each player someone to buy a gift for
            </p>
          </div>

          <div className="card-holiday text-center">
            <div className="w-14 h-14 rounded-full bg-holiday-gold/20 flex items-center justify-center mx-auto mb-4">
              <Gift size={28} className="text-holiday-gold" />
            </div>
            <h3 className="font-bold text-lg mb-2">Share & Reveal</h3>
            <p className="text-muted-foreground text-sm">
              Share the link and let everyone discover their secret match
            </p>
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-muted-foreground text-sm mt-12 flex items-center gap-2"
        >
          <Calendar size={16} />
          Perfect for holiday gatherings, office parties & more!
        </motion.p>
      </div>
    </div>
  );
};

export default Index;
