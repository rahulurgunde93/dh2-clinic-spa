import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientForm } from './patient-form';

describe('PatientForm', () => {
  let component: PatientForm;
  let fixture: ComponentFixture<PatientForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientForm],
    }).compileComponents();

    fixture = TestBed.createComponent(PatientForm);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.form).toBeTruthy();
    expect(component.form.valid).toBe(false);
  });

  it('should be valid when required fields are populated', () => {
    component.form.setValue({
      firstName: 'Matti',
      lastName: 'Virtanen',
      email: 'matti@example.com',
      phoneNumber: '0401234567',
      dateOfBirth: '1985-02-12',
      status: 'Active',
    });

    expect(component.form.valid).toBe(true);
  });
});
