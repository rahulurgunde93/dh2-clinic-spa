import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';

import { AppointmentDetails } from './appointment-details';
import { AppointmentStore } from '../../state/appointment.store';

describe('AppointmentDetails', () => {
  let component: AppointmentDetails;
  let fixture: ComponentFixture<AppointmentDetails>;

  const selectedAppointment = signal({
    id: 1,
    patientId: 1,
    patientName: 'Matti Virtanen',
    appointmentDate: '2026-07-15 09:00',
    status: 'Scheduled',
  });

  const appointmentStoreMock = {
    selectedAppointment,
    loading: signal(false),
    error: signal(null),
    hasSelectedAppointment: signal(true),
    loadAppointment: vi.fn(),
  };

  beforeEach(async () => {
    appointmentStoreMock.loadAppointment.mockClear();

    await TestBed.configureTestingModule({
      imports: [AppointmentDetails],
      providers: [
        provideRouter([]),

        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                id: '1',
              }),
            },
          },
        },

        {
          provide: AppointmentStore,
          useValue: appointmentStoreMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppointmentDetails);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load appointment on initialization', () => {
    expect(appointmentStoreMock.loadAppointment).toHaveBeenCalledWith(1);
  });

  it('should display appointment information', () => {
    const element: HTMLElement = fixture.nativeElement;

    expect(element.textContent).toContain('Matti Virtanen');
    expect(element.textContent).toContain('Scheduled');
    expect(element.textContent).toContain('2026-07-15');
  });
});
