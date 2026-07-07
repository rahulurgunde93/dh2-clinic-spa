import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { ApplicationError } from '../../../core/models/application-error.model';
import { PatientApiService } from '../data-access/services/patient-api.service';
import { PatientStore } from './patient.store';

describe('PatientStore', () => {
  let store: PatientStore;
  let patientApiServiceMock: {
    getPatients: ReturnType<typeof vi.fn>;
    getPatient: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    patientApiServiceMock = {
      getPatients: vi.fn(),
      getPatient: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        PatientStore,
        {
          provide: PatientApiService,
          useValue: patientApiServiceMock,
        },
      ],
    });

    store = TestBed.inject(PatientStore);
  });

  it('should load patients successfully', () => {
    const patients = [
      {
        id: 1,
        firstName: 'Test',
        lastName: 'Patient',
      },
    ];

    patientApiServiceMock.getPatients.mockReturnValue(
      of({
        data: patients,
        errors: [],
      }),
    );

    store.loadPatients();

    expect(store.patients()).toEqual(patients);
    expect(store.loading()).toBe(false);
    expect(store.error()).toBeNull();
    expect(store.hasPatients()).toBe(true);
  });

  it('should store an application error when loading fails', () => {
    const applicationError: ApplicationError = {
      status: 500,
      message: 'Unable to load patients.',
    };

    patientApiServiceMock.getPatients.mockReturnValue(throwError(() => applicationError));

    store.loadPatients();

    expect(store.patients()).toEqual([]);
    expect(store.loading()).toBe(false);
    expect(store.error()).toEqual(applicationError);
  });

  it('should load a selected patient successfully', () => {
    const patient = {
      id: 1,
      firstName: 'Matti',
      lastName: 'Virtanen',
    };

    patientApiServiceMock.getPatient.mockReturnValue(
      of({
        data: patient,
        errors: [],
      }),
    );

    store.loadPatient(1);

    expect(store.selectedPatient()).toEqual(patient);
    expect(store.hasSelectedPatient()).toBe(true);
    expect(store.loading()).toBe(false);
  });

  it('should clear selected patient when loading fails', () => {
    const applicationError: ApplicationError = {
      status: 404,
      message: 'Patient not found.',
    };

    patientApiServiceMock.getPatient.mockReturnValue(throwError(() => applicationError));

    store.loadPatient(100);

    expect(store.selectedPatient()).toBeNull();
    expect(store.hasSelectedPatient()).toBe(false);
    expect(store.error()).toEqual(applicationError);
  });
});
