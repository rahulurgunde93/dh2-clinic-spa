import { Injectable, signal } from '@angular/core';

import { CurrentUser } from '../models/current-user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly currentUser = signal<CurrentUser | null>(null);

  readonly isAuthenticated = signal(false);

  login(): void {
    // Implement in Story 14
  }

  logout(): void {
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
  }
}
