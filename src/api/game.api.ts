import { apiClient, handlerApiError } from "@/api/axios-instance";
import { CreateGameRequestDto } from "../types/dto/request/group-create-request.dto";
import { GroupResponseDto } from "../types/dto/response/group.response.dto";
import { HttpStatusCode } from "axios";
import { adaptGetGroupResponseToGroupModel } from "../adapter/http/response/group-response.adapter";
import { Group } from "@/types/view/group.type";
import { adaptResponseToAssigmentModel } from "@/adapter/http/response/assignment.adapter";
import { ApiResponse } from "@/types/api.types";
import { Assignment } from "@/types/view/assignment.type";

export const createGame = async (
  game: CreateGameRequestDto,
): Promise<ApiResponse<{ group_id: string }>> => {
  try {
    const response = await apiClient.post<{ group_id: string }>(`/game`, game);
    return { data: response.data };
  } catch (error: any) {
    return {
      data: null,
      error: handlerApiError(error),
    };
  }
};

export const getGame = async (gameId: string): Promise<ApiResponse<Group>> => {
  try {
    const response = await apiClient.get<GroupResponseDto>(
      `/api/v1/game/${gameId}/join`,
    );
    return {
      data: adaptGetGroupResponseToGroupModel(response.data),
    };
  } catch (error: any) {
    return {
      data: null,
      error: handlerApiError(error),
    };
  }
};

export const updatePlayer = async (
  groupId: string,
  assignmentId: string,
  playerId: string,
): Promise<ApiResponse<boolean>> => {
  try {
    const response = await apiClient.put(
      `/game/${groupId}/assignment/${assignmentId}?player_id=${playerId}`,
    );
    return {
      data: response.status == HttpStatusCode.NoContent,
    };
  } catch (error: any) {
    return {
      data: null,
      error: handlerApiError(error),
    };
  }
};

export const getAssignmentDetail = async (
  groupId: string,
  playerId: string,
): Promise<ApiResponse<Assignment>> => {
  try {
    const response = await apiClient.get(
      `/api/v1/game/${groupId}/assignment/${playerId}`,
    );
    return { data: adaptResponseToAssigmentModel(response.data) };
  } catch (error: any) {
    return {
      data: null,
      error: handlerApiError(error),
    };
  }
};
