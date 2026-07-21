import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthService } from '../state/auth.service';
import { authGuard } from './auth.guard';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('authGuard', () => {
  const authServiceMock = {
    isAuthenticated: vi.fn(),
  };

  const routerMock = {
    createUrlTree: vi.fn(() => '/login'),
  };

beforeEach(() => {
  vi.clearAllMocks();

  TestBed.configureTestingModule({
    providers: [
      {
        provide: AuthService,
        useValue: authServiceMock,
      },
      {
        provide: Router,
        useValue: routerMock,
      },
    ],
  });
});

  it('should allow authenticated users', () => {
    authServiceMock.isAuthenticated.mockReturnValue(true);

    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;

    const result = TestBed.runInInjectionContext(() => authGuard(route, state));

    expect(result).toBe(true);
  });

it('should redirect unauthenticated users with returnUrl', () => {
  authServiceMock.isAuthenticated.mockReturnValue(false);

  const route = {} as ActivatedRouteSnapshot;

  const state = {
    url: '/patients/1',
  } as RouterStateSnapshot;

  const result = TestBed.runInInjectionContext(() => authGuard(route, state));

  expect(routerMock.createUrlTree).toHaveBeenCalledWith(['/login'], {
    queryParams: {
      returnUrl: '/patients/1',
    },
  });

  expect(result).toBe('/login');
});

  it('should check authentication only once', () => {
    authServiceMock.isAuthenticated.mockReturnValue(true);

    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;

    TestBed.runInInjectionContext(() => authGuard(route, state));

    expect(authServiceMock.isAuthenticated).toHaveBeenCalledTimes(1);
  });
});
