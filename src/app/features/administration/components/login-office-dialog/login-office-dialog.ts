import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { LoginOffice } from '../../data-access/models/login-office.model';
import { A11yModule } from '@angular/cdk/a11y';

@Component({
  selector: 'app-login-office-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    A11yModule,
  ],
  templateUrl: './login-office-dialog.html',
  styleUrls: ['./login-office-dialog.scss'],
})
export class LoginOfficeDialog implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<LoginOfficeDialog>);
  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    code: ['', Validators.required],
    city: ['', Validators.required],
    status: ['Active' as 'Active' | 'Inactive'],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public office: LoginOffice | null,
  ) {}

  ngOnInit(): void {
    if (this.office) {
      this.form.patchValue(this.office);
    }
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    this.dialogRef.close({
      ...value,
      name: value.name.trim(),
      code: value.code.trim(),
      city: value.city.trim(),
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
