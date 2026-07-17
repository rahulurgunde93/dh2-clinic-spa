import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { LoginOffice } from '../../data-access/models/login-office.model';
import { MatDialog } from '@angular/material/dialog';

import { LoginOfficeList } from './login-office-list';
import { LoginOfficeStore } from '../../state/login-office.store';

describe('LoginOfficeList', () => {
  let component: LoginOfficeList;
  let fixture: ComponentFixture<LoginOfficeList>;

  const storeMock = {
    loading: vi.fn(() => false),
    error: vi.fn(() => null),
    loginOffices: vi.fn(() => [
      {
        id: 1,
        name: 'Helsinki Central',
        code: 'HEL001',
        city: 'Helsinki',
        status: 'Active',
      },
    ]),
    hasLoginOffices: vi.fn(() => true),

    loadLoginOffices: vi.fn(),
    createLoginOffice: vi.fn(),
    updateLoginOffice: vi.fn(),
    deleteLoginOffice: vi.fn(),
  };

  const dialogMock = {
    open: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    dialogMock.open.mockReturnValue({
      afterClosed: () => of(null),
    });

    await TestBed.configureTestingModule({
      imports: [LoginOfficeList, NoopAnimationsModule],
      providers: [
        {
          provide: LoginOfficeStore,
          useValue: storeMock,
        },
        {
          provide: MatDialog,
          useValue: dialogMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginOfficeList);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load login offices on init', () => {
    expect(storeMock.loadLoginOffices).toHaveBeenCalledOnce();
  });

  it('should open create dialog', () => {
    component.openCreateDialog();

    expect(dialogMock.open).toHaveBeenCalledOnce();
  });

  it('should create login office after dialog closes', () => {
    const request = {
      name: 'Turku',
      code: 'TRK001',
      city: 'Turku',
      status: 'Active',
    };

    dialogMock.open.mockReturnValue({
      afterClosed: () => of(request),
    });

    component.openCreateDialog();

    expect(storeMock.createLoginOffice).toHaveBeenCalledWith(request);
  });

  it('should open edit dialog', () => {
    const office: LoginOffice = {
      id: 1,
      name: 'Helsinki Central',
      code: 'HEL001',
      city: 'Helsinki',
      status: 'Active',
    };

    component.openEditDialog(office);

    expect(dialogMock.open).toHaveBeenCalledOnce();
  });

  it('should update login office after dialog closes', () => {
    const office: LoginOffice = {
      id: 1,
      name: 'Helsinki Central',
      code: 'HEL001',
      city: 'Helsinki',
      status: 'Active',
    };

    const updated = {
      name: 'Updated Office',
      code: 'HEL999',
      city: 'Espoo',
      status: 'Inactive',
    };

    dialogMock.open.mockReturnValue({
      afterClosed: () => of(updated),
    });

    component.openEditDialog(office);

    expect(storeMock.updateLoginOffice).toHaveBeenCalledWith({
      id: 1,
      ...updated,
    });
  });

  it('should delete login office after confirmation', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);

    component.deleteLoginOffice({
      id: 1,
      name: 'Helsinki Central',
      code: 'HEL001',
      city: 'Helsinki',
      status: 'Active',
    });

    expect(storeMock.deleteLoginOffice).toHaveBeenCalledWith(1);
  });

  it('should not delete login office when confirmation is cancelled', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(false);

    component.deleteLoginOffice({
      id: 1,
      name: 'Helsinki Central',
      code: 'HEL001',
      city: 'Helsinki',
      status: 'Active',
    });

    expect(storeMock.deleteLoginOffice).not.toHaveBeenCalled();
  });
});
