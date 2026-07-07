import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';

import { AppointmentStore } from '../../state/appointment.store';
import { AppointmentList } from './appointment-list';

describe('AppointmentList', () => {
  let component: AppointmentList;
  let fixture: ComponentFixture<AppointmentList>;

  const appointments = signal([
    {
      id: 1,
      patientId: 1,
      patientName: 'Test Patient',
      appointmentDate: '2026-07-15 09:00',
      status: 'Scheduled',
    },
  ]);

  const appointmentStoreMock = {
    appointments,
    loading: signal(false),
    error: signal(null),
    hasAppointments: signal(true),
    loadAppointments: vi.fn(),
  };

  beforeEach(async () => {
    appointmentStoreMock.loadAppointments.mockClear();

    await TestBed.configureTestingModule({
      imports: [AppointmentList],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
        {
          provide: AppointmentStore,
          useValue: appointmentStoreMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppointmentList);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load appointments on initialization', () => {
    expect(appointmentStoreMock.loadAppointments).toHaveBeenCalled();
  });

  it('should display appointments from the store', () => {
    const element: HTMLElement = fixture.nativeElement;

    const text = element.textContent?.replace(/\s+/g, ' ').trim();

    expect(text).toContain('Test Patient');
    expect(element.querySelector('table')).toBeTruthy();
  });
});
