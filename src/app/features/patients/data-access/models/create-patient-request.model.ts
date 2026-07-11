export interface CreatePatientRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  status: 'Active' | 'Inactive';
}
