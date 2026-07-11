import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ApiService } from '../../../../core/services/api.service';
import { PatientApiService } from './patient-api.service';
import { CreatePatientRequest } from '../models/create-patient-request.model';

describe('PatientApiService', () => {
  let service: PatientApiService;

let apiServiceMock: {
  get: ReturnType<typeof vi.fn>;
  post: ReturnType<typeof vi.fn>;
};

  beforeEach(() => {
    apiServiceMock = {
      get: vi.fn(),
      post: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        PatientApiService,
        {
          provide: ApiService,
          useValue: apiServiceMock,
        },
      ],
    });

    service = TestBed.inject(PatientApiService);
  });

  it('should request patients from the patients endpoint', () => {
    const response = {
      data: [
        {
          id: 1,
          firstName: 'Test',
          lastName: 'Patient',
          email: 'test.patient@example.com',
          phoneNumber: '0401234567',
          dateOfBirth: '1990-01-01',
          status: 'Active',
        },
      ],
      errors: [],
    };

    apiServiceMock.get.mockReturnValue(of(response));

    service.getPatients().subscribe((result) => {
      expect(result).toEqual(response);
    });

    expect(apiServiceMock.get).toHaveBeenCalledWith('patients');
  });
  it('should request a patient by id', () => {
    const response = {
      data: {
        id: 1,
        firstName: 'Matti',
        lastName: 'Virtanen',
        email: 'matti.virtanen@example.com',
        phoneNumber: '0401234567',
        dateOfBirth: '1985-02-12',
        status: 'Active',
      },
      errors: [],
    };

    apiServiceMock.get.mockReturnValue(of(response));

    service.getPatient(1).subscribe((result) => {
      expect(result).toEqual(response);
    });

    expect(apiServiceMock.get).toHaveBeenCalledWith('patients/1');
  });
  it('should create patient', () => {
    const request: CreatePatientRequest = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@test.com',
      phoneNumber: '123456789',
      dateOfBirth: '1990-01-01',
      status: 'Active',
    };
    const response = {
      id: 100,
      ...request,
    };

apiServiceMock.post.mockReturnValue(
  of({
    data: response,
    errors: [],
  }),
);

service.createPatient(request).subscribe((result) => {
  expect(result.data.id).toBe(100);
});

    expect(apiServiceMock.post).toHaveBeenCalledWith('patients', request);
  });

});
