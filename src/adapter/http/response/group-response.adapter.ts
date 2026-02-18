import { GroupResponseDto } from "@/types/dto/response/group.response.dto"
import { Group } from "@/types/view/group.type"

export const adaptGetGroupResponseToGroupModel = (dto: GroupResponseDto): Group => {
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