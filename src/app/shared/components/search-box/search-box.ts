import {inject, Component,signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { PatientSearchService } from '../../../features/patients/data-access/services/patient-search.service';
import { PatientSearchResult } from '../../../features/patients/models/patient-search-result.model';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatAutocompleteModule,
  ],
  templateUrl: './search-box.html',
  styleUrls: ['./search-box.scss'],
})
export class SearchBox {
  readonly searchControl = new FormControl('');
  private readonly patientSearch = inject(PatientSearchService);
  readonly results = signal<PatientSearchResult[]>([]);
  private readonly router = inject(Router);

  constructor() {
    this.searchControl.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter((value) => !!value && value.trim().length >= 2),
        switchMap((value) => this.patientSearch.search(value!.trim())),
      )
      .subscribe((response) => {
        this.results.set(response.data);
      });
  }

  displayPatient(patient: PatientSearchResult | null): string {
    return patient ? `${patient.firstName} ${patient.lastName}` : '';
  }

  selectPatient(patient: PatientSearchResult): void {
    void this.router.navigate(['/patients', patient.id]);
    this.searchControl.setValue('');
    this.results.set([]);
  }
}
