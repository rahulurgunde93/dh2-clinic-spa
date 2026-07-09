import { computed, inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ApiResponse } from '../../../core/models/api-response.model';

import { LoginApiService } from '../data-access/services/login-api.service';
import { LoginRequest } from '../data-access/models/login-request.model';
import { LoginResponse } from '../data-access/models/login-response.model';

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

  login(request: LoginRequest): Observable<ApiResponse<LoginResponse>> {
    return this.loginApi.login(request).pipe(
      tap((response) => {
        this._token.set(response.data.token);
        this._currentUser.set(response.data.user);
      }),
    );
  }
  logout(): void {
    this._token.set(null);
    this._currentUser.set(null);
  }
}
