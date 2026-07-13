import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal, computed } from '@angular/core';
import { provideRouter, ActivatedRoute, convertToParamMap } from '@angular/router';

import { PatientStore } from '../../state/patient.store';
import { PatientList } from './patient-list';

describe('PatientList', () => {
  let component: PatientList;
  let fixture: ComponentFixture<PatientList>;

const patients = signal([
  {
    id: 1,
    firstName: 'Test',
    lastName: 'Patient',
    email: 'test@example.com',
    phoneNumber: '0401234567',
    dateOfBirth: '1990-01-01',
    status: 'Active' as const,
  },
]);

const selectedPatient = signal(null);
const loading = signal(false);
const error = signal(null);
const deleting = signal(false);

const patientStoreMock = {
  patients: patients.asReadonly(),
  selectedPatient: selectedPatient.asReadonly(),
  loading: loading.asReadonly(),
  error: error.asReadonly(),

  hasPatients: computed(() => patients().length > 0),
  hasSelectedPatient: computed(() => selectedPatient() !== null),

  deleting: deleting.asReadonly(),

  loadPatients: vi.fn(),
  deletePatient: vi.fn(),
};

  beforeEach(async () => {
    patientStoreMock.loadPatients.mockClear();

    await TestBed.configureTestingModule({
      imports: [PatientList],
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
          provide: PatientStore,
          useValue: patientStoreMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PatientList);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load patients on initialization', () => {
    expect(patientStoreMock.loadPatients).toHaveBeenCalled();
  });

it('should display patients from the store', () => {
  fixture.detectChanges();
  const element: HTMLElement = fixture.nativeElement;
  expect(element.textContent).toContain('Test');
  expect(element.textContent).toContain('Patient');
  expect(element.querySelector('table')).toBeTruthy();
});
});
