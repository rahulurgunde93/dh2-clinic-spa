import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { RecentActivity } from '../../models/recent-activity.model';

@Component({
  selector: 'app-recent-activity',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './recent-activity.html',
  styleUrls: ['./recent-activity.scss'],
})
export class RecentActivityComponent {
  @Input({ required: true })
  activities: RecentActivity[] = [];
}
