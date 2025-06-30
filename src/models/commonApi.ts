export interface IPaginatedResponse<T> {
  data: T[];
  hasNextPage: boolean;
  lastPageNumber: number;
  totalElements: number;
}

export interface IApiResponse {
  success: boolean;
  message: string;
}

export interface IPaginationParams {
  page?: number;
  count?: number;
}
