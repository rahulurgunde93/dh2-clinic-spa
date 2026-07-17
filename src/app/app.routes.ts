import { Routes } from '@angular/router';
import { Shell } from './layout/shell/shell';
import { Component } from '@angular/core';
import { authGuard } from './features/auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login/login').then((component) => component.Login),
  },
  {
    path: '',
    component: Shell,
    canActivate: [authGuard],
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
        path: 'administration',
        loadChildren: () =>
          import('./features/administration/administration.routes').then(
            (component) => component.ADMINISTRATION_ROUTES,
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
        loadChildren: () =>
          import('./features/appointments/appointments.routes').then((m) => m.APPOINTMENT_ROUTES),
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
