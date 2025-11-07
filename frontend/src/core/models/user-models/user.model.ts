export interface User {
  id: number | null;
  username: string;
  email: string;
  role: string | 'user';
  isActive: boolean;
  password: string;
  first_name: string | null;
  last_name?: string | null;
  birthdate?: Date | null;
  city?: string | null;
  avatar?: string | null;
  bio?: string | null;
  humor?: string | null;
}
export interface UserLogin {
  email: string;
  password: string;
  token: string | null;
}
export interface UserRegister {
  username: string;
  email: string;
  password: string;
  token: string | null;
}
