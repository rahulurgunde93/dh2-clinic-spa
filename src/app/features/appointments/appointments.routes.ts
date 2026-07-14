import { Routes } from '@angular/router';

import { AppointmentList } from './pages/appointment-list/appointment-list';

export const APPOINTMENT_ROUTES: Routes = [
  {
    path: '',
    component: AppointmentList,
  },
];
