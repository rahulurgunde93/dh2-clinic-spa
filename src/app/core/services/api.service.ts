import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_CONFIG } from '../config/api.config';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http = inject(HttpClient);

  get<T>(endpoint: string, params?: HttpParams): Observable<ApiResponse<T>> {
    return this.http.get<ApiResponse<T>>(this.buildUrl(endpoint), { params });
  }

  post<TRequest, TResponse>(
    endpoint: string,
    request: TRequest,
  ): Observable<ApiResponse<TResponse>> {
    return this.http.post<ApiResponse<TResponse>>(this.buildUrl(endpoint), request);
  }

  put<TRequest, TResponse>(
    endpoint: string,
    request: TRequest,
  ): Observable<ApiResponse<TResponse>> {
    return this.http.put<ApiResponse<TResponse>>(this.buildUrl(endpoint), request);
  }

  patch<TRequest, TResponse>(
    endpoint: string,
    request: TRequest,
  ): Observable<ApiResponse<TResponse>> {
    return this.http.patch<ApiResponse<TResponse>>(this.buildUrl(endpoint), request);
  }

  delete<T>(endpoint: string): Observable<ApiResponse<T>> {
    return this.http.delete<ApiResponse<T>>(this.buildUrl(endpoint));
  }

  private buildUrl(endpoint: string): string {
    const normalizedEndpoint = endpoint.replace(/^\/+/, '');

    return `${API_CONFIG.baseUrl}/${normalizedEndpoint}`;
  }
}
