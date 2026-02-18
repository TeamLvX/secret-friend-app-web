import { getAssignmentDetail, getGame, updatePlayer } from "@/api/game.api";
import { Group } from "@/types/view/group.type";
import { Player } from "@/types/view/player.type";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export const useViewGame = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const [game, setGame] = useState<Group | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  //const [assignments, setAssigments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
  const [assignedPlayer, setAssignedPlayer] = useState<Player | null>(null);
  const [revealingAssignment, setRevealingAssignment] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (gameId) {
      fetchGameData();
    }
  }, [gameId]);

  const fetchGameData = async () => {
    const { data, error } = await getGame(gameId);

    if (error) {
      toast.error(error.message);
      return;
    }

    const gameDetails = Array.isArray(data) ? data[0] : data;

    setGame(gameDetails);
    setPlayers(gameDetails.players);
    //setAssigments(gameDetails.assignments);

    setLoading(false);
  };

  const handleRevealAssignment = async () => {
    if (!selectedPlayerId) {
      toast.error("Please select your name first");
      return;
    }

    setRevealingAssignment(true);

    const selectedPlayer = players.find(
      (player) => player.id === selectedPlayerId,
    );

    if (selectedPlayer.viewed) {
      toast.error("Assignment already viewed");
      return;
    }

    const { data, error } = await getAssignmentDetail(gameId, selectedPlayerId);

    if (error) {
      toast.error(error.message);
      return;
    }

    const assigmentDetails = Array.isArray(data) ? data[0] : data;

    if (!assigmentDetails?.receiver_id) {
      toast.error("Assignment not found");
      return;
    }

    // Update the status to show user has viewed
    updatePlayer(gameId, assigmentDetails.id, selectedPlayerId);

    // Find the assigned person
    const assigned = players.find((p) => p.id === assigmentDetails.receiver_id);

    // Delay for suspense
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setAssignedPlayer(assigned || null);
    setShowConfetti(true);

    // Update local state
    setPlayers(
      players.map((p) =>
        p.id === selectedPlayerId ? { ...p, viewed: true } : p,
      ),
    );

    setTimeout(() => setShowConfetti(false), 3000);

    setRevealingAssignment(false);
  };

  return {
    loading,
    game,
    showConfetti,
    players,
    assignedPlayer,
    selectedPlayerId,
    revealingAssignment,
    setSelectedPlayerId,
    handleRevealAssignment,
    setAssignedPlayer,
  };
};
