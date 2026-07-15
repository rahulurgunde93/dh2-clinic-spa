import { Component, OnInit, inject, AfterViewInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentStore } from '../../state/appointment.store';
import { MatChipsModule } from '@angular/material/chips';

import { PageHeader } from '../../../../shared/components/page-header/page-header';
import { LoadingSpinner } from '../../../../shared/components/loading-spinner/loading-spinner';
import { ErrorPanel } from '../../../../shared/components/error-panel/error-panel';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';

import { DataTable } from '../../../../shared/components/data-table/data-table';
import { DataTableColumn } from '../../../../shared/components/data-table/models/data-table-column.model';
import { Appointment } from '../../data-access/models/appointment.model';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';

import { CsvExportUtil } from '../../../../shared/utils/csv-export.util';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppointmentDialog } from '../../components/appointment-dialog/appointment-dialog';

import { ConfirmationDialog, ConfirmationDialogData } from '../../../../shared/components/confirmation-dialog/confirmation-dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [
    CommonModule,
    PageHeader,
    LoadingSpinner,
    ErrorPanel,
    EmptyState,
    DataTable,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  templateUrl: './appointment-list.html',
  styleUrls: ['./appointment-list.scss'],
})
export class AppointmentList implements OnInit, AfterViewInit {
  readonly store = inject(AppointmentStore);
  readonly columns: DataTableColumn<Appointment>[] = [
    {
      key: 'patientName',
      header: 'Patient',
      sortable: true,
    },
    {
      key: 'appointmentDate',
      header: 'Appointment',
      sortable: true,
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
    },
    {
      key: '__actions',
      header: 'Actions',
      sortable: false,
    },
  ];

  searchText = '';
  statusFilter: 'All' | 'Scheduled' | 'Completed' | 'Cancelled' = 'All';
  setStatusFilter(status: 'All' | 'Scheduled' | 'Completed' | 'Cancelled' | undefined): void {
    this.statusFilter = status ?? 'All';
  }
  pageSize = 5;
  pageIndex = 0;
  sortColumn: keyof Appointment = 'patientName';
  sortDirection: 'asc' | 'desc' = 'asc';
  @ViewChild('actionsTemplate')
  actionsTemplate!: TemplateRef<Appointment>;
  cellTemplates: Record<string, TemplateRef<unknown>> = {};
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.store.loadAppointments();
  }

  ngAfterViewInit(): void {
    this.cellTemplates = {
      __actions: this.actionsTemplate,
    };
  }

  onSearchChanged(value: string): void {
    this.searchText = value;
  }

  filteredAppointments(): Appointment[] {
    let appointments = this.store.appointments();

    if (this.statusFilter !== 'All') {
      appointments = appointments.filter((appointment) => appointment.status === this.statusFilter);
    }

    const search = this.searchText.trim().toLowerCase();

    if (!search) {
      return appointments;
    }

    return appointments.filter(
      (appointment) =>
        appointment.patientName.toLowerCase().includes(search) ||
        appointment.status.toLowerCase().includes(search),
    );
  }

  pagedAppointments(): Appointment[] {
    const sorted = [...this.filteredAppointments()].sort((a, b) => {
      const left = String(a[this.sortColumn]);
      const right = String(b[this.sortColumn]);
      const comparison = left.localeCompare(right, undefined, {
        numeric: true,
        sensitivity: 'base',
      });
      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
    const start = this.pageIndex * this.pageSize;
    return sorted.slice(start, start + this.pageSize);
  }

  onPageChanged(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  sortChanged(sort: Sort): void {
    this.sortColumn = (sort.active || 'patientName') as keyof Appointment;
    this.sortDirection = (sort.direction || 'asc') as 'asc' | 'desc';
    this.pageIndex = 0;
  }

  exportAppointments(): void {
    const appointments = this.filteredAppointments().map((appointment) => ({
      Id: appointment.id,
      Patient: appointment.patientName,
      AppointmentDate: appointment.appointmentDate,
      Status: appointment.status,
    }));

    CsvExportUtil.export('appointments.csv', appointments);
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(AppointmentDialog, {
      width: '650px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }

      this.store.createAppointment(result);

      this.snackBar.open('Appointment created successfully.', 'Close', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });

      this.store.loadAppointments();
    });
  }

  viewAppointment(appointment: Appointment): void {
    this.router.navigate(['/appointments', appointment.id]);
  }

  editAppointment(appointment: Appointment): void {
    const dialogRef = this.dialog.open(AppointmentDialog, {
      width: '650px',
      disableClose: true,
      data: appointment,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }

      this.store.updateAppointment({
        id: appointment.id,
        patientId: result.patientId,
        appointmentDate: result.appointmentDate,
        status: result.status,

        // keep existing values for fields not edited yet
        doctorName: appointment.doctorName,
        durationMinutes: appointment.durationMinutes,
        notes: appointment.notes,
      });

      this.snackBar.open('Appointment updated successfully.', 'Close', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });

      this.store.loadAppointments();
    });
  }

  deleteAppointment(appointment: Appointment): void {
    this.dialog
      .open(ConfirmationDialog, {
        width: '420px',

        data: <ConfirmationDialogData>{
          title: 'Delete Appointment',
          message: `Are you sure you want to delete the appointment for ${appointment.patientName}?`,
          confirmText: 'Delete',
          cancelText: 'Cancel',
        },
      })
      .afterClosed()
      .subscribe((confirmed) => {
        if (!confirmed) {
          return;
        }

        this.store.deleteAppointment(appointment.id);

        // If deleting the last item on the current page,
        // navigate back one page.
        const remainingItems = this.filteredAppointments().length - 1;

        const maxPage = Math.max(Math.ceil(remainingItems / this.pageSize) - 1, 0);

        if (this.pageIndex > maxPage) {
          this.pageIndex = maxPage;
        }

        this.snackBar.open('Appointment deleted successfully.', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });

        this.store.loadAppointments();
      });
  }
}
