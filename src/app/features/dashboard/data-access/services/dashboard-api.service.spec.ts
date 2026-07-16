import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { vi } from 'vitest';

import { DashboardApiService } from './dashboard-api.service';
import { ApiService } from '../../../../core/services/api.service';

describe('DashboardApiService', () => {
  let service: DashboardApiService;

  const apiService = {
    get: vi.fn(),
  };

  beforeEach(() => {
    apiService.get.mockReset();

    TestBed.configureTestingModule({
      providers: [
        DashboardApiService,
        {
          provide: ApiService,
          useValue: apiService,
        },
      ],
    });

    service = TestBed.inject(DashboardApiService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should call dashboard endpoint', () => {
    apiService.get.mockReturnValue(
      of({
        data: {
          statistics: [],
          activities: [],
        },
        errors: [],
      }),
    );

    service.getDashboard().subscribe();

    expect(apiService.get).toHaveBeenCalledWith('dashboard');
  });
});
