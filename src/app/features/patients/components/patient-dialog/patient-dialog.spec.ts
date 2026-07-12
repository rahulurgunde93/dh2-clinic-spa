import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { vi } from 'vitest';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PatientDialog } from './patient-dialog';
import { PatientApiService } from '../../data-access/services/patient-api.service';

describe('PatientDialog', () => {
  let component: PatientDialog;
  let fixture: ComponentFixture<PatientDialog>;

  const dialogRefMock = {
    close: vi.fn(),
  };

  const patientApiMock = {
    createPatient: vi.fn(),
    updatePatient: vi.fn(),
  };

  beforeEach(async () => {
    patientApiMock.createPatient.mockReturnValue(
      of({
        data: {},
        errors: [],
      }),
    );
    patientApiMock.updatePatient.mockReturnValue(
      of({
        data: {},
        errors: [],
      }),
    );

    await TestBed.configureTestingModule({
      imports: [PatientDialog],
      providers: [
        {
          provide: MatDialogRef,
          useValue: dialogRefMock,
        },
        {
          provide: PatientApiService,
          useValue: patientApiMock,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: null,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PatientDialog);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should disable save while saving', () => {
    component.saving.set(true);

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button[color="primary"]');

    expect(button.disabled).toBe(true);
  });
});
