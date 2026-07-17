import { Routes } from '@angular/router';
import { AdministrationHome } from './pages/administration-home/administration-home';

export const ADMINISTRATION_ROUTES: Routes = [
  {
    path: '',
    component: AdministrationHome,
  },
  {
    path: 'login-offices',
    loadComponent: () =>
      import('./pages/login-office-list/login-office-list').then((m) => m.LoginOfficeList),
  },
];
