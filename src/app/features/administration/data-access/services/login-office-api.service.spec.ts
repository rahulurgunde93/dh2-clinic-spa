import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { vi } from 'vitest';

import { LoginOfficeApiService } from './login-office-api.service';
import { ApiService } from '../../../../core/services/api.service';
import { API_ENDPOINTS } from '../../../../core/constants/api-endpoints.constants';

describe('LoginOfficeApiService', () => {
  let service: LoginOfficeApiService;

  const apiServiceMock = {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [
        LoginOfficeApiService,
        {
          provide: ApiService,
          useValue: apiServiceMock,
        },
      ],
    });

    service = TestBed.inject(LoginOfficeApiService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should call getLoginOffices()', () => {
    apiServiceMock.get.mockReturnValue(of({ data: [], errors: [] }));

    service.getLoginOffices().subscribe();

    expect(apiServiceMock.get).toHaveBeenCalledWith(API_ENDPOINTS.loginOffices);
  });

  it('should call getLoginOffice()', () => {
    apiServiceMock.get.mockReturnValue(of({ data: null, errors: [] }));

    service.getLoginOffice(5).subscribe();

    expect(apiServiceMock.get).toHaveBeenCalledWith(`${API_ENDPOINTS.loginOffices}/5`);
  });

  it('should call createLoginOffice()', () => {
    const request = {
      name: 'Helsinki',
      code: 'HEL001',
      city: 'Helsinki',
      status: 'Active' as const,
    };

    apiServiceMock.post.mockReturnValue(of({ data: request, errors: [] }));

    service.createLoginOffice(request).subscribe();

    expect(apiServiceMock.post).toHaveBeenCalledWith(API_ENDPOINTS.loginOffices, request);
  });

  it('should call updateLoginOffice()', () => {
    const request = {
      id: 1,
      name: 'Updated',
      code: 'HEL999',
      city: 'Espoo',
      status: 'Inactive' as const,
    };

    apiServiceMock.put.mockReturnValue(of({ data: request, errors: [] }));

    service.updateLoginOffice(request).subscribe();

    expect(apiServiceMock.put).toHaveBeenCalledWith(`${API_ENDPOINTS.loginOffices}/1`, request);
  });

  it('should call deleteLoginOffice()', () => {
    apiServiceMock.delete.mockReturnValue(of({ data: true, errors: [] }));

    service.deleteLoginOffice(10).subscribe();

    expect(apiServiceMock.delete).toHaveBeenCalledWith(`${API_ENDPOINTS.loginOffices}/10`);
  });
});
