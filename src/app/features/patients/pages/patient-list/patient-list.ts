import { Component, inject, OnInit } from '@angular/core';

import { PatientStore } from '../../state/patient.store';

@Component({
  selector: 'app-patient-list',
  imports: [],
  templateUrl: './patient-list.html',
  styleUrl: './patient-list.scss',
})
export class PatientList implements OnInit {
  readonly store = inject(PatientStore);

  ngOnInit(): void {
    this.store.loadPatients();
  }
}
