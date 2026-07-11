import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { PatientForm } from '../patient-form/patient-form';
import { PatientApiService } from '../../data-access/services/patient-api.service';
import { CreatePatientRequest } from '../../data-access/models/create-patient-request.model';

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

  save(formComponent: PatientForm): void {
    if (formComponent.form.invalid) {
      formComponent.form.markAllAsTouched();
      return;
    }

    const request: CreatePatientRequest = formComponent.form.getRawValue();

    this.patientApi.createPatient(request).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },

      error: (error) => {
        console.error('Unable to create patient.', error);
      },
    });
  }
}
