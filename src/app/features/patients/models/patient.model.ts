export interface Patient {
  id: number;

  firstName: string;

  lastName: string;

  email: string;

  phoneNumber: string;

  dateOfBirth: string;

  status: 'Active' | 'Inactive';
}
