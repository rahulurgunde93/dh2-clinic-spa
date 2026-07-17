import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { PageHeader } from '../../../../shared/components/page-header/page-header';
import { AdminCard } from '../../components/admin-card/admin-card';

@Component({
  selector: 'app-administration-home',
  standalone: true,
  imports: [CommonModule, PageHeader, AdminCard],
  templateUrl: './administration-home.html',
  styleUrls: ['./administration-home.scss'],
})
export class AdministrationHome {
  readonly administrationModules = [
    {
      title: 'Login Offices',
      description: 'Manage clinic login offices.',
      icon: 'business',
      route: '/administration/login-offices',
    },
    {
      title: 'Users',
      description: 'Manage application users.',
      icon: 'group',
      route: '/administration/users',
    },
    {
      title: 'Roles',
      description: 'Manage security roles.',
      icon: 'admin_panel_settings',
      route: '/administration/roles',
    },
    {
      title: 'Languages',
      description: 'Manage application languages.',
      icon: 'language',
      route: '/administration/languages',
    },
    {
      title: 'System Settings',
      description: 'Configure application settings.',
      icon: 'settings',
      route: '/administration/system-settings',
    },
    {
      title: 'Audit Logs',
      description: 'View audit history.',
      icon: 'history',
      route: '/administration/audit-logs',
    },
  ];
}
