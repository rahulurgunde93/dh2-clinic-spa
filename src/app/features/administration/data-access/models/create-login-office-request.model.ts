export interface CreateLoginOfficeRequest {
  name: string;
  code: string;
  city: string;
  status: 'Active' | 'Inactive';
}
