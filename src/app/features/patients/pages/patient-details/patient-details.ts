import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { PatientStore } from '../../state/patient.store';
import { ErrorPanel } from '../../../../shared/components/error-panel/error-panel';
import { PageHeader } from '../../../../shared/components/page-header/page-header';

@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [RouterLink, MatButtonModule,
    MatCardModule, ErrorPanel, PageHeader],
  templateUrl: './patient-details.html',
  styleUrls: ['./patient-details.scss'],
})
export class PatientDetails implements OnInit {
  private readonly route = inject(ActivatedRoute);

  readonly store = inject(PatientStore);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isNaN(id)) {
      this.store.loadPatient(id);
    }
  }
}
