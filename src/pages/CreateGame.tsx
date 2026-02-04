import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Gift, Calendar, DollarSign, Users, Sparkles, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import Snowfall from "@/components/Snowfall";
import GiftIcon from "@/components/GiftIcon";
import PlayerCard from "@/components/PlayerCard";
import { Button } from "@/components/ui/button";
import { createGame } from "@/api/game.api";
import { Player } from "@/models/participant";
import { Group } from "@/models/group";

export const CreateGame = () => {
  const navigate = useNavigate();

  const defaultGroupGame: Group = {
    name: "",
    description: "",
    host: "",
    exchange_date: "",
    budget: 0,
    players: []
  }

  const defaultPlayer: Player = {
    name: "",
    alias: "",
    preferences: "",
    viewed: false,
    id: ""
  }

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [gameData, setGameData] = useState<Group>(defaultGroupGame);
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayer, setNewPlayer] = useState<Player>(defaultPlayer);
  const [showPlayerForm, setShowPlayerForm] = useState(false);

  const handleAddPlayer = () => {
    if (!newPlayer.name.trim()) {
      toast.error("Please enter a player name");
      return;
    }
    setPlayers([...players, { ...newPlayer }]);
    setNewPlayer(defaultPlayer);
    setShowPlayerForm(false);
    toast.success(`${newPlayer.name} added to the game!`);
  };

  const handleRemovePlayer = (index: number) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  const shuffleAndAssign = (playerIds: string[]): Map<string, string> => {
    const shuffled = [...playerIds];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const assignments = new Map<string, string>();
    for (let i = 0; i < playerIds.length; i++) {
      assignments.set(playerIds[i], shuffled[(i + 1) % shuffled.length]);
    }
    return assignments;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!gameData.name.trim() || !gameData.host.trim() || !gameData.exchange_date) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (players.length < 2) {
      toast.error("You need at least 2 players for Secret Santa!");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create the game
      const { group_id } = await createGame({
        name: gameData.name,
        description: gameData.description || null,
        host: gameData.host,
        exchange_date: gameData.exchange_date,
        budget: gameData.budget || null,
        players: players.map((p) => ({
          group_id: "",
          name: p.name,
          alias: p.alias || null,
          preferences: p.preferences || null,
        }))
      });

      if (!group_id) throw Error("Unexpected error ocurred when cerating the game");

      toast.success("Secret Santa game created! 🎅");
      navigate(`/game/${group_id}`);
    } catch (error: any) {
      console.error("Error creating game:", error);

      // Extract meaningful error message from axios error
      let errorMessage = "Failed to create game. Please try again.";

      if (error?.response?.data) {
        if (error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (error.response.data.error) {
          const { message } = error.response.data.error;
          errorMessage = message;
        } else if (Array.isArray(error.response.data) && error.response.data.length > 0) {
          errorMessage = error.response.data.map((err: any) =>
            err.message || err.msg || JSON.stringify(err)
          ).join(', ');
        }
      } else if (error?.message) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Snowfall />

      <div className="relative z-10 container max-w-2xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <button
            onClick={() => navigate("/")}
            className="absolute left-4 top-8 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="hidden sm:inline">Back</span>
          </button>

          <GiftIcon className="mx-auto mb-4" size={72} />
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Create Your <span className="text-gradient-festive">Secret Santa</span>
          </h1>
          <p className="text-muted-foreground">Set up your gift exchange in minutes</p>
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

            <div>
              <label className="block text-sm font-medium mb-2">Game Name *</label>
              <input
                type="text"
                value={gameData.name}
                onChange={(e) => setGameData({ ...gameData, name: e.target.value })}
                placeholder="Family Christmas Exchange"
                className="input-holiday"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={gameData.description}
                onChange={(e) => setGameData({ ...gameData, description: e.target.value })}
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
                  onChange={(e) => setGameData({ ...gameData, host: e.target.value })}
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
                  onChange={(e) => setGameData({ ...gameData, exchange_date: e.target.value })}
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
                onChange={(e) => setGameData({ ...gameData, budget: typeof e.target.value === "string" ? Number(e.target.value) : e.target.value })}
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
                    onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
                    placeholder="Player Name *"
                    className="input-holiday"
                    autoFocus
                  />
                  <input
                    type="text"
                    value={newPlayer.alias}
                    onChange={(e) => setNewPlayer({ ...newPlayer, alias: e.target.value })}
                    placeholder="Nickname (optional)"
                    className="input-holiday"
                  />
                  <textarea
                    value={newPlayer.preferences}
                    onChange={(e) => setNewPlayer({ ...newPlayer, preferences: e.target.value })}
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
                      onClick={() => {
                        setShowPlayerForm(false);
                        setNewPlayer(defaultPlayer);
                      }}
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
