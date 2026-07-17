import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { LoginOfficeDialog } from './login-office-dialog';

describe('LoginOfficeDialog', () => {
  let component: LoginOfficeDialog;
  let fixture: ComponentFixture<LoginOfficeDialog>;

  const dialogRefMock = {
    close: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [LoginOfficeDialog],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: null,
        },
        {
          provide: MatDialogRef,
          useValue: dialogRefMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginOfficeDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form', () => {
    expect(component.form.value).toEqual({
      name: '',
      code: '',
      city: '',
      status: 'Active',
    });
  });

  it('should be invalid when required fields are empty', () => {
    component.form.patchValue({
      name: '',
      code: '',
      city: '',
    });

    expect(component.form.invalid).toBe(true);
  });

  it('should be valid when required fields are provided', () => {
    component.form.setValue({
      name: 'Helsinki Central',
      code: 'HEL001',
      city: 'Helsinki',
      status: 'Active',
    });

    expect(component.form.valid).toBe(true);
  });

  it('should disable Save button when form is invalid', () => {
    component.form.patchValue({
      name: '',
      code: '',
      city: '',
    });

    fixture.detectChanges();

    const saveButton = fixture.debugElement.queryAll(By.css('button'))[1].nativeElement;

    expect(saveButton.disabled).toBe(true);
  });

  it('should enable Save button when form is valid', () => {
    component.form.setValue({
      name: 'Helsinki Central',
      code: 'HEL001',
      city: 'Helsinki',
      status: 'Active',
    });

    fixture.detectChanges();

    const saveButton = fixture.debugElement.queryAll(By.css('button'))[1].nativeElement;

    expect(saveButton.disabled).toBe(false);
  });

  it('should close dialog with form data when save is called', () => {
    component.form.setValue({
      name: 'Helsinki Central',
      code: 'HEL001',
      city: 'Helsinki',
      status: 'Active',
    });

    component.save();

    expect(dialogRefMock.close).toHaveBeenCalledOnce();

    expect(dialogRefMock.close).toHaveBeenCalledWith({
      name: 'Helsinki Central',
      code: 'HEL001',
      city: 'Helsinki',
      status: 'Active',
    });
  });

  it('should not close dialog when form is invalid', () => {
    component.form.patchValue({
      name: '',
      code: '',
      city: '',
    });

    component.save();

    expect(dialogRefMock.close).not.toHaveBeenCalled();
  });

  it('should close dialog when cancel is clicked', () => {
    component.cancel();

    expect(dialogRefMock.close).toHaveBeenCalledOnce();
    expect(dialogRefMock.close).toHaveBeenCalledWith();
  });
});
