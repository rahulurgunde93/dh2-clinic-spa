import { computed, inject, Injectable, signal } from '@angular/core';

import { ApplicationError } from '../../../core/models/application-error.model';
import { Patient } from '../data-access/models/patient.model';
import { PatientApiService } from '../data-access/services/patient-api.service';
import { CreatePatientRequest } from '../data-access/models/create-patient-request.model';

@Injectable({
  providedIn: 'root',
})
export class PatientStore {
  private readonly patientApiService = inject(PatientApiService);

  private readonly patientsState = signal<Patient[]>([]);
  private readonly selectedPatientState = signal<Patient | null>(null);
  private readonly loadingState = signal(false);
  private readonly errorState = signal<ApplicationError | null>(null);

  readonly patients = this.patientsState.asReadonly();
  readonly selectedPatient = this.selectedPatientState.asReadonly();
  readonly loading = this.loadingState.asReadonly();
  readonly error = this.errorState.asReadonly();

  readonly hasPatients = computed(() => this.patients().length > 0);
  readonly hasSelectedPatient = computed(() => this.selectedPatient() !== null);
  readonly deleting = signal(false);

  loadPatients(): void {
    this.loadingState.set(true);
    this.errorState.set(null);

    this.patientApiService.getPatients().subscribe({
      next: (response) => {
        this.patientsState.set(response.data);
        this.loadingState.set(false);
      },
      error: (error: ApplicationError) => {
        this.errorState.set(error);
        this.loadingState.set(false);
      },
    });
  }
  loadPatient(id: number): void {
    this.loadingState.set(true);
    this.errorState.set(null);

    this.patientApiService.getPatient(id).subscribe({
      next: (response) => {
        this.selectedPatientState.set(response.data);
        this.loadingState.set(false);
      },
      error: (error: ApplicationError) => {
        this.selectedPatientState.set(null);
        this.errorState.set(error);
        this.loadingState.set(false);
      },
    });
  }
  addPatient(request: CreatePatientRequest): void {
    this.loadingState.set(true);

    this.patientApiService.createPatient(request).subscribe({
      next: (response) => {
        this.patientsState.update((patients) => [...patients, response.data]);

        this.loadingState.set(false);
        this.errorState.set(null);
      },

      error: (error) => {
        this.loadingState.set(false);
        this.errorState.set(error);
      },
    });
  }
  deletePatient(id: number): void {
    this.deleting.set(true);

    this.patientApiService.deletePatient(id).subscribe({
      next: () => {
        this.deleting.set(false);
        this.loadPatients();
      },

      error: (error) => {
        this.deleting.set(false);
        this.errorState.set(error);
      },
    });
  }
}
