import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { PatientApiService } from '../../../patients/data-access/services/patient-api.service';
import { Patient } from '../../../patients/data-access/models/patient.model';

import { Appointment } from '../../data-access/models/appointment.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-appointment-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatDialogModule,
    MatButtonModule,

    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,

    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
  ],
  templateUrl: './appointment-dialog.html',
  styleUrls: ['./appointment-dialog.scss'],
})
export class AppointmentDialog implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly patientApi = inject(PatientApiService);
  private readonly dialogRef = inject(MatDialogRef<AppointmentDialog>);
  readonly appointment = inject<Appointment | null>(MAT_DIALOG_DATA, { optional: true });

  patients: Patient[] = [];
  saving = false;

  readonly form = this.fb.group({
    patientId: [null as number | null, Validators.required],
    appointmentDate: [null as Date | null, Validators.required],
    status: ['Scheduled', Validators.required],
  });
  private readonly cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.patientApi.getPatients().subscribe({
      next: (response) => {
        this.patients = response.data;

        if (this.appointment) {
          this.form.patchValue({
            patientId: this.appointment.patientId,
            appointmentDate: new Date(this.appointment.appointmentDate),
            status: this.appointment.status,
          });
        }
        this.cdr.detectChanges();
      },
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.saving = true;
    this.dialogRef.close(this.form.getRawValue());
  }
}
