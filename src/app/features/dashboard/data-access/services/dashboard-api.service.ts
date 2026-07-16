import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiResponse } from '../../../../core/models/api-response.model';
import { ApiService } from '../../../../core/services/api.service';

import { DashboardResponse } from '../models/dashboard-response.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardApiService {
  private readonly apiService = inject(ApiService);

  getDashboard(): Observable<ApiResponse<DashboardResponse>> {
    return this.apiService.get<DashboardResponse>('dashboard');
  }
}
