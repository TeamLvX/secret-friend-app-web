import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Gift, Sparkles, Users, Calendar } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ReactNode } from "react";

export const Features = () => {
  const isMobile = useIsMobile();

  const features: {
    id: string;
    icon: {
      component: ReactNode;
      parentClassName: string;
    };
    title: string;
    description: string;
  }[] = [
    {
      icon: {
        component: <Users size={28} className="text-primary" />,
        parentClassName: "bg-primary/10",
      },
      title: "Add Players",
      description:
        "Invite all your friends and family to join the fun gift exchange",
      id: "f-1",
    },
    {
      icon: {
        component: <Sparkles size={28} className="text-accent" />,
        parentClassName: "bg-accent/10",
      },
      title: "Auto Matching",
      description: "We secretly assign each player someone to buy a gift for",
      id: "f-2",
    },
    {
      icon: {
        component: <Gift size={28} className="text-holiday-gold" />,
        parentClassName: "bg-holiday-gold/20",
      },
      title: "Share & Reveal",
      description:
        "Share the link and let everyone discover their secret match",
      id: "f-3",
    },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className={cn(
          "grid gap-6 max-w-4xl w-full",
          isMobile ? "grid-cols-1" : "grid-cols-3",
        )}
      >
        {features.map((feat) => (
          <div key={feat.id} className="card-holiday text-center">
            <div className="w-14 h-14 rounded-full bg-holiday-gold/20 flex items-center justify-center mx-auto mb-4">
              {feat.icon.component}
            </div>
            <h3 className="font-bold text-lg mb-2">{feat.title}</h3>
            <p className="text-muted-foreground text-sm">{feat.description}</p>
          </div>
        ))}
      </motion.div>

      {/* Footer Note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className={cn(
          "text-muted-foreground text-sm mt-12 flex items-center gap-2",
          isMobile ? "flex flex-col" : "",
        )}
      >
        <Calendar size={16} />
        Perfect for holiday gatherings, office parties & more!
      </motion.p>
    </>
  );
};
