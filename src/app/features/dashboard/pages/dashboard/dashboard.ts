import { Component } from '@angular/core';

import { PageHeader } from '../../../../shared/components/page-header/page-header';
import { DashboardCard } from '../../components/dashboard-card/dashboard-card';
import { QuickActionCard } from '../../../../shared/components/quick-action-card/quick-action-card';

import { RecentActivityComponent } from '../../../../shared/components/recent-activity/recent-activity';
import { RecentActivity } from '../../../../shared/models/recent-activity.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PageHeader, DashboardCard, QuickActionCard, RecentActivityComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  statistics = [
    {
      title: 'Patients',
      value: 245,
      icon: 'groups',
    },
    {
      title: 'Appointments',
      value: 34,
      icon: 'calendar_month',
    },
    {
      title: 'Doctors',
      value: 12,
      icon: 'badge',
    },
    {
      title: 'Clinics',
      value: 3,
      icon: 'local_hospital',
    },
  ];

  quickActions = [
    {
      title: 'Patients',
      icon: 'groups',
      route: '/patients',
    },
    {
      title: 'Appointments',
      icon: 'calendar_month',
      route: '/appointments',
    },
    {
      title: 'Settings',
      icon: 'settings',
      route: '/settings',
    },
  ];

  recentActivities: RecentActivity[] = [
    {
      icon: 'person_add',
      title: 'New Patient',
      description: 'Anna Korhonen was registered.',
      timestamp: 'Today, 09:15',
    },
    {
      icon: 'event_available',
      title: 'Appointment Scheduled',
      description: 'Appointment booked for Matti Virtanen.',
      timestamp: 'Today, 10:30',
    },
    {
      icon: 'edit',
      title: 'Patient Updated',
      description: 'Patient contact information updated.',
      timestamp: 'Yesterday',
    },
    {
      icon: 'check_circle',
      title: 'Appointment Completed',
      description: 'Consultation completed successfully.',
      timestamp: 'Yesterday',
    },
  ];
}
