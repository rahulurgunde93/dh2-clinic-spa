import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './dashboard-card.html',
  styleUrls: ['./dashboard-card.scss'],
})
export class DashboardCard {
  @Input({ required: true }) title = '';
  @Input({ required: true }) value = '';
  @Input() icon = 'info';
}
