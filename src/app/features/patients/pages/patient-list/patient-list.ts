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

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MatTableModule, MatButtonModule, MatProgressSpinnerModule,
    MatCardModule, EmptyState, PageHeader, ErrorPanel],
  templateUrl: './patient-list.html',
  styleUrls: ['./patient-list.scss'],
})
export class PatientList implements OnInit {
  readonly store = inject(PatientStore);
  readonly displayedColumns = ['id', 'firstName', 'lastName', 'actions'];

  ngOnInit(): void {
    this.store.loadPatients();
  }
}
