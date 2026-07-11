import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_ENDPOINTS } from '../../../../core/constants/api-endpoints.constants';
import { ApiResponse } from '../../../../core/models/api-response.model';
import { ApiService } from '../../../../core/services/api.service';
import { Patient } from '../models/patient.model';
import { CreatePatientRequest } from '../models/create-patient-request.model';

@Injectable({
  providedIn: 'root',
})
export class PatientApiService {
  private readonly apiService = inject(ApiService);

  getPatients(): Observable<ApiResponse<Patient[]>> {
    return this.apiService.get<Patient[]>(API_ENDPOINTS.patients);
  }

  getPatient(id: number): Observable<ApiResponse<Patient>> {
    return this.apiService.get<Patient>(`${API_ENDPOINTS.patients}/${id}`);
  }

  createPatient(request: CreatePatientRequest): Observable<ApiResponse<Patient>> {
    return this.apiService.post<CreatePatientRequest, Patient>('patients', request);
  }
}
