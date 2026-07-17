import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { vi } from 'vitest';

import { LoginOfficeStore } from './login-office.store';
import { LoginOfficeApiService } from '../data-access/services/login-office-api.service';

describe('LoginOfficeStore', () => {
  let store: LoginOfficeStore;

  const offices = [
    {
      id: 1,
      name: 'Helsinki Central',
      code: 'HEL001',
      city: 'Helsinki',
      status: 'Active' as const,
    },
  ];

  const apiMock = {
    getLoginOffices: vi.fn(),
    createLoginOffice: vi.fn(),
    updateLoginOffice: vi.fn(),
    deleteLoginOffice: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [
        LoginOfficeStore,
        {
          provide: LoginOfficeApiService,
          useValue: apiMock,
        },
      ],
    });

    store = TestBed.inject(LoginOfficeStore);
  });

  it('should create', () => {
    expect(store).toBeTruthy();
  });

  it('should load login offices', () => {
    apiMock.getLoginOffices.mockReturnValue(
      of({
        data: offices,
        errors: [],
      }),
    );

    store.loadLoginOffices();

    expect(apiMock.getLoginOffices).toHaveBeenCalledOnce();
    expect(store.loginOffices()).toEqual(offices);
    expect(store.loading()).toBe(false);
    expect(store.error()).toBeNull();
  });

  it('should set error when loading fails', () => {
    const error = new Error('Load failed');

    apiMock.getLoginOffices.mockReturnValue(throwError(() => error));

    store.loadLoginOffices();

    expect(store.loading()).toBe(false);
    expect(store.error()).toBe(error);
  });

  it('should create login office and reload list', () => {
    apiMock.createLoginOffice.mockReturnValue(
      of({
        data: true,
        errors: [],
      }),
    );

    apiMock.getLoginOffices.mockReturnValue(
      of({
        data: offices,
        errors: [],
      }),
    );

    const reloadSpy = vi.spyOn(store, 'loadLoginOffices');

    store.createLoginOffice({
      name: 'Turku',
      code: 'TRK001',
      city: 'Turku',
      status: 'Active',
    });

    expect(apiMock.createLoginOffice).toHaveBeenCalledOnce();
    expect(reloadSpy).toHaveBeenCalled();
  });

  it('should update login office and reload list', () => {
    apiMock.updateLoginOffice.mockReturnValue(
      of({
        data: true,
        errors: [],
      }),
    );

    apiMock.getLoginOffices.mockReturnValue(
      of({
        data: offices,
        errors: [],
      }),
    );

    const reloadSpy = vi.spyOn(store, 'loadLoginOffices');

    store.updateLoginOffice({
      id: 1,
      name: 'Updated',
      code: 'HEL999',
      city: 'Espoo',
      status: 'Inactive',
    });

    expect(apiMock.updateLoginOffice).toHaveBeenCalledOnce();
    expect(reloadSpy).toHaveBeenCalled();
  });

  it('should delete login office and reload list', () => {
    apiMock.deleteLoginOffice.mockReturnValue(
      of({
        data: true,
        errors: [],
      }),
    );

    apiMock.getLoginOffices.mockReturnValue(
      of({
        data: offices,
        errors: [],
      }),
    );

    const reloadSpy = vi.spyOn(store, 'loadLoginOffices');

    store.deleteLoginOffice(1);

    expect(apiMock.deleteLoginOffice).toHaveBeenCalledWith(1);
    expect(reloadSpy).toHaveBeenCalled();
  });

  it('should set error when create fails', () => {
    const error = new Error('Create failed');

    apiMock.createLoginOffice.mockReturnValue(throwError(() => error));

    store.createLoginOffice({
      name: 'Turku',
      code: 'TRK001',
      city: 'Turku',
      status: 'Active',
    });

    expect(store.error()).toBe(error);
    expect(store.loading()).toBe(false);
  });

  it('should set error when update fails', () => {
    const error = new Error('Update failed');

    apiMock.updateLoginOffice.mockReturnValue(throwError(() => error));

    store.updateLoginOffice({
      id: 1,
      name: 'Updated',
      code: 'HEL999',
      city: 'Espoo',
      status: 'Inactive',
    });

    expect(store.error()).toBe(error);
    expect(store.loading()).toBe(false);
  });

  it('should set error when delete fails', () => {
    const error = new Error('Delete failed');

    apiMock.deleteLoginOffice.mockReturnValue(throwError(() => error));

    store.deleteLoginOffice(1);

    expect(store.error()).toBe(error);
    expect(store.loading()).toBe(false);
  });
});
