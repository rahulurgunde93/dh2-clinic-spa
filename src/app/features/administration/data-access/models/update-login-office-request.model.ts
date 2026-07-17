export interface UpdateLoginOfficeRequest {
  id: number;
  name: string;
  code: string;
  city: string;
  status: 'Active' | 'Inactive';
}
