import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ConfirmationDialog } from './confirmation-dialog';

describe('ConfirmationDialog', () => {
  let component: ConfirmationDialog;
  let fixture: ComponentFixture<ConfirmationDialog>;

  const dialogRefMock = {
    close: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmationDialog],
      providers: [
        {
          provide: MatDialogRef,
          useValue: dialogRefMock,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            title: 'Delete Patient',
            message: 'Delete this patient?',
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmationDialog);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should confirm', () => {
    component.confirm();

    expect(dialogRefMock.close).toHaveBeenCalledWith(true);
  });

  it('should cancel', () => {
    component.cancel();

    expect(dialogRefMock.close).toHaveBeenCalledWith(false);
  });
});
