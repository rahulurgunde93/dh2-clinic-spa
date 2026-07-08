import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';

import { AppointmentStore } from '../../state/appointment.store';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { PageHeader } from '../../../../shared/components/page-header/page-header';
import { ErrorPanel } from '../../../../shared/components/error-panel/error-panel';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatTableModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    EmptyState,
    PageHeader,
    ErrorPanel
  ],
  templateUrl: './appointment-list.html',
  styleUrls: ['./appointment-list.scss'],
})
export class AppointmentList implements OnInit {
  readonly store = inject(AppointmentStore);

  readonly displayedColumns = ['id', 'patientName', 'appointmentDate', 'status', 'actions'];

  ngOnInit(): void {
    this.store.loadAppointments();
  }
}
