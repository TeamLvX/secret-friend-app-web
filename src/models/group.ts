import { Assignment } from "./assignment";
import { Player } from "./participant";

export interface Group {
    name: string;
    description: string;
    host: string;
    exchange_date: string;
    budget: number;
    players: Player[];
}