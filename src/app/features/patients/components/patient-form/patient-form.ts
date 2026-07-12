import { CommonModule } from '@angular/common';

import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { Patient } from '../../data-access/models/patient.model';

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './patient-form.html',
})
export class PatientForm implements OnChanges {
  private readonly fb = inject(FormBuilder);

  @Input()
  patient: Patient | null = null;

  readonly form = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    status: this.fb.control<'Active' | 'Inactive'>('Active', {
      validators: Validators.required,
      nonNullable: true,
    }),
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['patient'] || !this.patient) {
      return;
    }

    this.form.patchValue({
      firstName: this.patient.firstName,
      lastName: this.patient.lastName,
      email: this.patient.email,
      phoneNumber: this.patient.phoneNumber,
      dateOfBirth: this.patient.dateOfBirth,
      status: this.patient.status,
    });
  }
}
