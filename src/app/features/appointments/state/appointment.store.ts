import { Injectable, computed, inject, signal } from '@angular/core';

import { AppointmentApiService } from '../data-access/services/appointment-api.service';
import { Appointment } from '../data-access/models/appointment.model';
import { CreateAppointment } from '../data-access/models/create-appointment.model';
import { UpdateAppointment } from '../data-access/models/update-appointment.model';

import { ApplicationError } from '../../../core/models/application-error.model';

@Injectable({
  providedIn: 'root',
})
export class AppointmentStore {
  private readonly appointmentApiService = inject(AppointmentApiService);

  private readonly appointmentsState = signal<Appointment[]>([]);
  private readonly selectedAppointmentState = signal<Appointment | null>(null);

  private readonly loadingState = signal(false);
  private readonly deletingState = signal(false);
  private readonly errorState = signal<ApplicationError | null>(null);

  readonly appointments = this.appointmentsState.asReadonly();
  readonly selectedAppointment = this.selectedAppointmentState.asReadonly();

  readonly loading = this.loadingState.asReadonly();
  readonly deleting = this.deletingState.asReadonly();
  readonly error = this.errorState.asReadonly();

  readonly hasAppointments = computed(() => this.appointments().length > 0);

  readonly hasSelectedAppointment = computed(() => this.selectedAppointment() !== null);

  loadAppointments(): void {
    this.loadingState.set(true);
    this.errorState.set(null);

    this.appointmentApiService.getAppointments().subscribe({
      next: (response) => {
        this.appointmentsState.set(response.data);
        this.loadingState.set(false);
      },

      error: (error: ApplicationError) => {
        this.errorState.set(error);
        this.loadingState.set(false);
      },
    });
  }

  loadAppointment(id: number): void {
    this.loadingState.set(true);
    this.errorState.set(null);

    this.appointmentApiService.getAppointment(id).subscribe({
      next: (response) => {
        this.selectedAppointmentState.set(response.data);
        this.loadingState.set(false);
      },

      error: (error: ApplicationError) => {
        this.selectedAppointmentState.set(null);
        this.errorState.set(error);
        this.loadingState.set(false);
      },
    });
  }

  createAppointment(request: CreateAppointment): void {
    this.loadingState.set(true);

    this.appointmentApiService.createAppointment(request).subscribe({
      next: () => {
        this.loadingState.set(false);
        this.loadAppointments();
      },

      error: (error: ApplicationError) => {
        this.errorState.set(error);
        this.loadingState.set(false);
      },
    });
  }

  updateAppointment(request: UpdateAppointment): void {
    this.loadingState.set(true);

    this.appointmentApiService.updateAppointment(request).subscribe({
      next: () => {
        this.loadAppointments();
      },

      error: (error: ApplicationError) => {
        this.errorState.set(error);
        this.loadingState.set(false);
      },
    });
  }

  deleteAppointment(id: number): void {
    this.deletingState.set(true);

    this.appointmentApiService.deleteAppointment(id).subscribe({
      next: () => {
        this.deletingState.set(false);
        this.loadAppointments();
      },

      error: (error: ApplicationError) => {
        this.errorState.set(error);
        this.deletingState.set(false);
      },
    });
  }
}
