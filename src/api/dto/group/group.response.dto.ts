import { AssignmentDto } from "../assignment.dto";
import { PlayerDto } from "../player.dto";

export interface GroupResponseDto {
    name: string;
    description: string;
    host: string;
    exchange_date: string;
    budget: number;
    participants: PlayerDto[];
    assignments: AssignmentDto[];
}