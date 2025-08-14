import { User } from '@/types/auth';

export const FAKE_USERS: User[] = [
  {
    id: '1',
    name: 'Sugatraj',
    mobile: '7972908961',
    role: 'admin',
    type: 'employee',
    isAuthenticated: false,
  },
  {
    id: '2',
    name: 'RAJX',
    mobile: '8308377302',
    role: 'user',
    type: 'candidate',
    isAuthenticated: false,
  },
];

export const validateUser = (mobile: string, password: string): User | null => {
  if (password !== '12345') return null;
  
  const user = FAKE_USERS.find(u => u.mobile === mobile);
  if (user) {
    return { ...user, isAuthenticated: true };
  }
  
  return null;
};