import { computed, inject, Injectable, signal } from '@angular/core';

import { ApplicationError } from '../../../core/models/application-error.model';
import { Patient } from '../data-access/models/patient.model';
import { PatientApiService } from '../data-access/services/patient-api.service';

@Injectable({
  providedIn: 'root',
})
export class PatientStore {
  private readonly patientApiService = inject(PatientApiService);

  private readonly patientsState = signal<Patient[]>([]);
  private readonly loadingState = signal(false);
  private readonly errorState = signal<ApplicationError | null>(null);

  readonly patients = this.patientsState.asReadonly();
  readonly loading = this.loadingState.asReadonly();
  readonly error = this.errorState.asReadonly();

  readonly hasPatients = computed(() => this.patients().length > 0);

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
}
