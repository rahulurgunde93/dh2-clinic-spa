import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ApiService } from '../../../../core/services/api.service';
import { PatientApiService } from './patient-api.service';

describe('PatientApiService', () => {
  let service: PatientApiService;

  let apiServiceMock: {
    get: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    apiServiceMock = {
      get: vi.fn(),
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
      data: [],
      errors: [],
    };

    apiServiceMock.get.mockReturnValue(of(response));

    service.getPatients().subscribe((result) => {
      expect(result).toEqual(response);
    });

    expect(apiServiceMock.get).toHaveBeenCalledWith('patients');
  });
});
// import { TestBed } from '@angular/core/testing';
