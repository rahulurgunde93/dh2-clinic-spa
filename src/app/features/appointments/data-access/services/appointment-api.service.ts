import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiResponse } from '../../../../core/models/api-response.model';
import { ApiService } from '../../../../core/services/api.service';
import { Appointment } from '../../models/appointment.model';

@Injectable({
  providedIn: 'root',
})
export class AppointmentApiService {
  private readonly apiService = inject(ApiService);

  getAppointments(): Observable<ApiResponse<Appointment[]>> {
    return this.apiService.get<Appointment[]>('appointments');
  }
  getAppointment(id: number): Observable<ApiResponse<Appointment>> {
    return this.apiService.get<Appointment>(`appointments/${id}`);
  }
}
