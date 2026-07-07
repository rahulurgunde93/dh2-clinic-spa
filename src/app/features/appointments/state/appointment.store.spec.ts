import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { ApplicationError } from '../../../core/models/application-error.model';
import { AppointmentApiService } from '../data-access/services/appointment-api.service';
import { AppointmentStore } from './appointment.store';

describe('AppointmentStore', () => {
  let store: AppointmentStore;

  let appointmentApiServiceMock: {
    getAppointments: ReturnType<typeof vi.fn>;
    getAppointment: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    appointmentApiServiceMock = {
      getAppointments: vi.fn(),
      getAppointment: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        AppointmentStore,
        {
          provide: AppointmentApiService,
          useValue: appointmentApiServiceMock,
        },
      ],
    });

    store = TestBed.inject(AppointmentStore);
  });

  it('should load appointments successfully', () => {
    const appointments = [
      {
        id: 1,
        patientId: 1,
        patientName: 'Test Patient',
        appointmentDate: '2026-07-15 09:00',
        status: 'Scheduled',
      },
    ];

    appointmentApiServiceMock.getAppointments.mockReturnValue(
      of({
        data: appointments,
        errors: [],
      }),
    );

    store.loadAppointments();

    expect(store.appointments()).toEqual(appointments);
    expect(store.loading()).toBe(false);
    expect(store.error()).toBeNull();
    expect(store.hasAppointments()).toBe(true);
  });

  it('should store an application error when loading fails', () => {
    const applicationError: ApplicationError = {
      status: 500,
      message: 'Unable to load appointments.',
    };

    appointmentApiServiceMock.getAppointments.mockReturnValue(throwError(() => applicationError));

    store.loadAppointments();

    expect(store.appointments()).toEqual([]);
    expect(store.loading()).toBe(false);
    expect(store.error()).toEqual(applicationError);
  });

  it('should load a selected appointment successfully', () => {
    const appointment = {
      id: 1,
      patientId: 1,
      patientName: 'Matti Virtanen',
      appointmentDate: '2026-07-15 09:00',
      status: 'Scheduled',
    };

    appointmentApiServiceMock.getAppointment.mockReturnValue(
      of({
        data: appointment,
        errors: [],
      }),
    );

    store.loadAppointment(1);

    expect(store.selectedAppointment()).toEqual(appointment);
    expect(store.hasSelectedAppointment()).toBe(true);
    expect(store.loading()).toBe(false);
  });

  it('should clear selected appointment when loading fails', () => {
    const applicationError: ApplicationError = {
      status: 404,
      message: 'Appointment not found.',
    };

    appointmentApiServiceMock.getAppointment.mockReturnValue(throwError(() => applicationError));

    store.loadAppointment(100);

    expect(store.selectedAppointment()).toBeNull();
    expect(store.hasSelectedAppointment()).toBe(false);
    expect(store.error()).toEqual(applicationError);
  });
});
