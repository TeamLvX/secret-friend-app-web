import { createGame } from "@/api/game.api";
import { Group } from "@/types/view/group.type";
import { Player } from "@/types/view/player.type";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useCreateGame = () => {
  const navigate = useNavigate();

  const defaultGroupGame: Group = {
    name: "",
    description: "",
    host: "",
    exchange_date: "",
    budget: 0,
    players: [],
  };

  const defaultPlayer: Player = {
    name: "",
    alias: "",
    preferences: "",
    viewed: false,
    id: "",
  };

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

  const handleCancelAddplayer = () => {
    setShowPlayerForm(false);
    setNewPlayer(defaultPlayer);
  };

  const handleRemovePlayer = (index: number) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !gameData.name.trim() ||
      !gameData.host.trim() ||
      !gameData.exchange_date
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (players.length < 2) {
      toast.error("You need at least 2 players for Secret Santa!");
      return;
    }

    setIsSubmitting(true);

    // Create the game
    const { data, error } = await createGame({
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
      })),
    });

    if (error) {
      toast.error("Unexpected error ocurred creating the game");
      return;
    }

    toast.success("Secret Santa game created! 🎅");

    const group_id = Array.isArray(data) ? data[0] : data;

    navigate(`/game/${group_id}`);

    setIsSubmitting(false);
  };

  return {
    gameData,
    players,
    newPlayer,
    isSubmitting,
    showPlayerForm,
    setNewPlayer,
    setGameData,
    setShowPlayerForm,
    handleSubmit,
    handleRemovePlayer,
    handleAddPlayer,
    handleCancelAddplayer,
  };
};
