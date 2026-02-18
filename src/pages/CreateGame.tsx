import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Gift,
  Calendar,
  DollarSign,
  Users,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import Snowfall from "@/components/Snowfall";
import GiftIcon from "@/components/GiftIcon";
import PlayerCard from "@/components/PlayerCard";
import { Button } from "@/components/ui/button";
import { useCreateGame } from "@/hooks/use-create-game";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export const CreateGame = () => {
  const navigate = useNavigate();

  const isMobile = useIsMobile();

  const {
    gameData,
    players,
    newPlayer,
    isSubmitting,
    setNewPlayer,
    setGameData,
    setShowPlayerForm,
    showPlayerForm,
    handleSubmit,
    handleRemovePlayer,
    handleAddPlayer,
    handleCancelAddplayer,
  } = useCreateGame();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Snowfall />
      <button
        onClick={() => navigate("/")}
        className="absolute left-4 top-8 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft size={20} />
        <span className="hidden sm:inline">Back</span>
      </button>

      <div className="relative z-10 container max-w-2xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn("text-center mb-8", isMobile ? "flex flex-col" : "")}
        >
          <GiftIcon
            className={cn("mx-auto mb-4", isMobile ? "" : "absolute")}
            size={72}
          />
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Create Your{" "}
            <span className="text-gradient-festive">Secret Santa</span>
          </h1>
          <p className="text-muted-foreground">
            Set up your gift exchange in minutes
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="card-holiday space-y-6"
        >
          {/* Game Details */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Sparkles size={20} className="text-holiday-gold" />
              Game Details
            </h2>

            <div className="text-left">
              <label className="block text-sm font-medium mb-2">
                Game Name *
              </label>
              <input
                type="text"
                value={gameData.name}
                onChange={(e) =>
                  setGameData({ ...gameData, name: e.target.value })
                }
                placeholder="Family Christmas Exchange"
                className="input-holiday"
                required
              />
            </div>

            <div className="text-left">
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                value={gameData.description}
                onChange={(e) =>
                  setGameData({ ...gameData, description: e.target.value })
                }
                placeholder="A fun gift exchange for the whole family!"
                className="input-holiday resize-none h-20"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-1.5">
                  <Users size={16} className="text-primary" />
                  Host Name *
                </label>
                <input
                  type="text"
                  value={gameData.host}
                  onChange={(e) =>
                    setGameData({ ...gameData, host: e.target.value })
                  }
                  placeholder="Your name"
                  className="input-holiday"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-1.5">
                  <Calendar size={16} className="text-primary" />
                  Exchange Date *
                </label>
                <input
                  type="date"
                  value={gameData.exchange_date}
                  onChange={(e) =>
                    setGameData({ ...gameData, exchange_date: e.target.value })
                  }
                  className="input-holiday"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-1.5">
                <DollarSign size={16} className="text-holiday-gold" />
                Budget
              </label>
              <input
                type="text"
                value={gameData.budget}
                onChange={(e) =>
                  setGameData({
                    ...gameData,
                    budget:
                      typeof e.target.value === "string"
                        ? Number(e.target.value)
                        : e.target.value,
                  })
                }
                placeholder="$25"
                className="input-holiday"
              />
            </div>
          </div>

          {/* Players Section */}
          <div className="space-y-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Gift size={20} className="text-accent" />
                Players ({players.length})
              </h2>
              {!showPlayerForm && (
                <Button
                  type="button"
                  onClick={() => setShowPlayerForm(true)}
                  variant="outline"
                  size="sm"
                  className="gap-1.5"
                >
                  <Plus size={16} />
                  Add Player
                </Button>
              )}
            </div>

            {/* Player List */}
            <AnimatePresence mode="popLayout">
              {players.length > 0 && (
                <motion.div layout className="grid gap-3">
                  {players.map((player, index) => (
                    <PlayerCard
                      key={`${player.name}-${index}`}
                      player={player}
                      index={index}
                      onRemove={() => handleRemovePlayer(index)}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Add Player Form */}
            <AnimatePresence>
              {showPlayerForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-secondary/30 rounded-xl p-4 space-y-3"
                >
                  <input
                    type="text"
                    value={newPlayer.name}
                    onChange={(e) =>
                      setNewPlayer({ ...newPlayer, name: e.target.value })
                    }
                    placeholder="Player Name *"
                    className="input-holiday"
                    autoFocus
                  />
                  <input
                    type="text"
                    value={newPlayer.alias}
                    onChange={(e) =>
                      setNewPlayer({ ...newPlayer, alias: e.target.value })
                    }
                    placeholder="Nickname (optional)"
                    className="input-holiday"
                  />
                  <textarea
                    value={newPlayer.preferences}
                    onChange={(e) =>
                      setNewPlayer({
                        ...newPlayer,
                        preferences: e.target.value,
                      })
                    }
                    placeholder="Gift preferences (optional)"
                    className="input-holiday resize-none h-16"
                  />
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      onClick={handleAddPlayer}
                      className="btn-festive flex-1"
                    >
                      Add Player
                    </Button>
                    <Button
                      type="button"
                      onClick={handleCancelAddplayer}
                      variant="ghost"
                    >
                      Cancel
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {players.length === 0 && !showPlayerForm && (
              <div className="text-center py-8 text-muted-foreground">
                <Gift size={40} className="mx-auto mb-2 opacity-40" />
                <p>No players yet. Add at least 2 players to start!</p>
              </div>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isSubmitting || players.length < 2}
            className="btn-festive w-full text-lg py-6"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  🎁
                </motion.span>
                Creating Magic...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sparkles size={20} />
                Create Secret Santa Game
              </span>
            )}
          </Button>
        </motion.form>
      </div>
    </div>
  );
};

export default CreateGame;
