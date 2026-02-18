import { Player } from "./player.type";

export interface Group {
    name: string;
    description: string;
    host: string;
    exchange_date: string;
    budget: number;
    players: Player[];
}