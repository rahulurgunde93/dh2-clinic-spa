import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Appointment } from '../data-access/models/appointment.model';
import { CreateAppointment } from '../data-access/models/create-appointment.model';
import { UpdateAppointment } from '../data-access/models/update-appointment.model';
import { APPOINTMENT_API } from './appointment-api.constants';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private readonly http = inject(HttpClient);

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(APPOINTMENT_API.appointments);
  }

  getAppointment(id: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${APPOINTMENT_API.appointments}/${id}`);
  }

  createAppointment(request: CreateAppointment): Observable<Appointment> {
    return this.http.post<Appointment>(APPOINTMENT_API.appointments, request);
  }

  updateAppointment(request: UpdateAppointment): Observable<void> {
    return this.http.put<void>(`${APPOINTMENT_API.appointments}/${request.id}`, request);
  }

  deleteAppointment(id: number): Observable<void> {
    return this.http.delete<void>(`${APPOINTMENT_API.appointments}/${id}`);
  }
}
