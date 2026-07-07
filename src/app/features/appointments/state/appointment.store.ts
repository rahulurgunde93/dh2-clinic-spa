import { computed, inject, Injectable, signal } from '@angular/core';

import { ApplicationError } from '../../../core/models/application-error.model';
import { AppointmentApiService } from '../data-access/services/appointment-api.service';
import { Appointment } from '../models/appointment.model';

@Injectable({
  providedIn: 'root',
})
export class AppointmentStore {
  private readonly appointmentApiService = inject(AppointmentApiService);

  readonly appointments = signal<Appointment[]>([]);
  readonly selectedAppointment = signal<Appointment | null>(null);
  readonly loading = signal(false);

  readonly error = signal<ApplicationError | null>(null);

  readonly hasAppointments = computed(() => this.appointments().length > 0);
  readonly hasSelectedAppointment = computed(() => this.selectedAppointment() !== null);

  loadAppointments(): void {
    this.loading.set(true);

    this.appointmentApiService.getAppointments().subscribe({
      next: (response) => {
        this.appointments.set(response.data);
        this.error.set(null);
        this.loading.set(false);
      },

      error: (error: ApplicationError) => {
        this.appointments.set([]);
        this.error.set(error);
        this.loading.set(false);
      },
    });
  }

  loadAppointment(id: number): void {
    this.loading.set(true);

    this.appointmentApiService.getAppointment(id).subscribe({
      next: (response) => {
        this.selectedAppointment.set(response.data);
        this.error.set(null);
        this.loading.set(false);
      },

      error: (error: ApplicationError) => {
        this.selectedAppointment.set(null);
        this.error.set(error);
        this.loading.set(false);
      },
    });
  }
}
