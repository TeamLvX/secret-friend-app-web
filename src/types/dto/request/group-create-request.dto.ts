import { Player } from "@/types/view/player.type";

export interface CreateGameRequestDto {
    name: string;
    description: string;
    host: string;
    exchange_date: string;
    budget: number;
    players: Player[];
}