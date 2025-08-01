export interface IPagination {
  start: number;
  end: number;
  total: number;
  pageDisplayText: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalPages: number;
  isEmpty: boolean;
}
