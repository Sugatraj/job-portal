export type UserRole = 'admin' | 'user';
export type UserType = 'employee' | 'candidate';

export interface User {
  id: string;
  name: string;
  mobile: string;
  role: UserRole;
  type: UserType;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  mobile: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}