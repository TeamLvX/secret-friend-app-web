import { ApiError } from "@/types/api.types";
import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_SSF_API,
  headers: {
    "Content-Type": "application/json",
  },
});

export const handlerApiError = (error: any): ApiError => {
  if (error.response) {
    return {
      status: error.response.status,
      message: error.response.data.message || "Internal error server",
      details: error.response.data,
    };
  } else if (error.request) {
    return {
      status: 0,
      message: "We could not able to connect to the server",
    };
  } else {
    return { status: -1, message: error.message };
  }
};
