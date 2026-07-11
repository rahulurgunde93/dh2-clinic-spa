import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../../../core/services/api.service';
import { ApiResponse } from '../../../../core/models/api-response.model';

import { PatientSearchResult } from '../../models/patient-search-result.model';

@Injectable({
  providedIn: 'root',
})
export class PatientSearchService {
  private readonly api = inject(ApiService);

  search(query: string): Observable<ApiResponse<PatientSearchResult[]>> {
    return this.api.get<PatientSearchResult[]>(
      `/patients/search?query=${encodeURIComponent(query)}`,
    );
  }
}
