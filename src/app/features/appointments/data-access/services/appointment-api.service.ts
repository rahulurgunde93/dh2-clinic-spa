import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiResponse } from '../../../../core/models/api-response.model';
import { ApiService } from '../../../../core/services/api.service';

import { Appointment } from '../models/appointment.model';
import { CreateAppointment } from '../models/create-appointment.model';
import { UpdateAppointment } from '../models/update-appointment.model';

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

  createAppointment(request: CreateAppointment): Observable<ApiResponse<Appointment>> {
    return this.apiService.post<CreateAppointment, Appointment>('appointments', request);
  }

  updateAppointment(request: UpdateAppointment): Observable<ApiResponse<void>> {
    return this.apiService.put<UpdateAppointment, void>(`appointments/${request.id}`, request);
  }

  deleteAppointment(id: number): Observable<ApiResponse<void>> {
    return this.apiService.delete<void>(`appointments/${id}`);
  }
}
