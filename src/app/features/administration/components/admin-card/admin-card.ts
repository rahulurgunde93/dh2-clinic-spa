import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin-card',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatIconModule],
  templateUrl: './admin-card.html',
  styleUrls: ['./admin-card.scss'],
})
export class AdminCard {
  @Input() title = '';

  @Input() description = '';

  @Input() icon = '';

  @Input() route = '';
}
