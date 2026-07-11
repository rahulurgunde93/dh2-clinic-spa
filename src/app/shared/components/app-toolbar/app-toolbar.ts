import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, inject, Output } from '@angular/core';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AuthService } from '../../../features/auth/state/auth.service';
import { SearchBox } from '../search-box/search-box';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, SearchBox],
  templateUrl: './app-toolbar.html',
  styleUrls: ['./app-toolbar.scss'],
})
export class AppToolbar {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly user = computed(() => this.authService.currentUser());

  @Output()
  readonly menuClick = new EventEmitter<void>();

  logout(): void {
    this.authService.logout();
    void this.router.navigate(['/login']);
  }
}
