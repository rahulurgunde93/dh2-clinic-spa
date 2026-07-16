import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-quick-action-card',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatIconModule],
  templateUrl: './quick-action-card.html',
  styleUrls: ['./quick-action-card.scss'],
})
export class QuickActionCard {
  @Input({ required: true }) title!: string;

  @Input({ required: true }) icon!: string;

  @Input({ required: true }) route!: string;
}
