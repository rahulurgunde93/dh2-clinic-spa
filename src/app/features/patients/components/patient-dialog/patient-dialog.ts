import { CommonModule } from '@angular/common';
import { signal, Component, inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { PatientForm } from '../patient-form/patient-form';

import { PatientApiService } from '../../data-access/services/patient-api.service';

import { Patient } from '../../data-access/models/patient.model';

import { CreatePatientRequest } from '../../data-access/models/create-patient-request.model';

import { UpdatePatientRequest } from '../../data-access/models/update-patient-request.model';

@Component({
  selector: 'app-patient-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, PatientForm],
  templateUrl: './patient-dialog.html',
  styleUrls: ['./patient-dialog.scss'],
})
export class PatientDialog {
  private readonly dialogRef = inject(MatDialogRef<PatientDialog>);

  private readonly patientApi = inject(PatientApiService);

  readonly patient = inject<Patient | null>(MAT_DIALOG_DATA, {
    optional: true,
  });
  readonly saving = signal(false);

  readonly isEditMode = this.patient !== null;
  save(formComponent: PatientForm): void {
    if (formComponent.form.invalid) {
      formComponent.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);

    if (this.isEditMode) {
      const request: UpdatePatientRequest = {
        id: this.patient!.id,
        ...formComponent.form.getRawValue(),
      };

      this.patientApi.updatePatient(request).subscribe({
        next: () => {
          this.saving.set(false);
          this.dialogRef.close(true);
        },
        error: (error) => {
          this.saving.set(false);
          console.error(error);
        },
      });

      return;
    }

    const request: CreatePatientRequest = formComponent.form.getRawValue();

    this.saving.set(true);

    this.patientApi.createPatient(request).subscribe({
      next: () => {
        this.saving.set(false);
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.saving.set(false);
        console.error(error);
      },
    });
  }
}
