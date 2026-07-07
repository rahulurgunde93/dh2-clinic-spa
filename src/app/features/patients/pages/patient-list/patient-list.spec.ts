import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
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
    },
  ]);

  const patientStoreMock = {
    patients,
    loading: signal(false),
    error: signal(null),
    hasPatients: signal(true),
    loadPatients: vi.fn(),
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
  const element: HTMLElement = fixture.nativeElement;
  const text = element.textContent?.replace(/\s+/g, ' ').trim();
  expect(text).toContain('Test Patient');
  expect(element.querySelector('table')).toBeTruthy();
});
});
