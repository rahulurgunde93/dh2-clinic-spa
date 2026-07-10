import { computed, inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ApiResponse } from '../../../core/models/api-response.model';

import { LoginApiService } from '../data-access/services/login-api.service';
import { LoginRequest } from '../data-access/models/login-request.model';
import { LoginResponse } from '../data-access/models/login-response.model';

const TOKEN_KEY = 'dh2-auth-token';
const USER_KEY = 'dh2-current-user';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly loginApi = inject(LoginApiService);
  private readonly _token = signal<string | null>(null);
  private readonly _currentUser = signal<LoginResponse['user'] | null>(null);

  readonly token = this._token.asReadonly();
  readonly currentUser = this._currentUser.asReadonly();
  readonly isAuthenticated = computed(() => this._token() !== null);

  constructor() {
    const token = sessionStorage.getItem(TOKEN_KEY);
    const user = sessionStorage.getItem(USER_KEY);

    if (token && user) {
      this._token.set(token);
      this._currentUser.set(JSON.parse(user));
    }
  }

  login(request: LoginRequest): Observable<ApiResponse<LoginResponse>> {
    return this.loginApi.login(request).pipe(
      tap((response) => {
        this._token.set(response.data.token);
        this._currentUser.set(response.data.user);

        sessionStorage.setItem(TOKEN_KEY, response.data.token);
        sessionStorage.setItem(USER_KEY, JSON.stringify(response.data.user));
      }),
    );
  }
  logout(): void {
    this._token.set(null);
    this._currentUser.set(null);
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
  }
}
