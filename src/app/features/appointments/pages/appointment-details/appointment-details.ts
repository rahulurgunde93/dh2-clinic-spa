import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppointmentStore } from '../../state/appointment.store';
import { ErrorPanel } from '../../../../shared/components/error-panel/error-panel';
import { PageHeader } from '../../../../shared/components/page-header/page-header';

@Component({
  selector: 'app-appointment-details',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatProgressSpinnerModule, ErrorPanel, PageHeader],
  templateUrl: './appointment-details.html',
  styleUrls: ['./appointment-details.scss'],
})
export class AppointmentDetails implements OnInit {
  private readonly route = inject(ActivatedRoute);

  readonly store = inject(AppointmentStore);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isNaN(id)) {
      this.store.loadAppointment(id);
    }
  }
}
