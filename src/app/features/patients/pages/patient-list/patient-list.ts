import { Component, OnInit, inject, effect } from '@angular/core';
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
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';

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
    MatPaginatorModule,
    MatSortModule,
  ],
  templateUrl: './patient-list.html',
  styleUrls: ['./patient-list.scss'],
})
export class PatientList implements OnInit {
  readonly store = inject(PatientStore);
  readonly displayedColumns = ['id', 'firstName', 'lastName', 'actions'];
  private readonly dialog = inject(MatDialog);
  pageSize = 5;
  pageIndex = 0;
  sortColumn: keyof Patient = 'id';
  sortDirection: 'asc' | 'desc' = 'asc';
  filterText = '';

  constructor() {
    effect(() => {
      const total = this.store.patients().length;

      const maxPage = Math.max(Math.ceil(total / this.pageSize) - 1, 0);

      if (this.pageIndex > maxPage) {
        this.pageIndex = maxPage;
      }
    });
  }

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
        const maxPage = Math.max(Math.ceil(this.store.patients().length / this.pageSize) - 1, 0);

        if (this.pageIndex > maxPage) {
          this.pageIndex = maxPage;
        }
      });
  }

  pagedPatients(): Patient[] {
    const sorted = [...this.filteredPatients()].sort((a, b) => {
      const left = String(a[this.sortColumn]);
      const right = String(b[this.sortColumn]);

      const comparison = left.localeCompare(right, undefined, {
        sensitivity: 'base',
        numeric: true,
      });

      return this.sortDirection === 'asc' ? comparison : -comparison;
    });

    const start = this.pageIndex * this.pageSize;
    return sorted.slice(start, start + this.pageSize);
  }
  sortChanged(sort: Sort): void {
    this.sortColumn = (sort.active || 'id') as keyof Patient;
    this.sortDirection = (sort.direction || 'asc') as 'asc' | 'desc';

    this.pageIndex = 0;
  }
  filteredPatients(): Patient[] {
    const filter = this.filterText.trim().toLowerCase();

    if (!filter) {
      return this.store.patients();
    }

    return this.store
      .patients()
      .filter(
        (patient) =>
          patient.firstName.toLowerCase().includes(filter) ||
          patient.lastName.toLowerCase().includes(filter) ||
          patient.email.toLowerCase().includes(filter),
      );
  }
  onFilterChanged(value: string): void {
    this.filterText = value;
    this.pageIndex = 0;
  }
}
