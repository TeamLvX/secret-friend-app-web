import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  DollarSign,
  Users,
  Gift,
  PartyPopper,
  Eye,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import Snowfall from "@/components/Snowfall";
import GiftIcon from "@/components/GiftIcon";
import { Button } from "@/components/ui/button";
import { useViewGame } from "@/hooks/use-view-game";

export const ViewGame = () => {
  const {
    loading,
    game,
    showConfetti,
    players,
    assignedPlayer,
    selectedPlayerId,
    setSelectedPlayerId,
    handleRevealAssignment,
    revealingAssignment,
    setAssignedPlayer,
  } = useViewGame();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="text-5xl mb-4"
          >
            🎁
          </motion.div>
          <p className="text-muted-foreground">Loading your Secret Santa...</p>
        </motion.div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <GiftIcon className="mx-auto mb-4 opacity-50" size={80} />
          <h1 className="text-2xl font-bold mb-2">Game Not Found</h1>
          <p className="text-muted-foreground mb-6">
            This Secret Santa game doesn't exist or has been removed.
          </p>
          <Link to="/">
            <Button className="btn-festive">Go Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Snowfall />

      {/* Confetti Effect */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
          >
            {[...Array(30)].map((_, i) => (
              <motion.span
                key={i}
                initial={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  scale: 1,
                }}
                animate={{
                  opacity: 0,
                  x: (Math.random() - 0.5) * 400,
                  y: (Math.random() - 0.5) * 400,
                  scale: 0,
                  rotate: Math.random() * 720,
                }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute text-2xl"
              >
                {["🎉", "⭐", "🎁", "❄️", "✨"][Math.floor(Math.random() * 5)]}
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 container max-w-2xl mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>

        {/* Game Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <GiftIcon className="mx-auto mb-4" size={64} />
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            {game.name}
          </h1>
          {game.description && (
            <p className="text-muted-foreground max-w-md mx-auto">
              {game.description}
            </p>
          )}
        </motion.div>

        {/* Game Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8"
        >
          <div className="card-holiday text-center">
            <Users size={24} className="mx-auto mb-2 text-primary" />
            <p className="text-xs text-muted-foreground">Host</p>
            <p className="font-semibold truncate">{game.host}</p>
          </div>
          <div className="card-holiday text-center">
            <Calendar size={24} className="mx-auto mb-2 text-accent" />
            <p className="text-xs text-muted-foreground">Exchange</p>
            <p className="font-semibold text-sm">
              {new Date(game.exchange_date).toLocaleDateString()}
            </p>
          </div>
          <div className="card-holiday text-center">
            <DollarSign size={24} className="mx-auto mb-2 text-holiday-gold" />
            <p className="text-xs text-muted-foreground">Budget</p>
            <p className="font-semibold">{game.budget || "No limit"}</p>
          </div>
          <div className="card-holiday text-center">
            <Gift size={24} className="mx-auto mb-2 text-primary" />
            <p className="text-xs text-muted-foreground">Players</p>
            <p className="font-semibold">{players.length}</p>
          </div>
        </motion.div>

        {/* Assignment Reveal Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-holiday mb-8"
        >
          {!assignedPlayer ? (
            <>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Eye size={24} className="text-primary" />
                Reveal Your Match
              </h2>
              <p className="text-muted-foreground mb-4">
                Select your name below to see who you're buying a gift for!
              </p>

              <div className="grid gap-2 mb-4">
                {players.map((player) => (
                  <button
                    key={player.id}
                    onClick={() => setSelectedPlayerId(player.id)}
                    className={`w-full p-3 rounded-xl text-left transition-all flex items-center justify-between ${
                      selectedPlayerId === player.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary/50 hover:bg-secondary"
                    }`}
                  >
                    <span className="font-medium">
                      {player.name}
                      {player.alias && (
                        <span className="opacity-70 ml-2">
                          "{player.alias}"
                        </span>
                      )}
                    </span>
                    {player.viewed && (
                      <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full">
                        Viewed
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <Button
                onClick={handleRevealAssignment}
                disabled={!selectedPlayerId || revealingAssignment}
                className="btn-festive w-full"
              >
                {revealingAssignment ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="animate-spin" size={20} />
                    Revealing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <PartyPopper size={20} />
                    Reveal My Secret Santa Match!
                  </span>
                )}
              </Button>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="text-6xl mb-4"
              >
                🎅
              </motion.div>
              <h3 className="text-lg text-muted-foreground mb-2">
                You're buying a gift for...
              </h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold text-gradient-festive mb-2"
              >
                {assignedPlayer.name}!
              </motion.p>
              {assignedPlayer.alias && (
                <p className="text-muted-foreground mb-4">
                  "{assignedPlayer.alias}"
                </p>
              )}
              {assignedPlayer.preferences && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="bg-secondary/50 rounded-xl p-4 mt-4 text-left"
                >
                  <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1.5">
                    <Gift size={16} className="text-accent" />
                    Gift preferences:
                  </p>
                  <p className="text-foreground">
                    {assignedPlayer.preferences}
                  </p>
                </motion.div>
              )}
              <Button
                onClick={() => {
                  setAssignedPlayer(null);
                  setSelectedPlayerId(null);
                }}
                variant="outline"
                className="mt-6"
              >
                Pick Another Player
              </Button>
            </motion.div>
          )}
        </motion.div>

        {/* All Players */}
        {/*   <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-holiday"
        >
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Users size={24} className="text-accent" />
            All Players
          </h2>
          <div className="grid gap-3">
            {players.map((player, index) => (
              <PlayerCard
                key={player.id}
                player={player}
                index={index}
                showRemove={false}
              />
            ))}
          </div>
        </motion.div> */}
      </div>
    </div>
  );
};

export default ViewGame;
