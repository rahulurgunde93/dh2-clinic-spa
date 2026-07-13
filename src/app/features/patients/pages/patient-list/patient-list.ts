import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { PatientStore } from '../../state/patient.store';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';

import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { PageHeader } from '../../../../shared/components/page-header/page-header';
import { ErrorPanel } from '../../../../shared/components/error-panel/error-panel';

import { MatDialog } from '@angular/material/dialog';
import { PatientDialog } from '../../components/patient-dialog/patient-dialog';
import { LoadingSpinner } from '../../../../shared/components/loading-spinner/loading-spinner';
import { Patient } from '../../data-access/models/patient.model';

import { ConfirmationDialog } from '../../../../shared/components/confirmation-dialog/confirmation-dialog';
import { ConfirmationDialogData } from '../../../../shared/components/confirmation-dialog/confirmation-dialog';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    EmptyState,
    PageHeader,
    ErrorPanel,
    LoadingSpinner,
    RouterLink,
  ],
  templateUrl: './patient-list.html',
  styleUrls: ['./patient-list.scss'],
})
export class PatientList implements OnInit {
  readonly store = inject(PatientStore);
  readonly displayedColumns = ['id', 'firstName', 'lastName', 'actions'];
  private readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.store.loadPatients();
  }
  openCreateDialog(): void {
    this.dialog
      .open(PatientDialog, {
        width: '700px',
        disableClose: true,
      })
      .afterClosed()
      .subscribe((saved) => {
        if (saved) {
          this.store.loadPatients();
        }
      });
  }
  openEditDialog(patient: Patient): void {
    this.dialog
      .open(PatientDialog, {
        width: '700px',

        disableClose: true,

        data: patient,
      })
      .afterClosed()
      .subscribe((saved) => {
        if (saved) {
          this.store.loadPatients();
        }
      });
  }
  deletePatient(patient: Patient): void {
    this.dialog
      .open(ConfirmationDialog, {
        width: '420px',

        data: <ConfirmationDialogData>{
          title: 'Delete Patient',
          message: `Are you sure you want to delete ${patient.firstName} ${patient.lastName}?`,
          confirmText: 'Delete',
          cancelText: 'Cancel',
        },
      })
      .afterClosed()
      .subscribe((confirmed) => {
        if (!confirmed) {
          return;
        }

        this.store.deletePatient(patient.id);
      });
  }
}
