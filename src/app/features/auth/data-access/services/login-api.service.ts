import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiResponse } from '../../../../core/models/api-response.model';
import { ApiService } from '../../../../core/services/api.service';

import { LoginRequest } from '../models/login-request.model';
import { LoginResponse } from '../models/login-response.model';

@Injectable({
  providedIn: 'root',
})
export class LoginApiService {
  private readonly api = inject(ApiService);

  login(request: LoginRequest): Observable<ApiResponse<LoginResponse>> {
    return this.api.post<LoginRequest, LoginResponse>('/auth/login', request);
  }
}
