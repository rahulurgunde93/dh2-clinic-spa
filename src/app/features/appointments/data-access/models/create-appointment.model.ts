import { AppointmentStatus } from './appointment-status.enum';

export interface CreateAppointment {
  patientId: number;

  doctorName: string;

  appointmentDate: string;

  durationMinutes: number;

  status: AppointmentStatus;

  notes: string;
}
