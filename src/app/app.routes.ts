import { Routes } from '@angular/router';
import { Shell } from './layout/shell/shell';

export const routes: Routes = [
  {
    path: '',
    component: Shell,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/pages/dashboard/dashboard').then(
            (component) => component.Dashboard,
          ),
      },
      {
        path: 'patients',
        loadComponent: () =>
          import('./features/patients/pages/patient-list/patient-list').then(
            (component) => component.PatientList,
          ),
      },
      {
        path: 'patients/:id',
        loadComponent: () =>
          import('./features/patients/pages/patient-details/patient-details').then(
            (component) => component.PatientDetails,
          ),
      },
      {
        path: 'appointments',
        loadComponent: () =>
          import('./features/appointments/pages/appointment-list/appointment-list').then(
            (component) => component.AppointmentList,
          ),
      },
      {
        path: 'appointments/:id',
        loadComponent: () =>
          import('./features/appointments/pages/appointment-details/appointment-details').then(
            (component) => component.AppointmentDetails,
          ),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./features/settings/pages/settings/settings').then(
            (component) => component.Settings,
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
