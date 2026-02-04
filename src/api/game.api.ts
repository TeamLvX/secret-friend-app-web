import instance from "@/utils/axios-instance";
import { CreateGameRequestDto } from "./dto/group/group.create.request.dto";
import { GroupResponseDto } from "./dto/group/group.response.dto";
import { HttpStatusCode } from "axios";
import { adaptGroup } from "./adapters/group.adapter";
import { Group } from "@/models/group";
import { adaptAssigment } from "./adapters/assignment.adapter";

export const createGame = async (game: CreateGameRequestDto) => {
  const response = await instance.post(`/api/v1/game`, game);
  return response.data;
}

export const getGame = async (gameId: string): Promise<Group> => {
  const response = await instance.get<GroupResponseDto>(`/api/v1/game/${gameId}/join`);
  return adaptGroup(response.data);
}

export const updatePlayer = async (groupId: string, assignmentId: string, playerId:string) => {
  const response = await instance.put(`/api/v1/game/${groupId}/assignment/${assignmentId}?player_id=${playerId}`);
  return response.status == HttpStatusCode.NoContent;
}

export const getAssignmentDetail = async (groupId: string, playerId: string) => {
  const response = await instance.get(`/api/v1/game/${groupId}/assignment/${playerId}`);
  return adaptAssigment(response.data);
}