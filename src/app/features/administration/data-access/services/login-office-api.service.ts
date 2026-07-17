import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../../../core/services/api.service';
import { ApiResponse } from '../../../../core/models/api-response.model';
import { API_ENDPOINTS } from '../../../../core/constants/api-endpoints.constants';

import { LoginOffice } from '../models/login-office.model';
import { CreateLoginOfficeRequest } from '../models/create-login-office-request.model';
import { UpdateLoginOfficeRequest } from '../models/update-login-office-request.model';

@Injectable({
  providedIn: 'root',
})
export class LoginOfficeApiService {
  private readonly api = inject(ApiService);

  getLoginOffices(): Observable<ApiResponse<LoginOffice[]>> {
    return this.api.get<LoginOffice[]>(API_ENDPOINTS.loginOffices);
  }

  getLoginOffice(id: number): Observable<ApiResponse<LoginOffice>> {
    return this.api.get<LoginOffice>(`${API_ENDPOINTS.loginOffices}/${id}`);
  }

  createLoginOffice(request: CreateLoginOfficeRequest): Observable<ApiResponse<LoginOffice>> {
    return this.api.post<CreateLoginOfficeRequest, LoginOffice>(
      API_ENDPOINTS.loginOffices,
      request,
    );
  }

  updateLoginOffice(request: UpdateLoginOfficeRequest): Observable<ApiResponse<LoginOffice>> {
    return this.api.put<UpdateLoginOfficeRequest, LoginOffice>(
      `${API_ENDPOINTS.loginOffices}/${request.id}`,
      request,
    );
  }

  deleteLoginOffice(id: number): Observable<ApiResponse<boolean>> {
    return this.api.delete<boolean>(`${API_ENDPOINTS.loginOffices}/${id}`);
  }
}
