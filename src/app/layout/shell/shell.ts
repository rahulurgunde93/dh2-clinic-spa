import { computed, inject, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';

import { AppToolbar } from '../../shared/components/app-toolbar/app-toolbar';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    AppToolbar,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './shell.html',
  styleUrls: ['./shell.scss'],
})
export class Shell {
  readonly opened = signal(true);
  private readonly breakpointObserver = inject(BreakpointObserver);
  readonly mobile = signal(false);

  constructor() {
    this.breakpointObserver.observe('(max-width: 768px)').subscribe((result) => {
      this.mobile.set(result.matches);

      if (result.matches) {
        this.opened.set(false);
      } else {
        this.opened.set(true);
      }
    });
  }

  toggleMenu(): void {
    this.opened.update((value) => !value);
  }
}
