export interface ApiResponse<T> {
  data: T | T[] | null;
  error?: ApiError | null;
}

export interface ApiError {
  status: number;
  message: string;
  details?: Record<string, string>;
}