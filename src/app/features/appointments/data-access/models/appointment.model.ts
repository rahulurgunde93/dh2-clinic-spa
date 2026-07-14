import { AppointmentStatus } from './appointment-status.enum';

export interface Appointment {
  id: number;

  patientId: number;

  patientName: string;

  doctorName: string;

  appointmentDate: string;

  durationMinutes: number;

  status: AppointmentStatus;

  notes: string;
}
