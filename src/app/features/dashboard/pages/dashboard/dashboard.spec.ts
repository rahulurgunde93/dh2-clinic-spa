import { ComponentFixture, TestBed } from '@angular/core/testing';
import { computed, signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';

import { Dashboard } from './dashboard';
import { DashboardStore } from '../../state/dashboard.store';

describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;

  const statistics = signal([
    {
      title: 'Patients',
      value: 10,
      icon: 'groups',
    },
    {
      title: 'Appointments',
      value: 5,
      icon: 'event',
    },
  ]);

  const activities = signal([
    {
      title: 'Patient Created',
      description: 'John Doe was registered.',
      timestamp: 'Today',
      icon: 'person_add',
    },
  ]);

  const dashboardStore = {
    loading: signal(false),

    error: signal<Error | null>(null),

    statistics,

    activities,

    hasStatistics: computed(() => statistics().length > 0),

    hasActivities: computed(() => activities().length > 0),

    loadDashboard: vi.fn(),
  };

  beforeEach(async () => {
    dashboardStore.loadDashboard.mockClear();

    await TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [
        provideRouter([]),
        {
          provide: DashboardStore,
          useValue: dashboardStore,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadDashboard on init', () => {
    expect(dashboardStore.loadDashboard).toHaveBeenCalledTimes(1);
  });

  it('should render Dashboard title', () => {
    expect(fixture.nativeElement.textContent).toContain('Dashboard');
  });

  it('should render Quick Actions section', () => {
    expect(fixture.nativeElement.textContent).toContain('Quick Actions');
  });

  it('should render Recent Activity section', () => {
    expect(fixture.nativeElement.textContent).toContain('Recent Activity');
  });
});
