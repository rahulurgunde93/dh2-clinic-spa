import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { LoginApiService } from '../data-access/services/login-api.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  const loginApiMock = {
    login: vi.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {
          provide: LoginApiService,
          useValue: loginApiMock,
        },
      ],
    });

    service = TestBed.inject(AuthService);
  });

  it('should delegate login to LoginApiService', () => {
    const response = {
      data: {
        token: 'mock-token',
        expiresAt: '',
        user: {
          id: 1,
          username: 'admin',
          fullName: 'DH2 Administrator',
          role: 'Administrator',
        },
      },
      errors: [],
    };

    loginApiMock.login.mockReturnValue(of(response));

    service.login({
      username: 'admin',
      password: 'admin',
    });

    expect(loginApiMock.login).toHaveBeenCalledWith({
      username: 'admin',
      password: 'admin',
    });
  });

  it('should propagate login errors', () => {
    loginApiMock.login.mockReturnValue(throwError(() => new Error('Login failed')));

    service
      .login({
        username: 'admin',
        password: 'wrong',
      })
      .subscribe({
        next: () => {
          throw new Error('Expected error');
        },
        error: (error) => {
          expect(error.message).toBe('Login failed');
        },
      });
  });
});
