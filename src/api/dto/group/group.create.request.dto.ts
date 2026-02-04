import { PlayerDto } from "../player.dto";

export interface CreateGameRequestDto {
    name: string;
    description: string;
    host: string;
    exchange_date: string;
    budget: number;
    players: PlayerDto[];
}