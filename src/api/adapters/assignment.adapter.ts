import { Assignment } from "@/models/assignment";
import { AssignmentDto } from "../dto/assignment.dto";

export const adaptAssigment = (dto: AssignmentDto): Assignment => {
    return {
        id: dto.id,
        giver_id: dto.giver_id,
        giver_name: dto.giver_name,
        receiver_id: dto.receiver_id,
        receiver_name: dto.receiver_name,
        status: dto.status,
        shown_at: dto.shown_at
    }
}