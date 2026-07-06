import { ApiError } from './api-error.model';

export interface ApiResponse<T> {
  data: T;
  errors: ApiError[];
}
