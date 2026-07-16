import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { vi } from 'vitest';

import { DashboardStore } from './dashboard.store';
import { DashboardApiService } from '../data-access/services/dashboard-api.service';

describe('DashboardStore', () => {
  let store: DashboardStore;

  const dashboardApi = {
    getDashboard: vi.fn(),
  };

  beforeEach(() => {
    dashboardApi.getDashboard.mockReset();

    TestBed.configureTestingModule({
      providers: [
        DashboardStore,
        {
          provide: DashboardApiService,
          useValue: dashboardApi,
        },
      ],
    });

    store = TestBed.inject(DashboardStore);
  });

  it('should create', () => {
    expect(store).toBeTruthy();
  });

  it('should load dashboard statistics and activities', () => {
    dashboardApi.getDashboard.mockReturnValue(
      of({
        data: {
          statistics: [
            {
              title: 'Patients',
              value: 120,
              icon: 'groups',
            },
          ],
          activities: [
            {
              title: 'Appointment Created',
              description: 'John Smith',
              icon: 'event',
              timestamp: 'Today',
            },
          ],
        },
        errors: [],
      }),
    );

    store.loadDashboard();

    expect(store.loading()).toBe(false);

    expect(store.statistics().length).toBe(1);

    expect(store.activities().length).toBe(1);

    expect(store.statistics()[0].title).toBe('Patients');
  });

  it('should set error when api fails', () => {
    dashboardApi.getDashboard.mockReturnValue(throwError(() => new Error('API Error')));

    store.loadDashboard();

    expect(store.loading()).toBe(false);

    expect(store.error()).toBeTruthy();
  });

  it('should call DashboardApiService', () => {
    dashboardApi.getDashboard.mockReturnValue(
      of({
        data: {
          statistics: [],
          activities: [],
        },
        errors: [],
      }),
    );

    store.loadDashboard();

    expect(dashboardApi.getDashboard).toHaveBeenCalledTimes(1);
  });
});
