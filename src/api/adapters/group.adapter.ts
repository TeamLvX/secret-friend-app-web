import { Group } from "@/models/group"
import { GroupResponseDto } from "../dto/group/group.response.dto"

export const adaptGroup = (dto: GroupResponseDto): Group => {
    return {
        name: dto.name,
        description: dto.description,
        host: dto.host,
        exchange_date: dto.exchange_date,
        budget: dto.budget,
        players: dto.participants.map(player => ({
            ...player,
            id: player.id ?? "",
            viewed: player.viewed ?? false
        }))
    }
}