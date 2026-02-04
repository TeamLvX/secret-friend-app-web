import { motion } from "framer-motion";
import { User, X, Gift } from "lucide-react";

interface Player {
  name: string;
  nick_name?: string;
  preferences?: string;
}

interface PlayerCardProps {
  player: Player;
  index: number;
  onRemove?: () => void;
  showRemove?: boolean;
}

const PlayerCard = ({ player, index, onRemove, showRemove = true }: PlayerCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ delay: index * 0.05 }}
      className="bg-secondary/50 rounded-xl p-4 relative group"
    >
      {showRemove && onRemove && (
        <button
          onClick={onRemove}
          className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <X size={14} />
        </button>
      )}
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <User size={20} className="text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-foreground truncate">{player.name}</p>
          {player.nick_name && (
            <p className="text-sm text-muted-foreground truncate">
              "{player.nick_name}"
            </p>
          )}
          {player.preferences && (
            <div className="mt-2 flex items-start gap-1.5">
              <Gift size={14} className="text-accent shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground line-clamp-2">
                {player.preferences}
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PlayerCard;
