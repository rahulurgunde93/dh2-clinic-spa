import { AppointmentStatus } from './appointment-status.enum';

export interface UpdateAppointment {
  id: number;

  patientId: number;

  doctorName: string;

  appointmentDate: string;

  durationMinutes: number;

  status: AppointmentStatus;

  notes: string;
}
