export interface User {
  user_id: number | null;
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
export interface UserMessage {
  active: boolean;
  avatar?: string | null;
  bio?: string | null;
  birthdate?: Date | null;
  city?: string | null;
  created_at: string | null;
  email: string;
  first_name: string | null;
  humor?: string | null;
  last_login: string | null;
  last_name?: string | null;
  role: string | 'user';
  user_id: number | null;
  username: string;

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

export interface UserUpdate {
  user_id: number | null;
  username: string;
  email: string;
  role: string | 'user';
  isActive: boolean;
  first_name: string | null;
  last_name?: string | null;
  birthdate?: Date | null;
  city?: string | null;
  avatar?: string | null;
  bio?: string | null;
}
