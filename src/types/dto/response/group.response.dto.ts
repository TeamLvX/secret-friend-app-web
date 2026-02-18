import { Assignment } from "@/types/view/assignment.type";
import { Player } from "@/types/view/player.type";

export interface GroupResponseDto {
    name: string;
    description: string;
    host: string;
    exchange_date: string;
    budget: number;
    participants: Player[];
    assignments: Assignment[];
}