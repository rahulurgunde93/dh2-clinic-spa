import { CurrentUser } from './current-user.model';

export interface LoginResponse {
  token: string;
  expiresAt: string;
  user: CurrentUser;
}
