import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { PageHeader } from '../../../../shared/components/page-header/page-header';
import { LoadingSpinner } from '../../../../shared/components/loading-spinner/loading-spinner';
import { ErrorPanel } from '../../../../shared/components/error-panel/error-panel';

import { DashboardCard } from '../../components/dashboard-card/dashboard-card';
import { QuickActionCard } from '../../../../shared/components/quick-action-card/quick-action-card';
import { RecentActivityComponent } from '../../../../shared/components/recent-activity/recent-activity';

import { DashboardStore } from '../../state/dashboard.store';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    PageHeader,
    DashboardCard,
    QuickActionCard,
    RecentActivityComponent,
    LoadingSpinner,
    ErrorPanel,
    EmptyState,
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class Dashboard implements OnInit {
  readonly store = inject(DashboardStore);

  readonly quickActions = [
    {
      title: 'Patients',
      icon: 'groups',
      route: '/patients',
    },
    {
      title: 'Appointments',
      icon: 'event',
      route: '/appointments',
    },
    {
      title: 'Settings',
      icon: 'settings',
      route: '/settings',
    },
  ];

  ngOnInit(): void {
    this.store.loadDashboard();
  }
}
