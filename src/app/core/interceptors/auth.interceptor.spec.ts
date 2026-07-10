import { HttpRequest, HttpHandlerFn, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, firstValueFrom } from 'rxjs';

import { AuthService } from '../../features/auth/state/auth.service';
import { authInterceptor } from './auth.interceptor';

describe('authInterceptor', () => {
  const authServiceMock = {
    token: vi.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
      ],
    });
  });

it('should add Authorization header when token exists', async () => {
  authServiceMock.token.mockReturnValue('mock-jwt-token');

  const request = new HttpRequest('GET', '/api/patients');

  const next: HttpHandlerFn = (req) => {
    expect(req.headers.get('Authorization')).toBe('Bearer mock-jwt-token');

    return of(new HttpResponse());
  };

  await TestBed.runInInjectionContext(async () => {
    await firstValueFrom(authInterceptor(request, next));
  });
});

it('should not add Authorization header when token does not exist', async () => {
  authServiceMock.token.mockReturnValue(null);

  const request = new HttpRequest('GET', '/api/patients');

  const next: HttpHandlerFn = (req) => {
    expect(req.headers.has('Authorization')).toBe(false);

    return of(new HttpResponse());
  };

  await TestBed.runInInjectionContext(async () => {
    await firstValueFrom(authInterceptor(request, next));
  });
});
});
