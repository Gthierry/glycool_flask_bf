export interface User {
  //id?: number | null;
  username: string;
  email: string;
  role: string | 'user';
  isActive: boolean;
  password: string;
  firstName: string | null;
  lastName?: string | null;
  birthDate?: Date | null;
  city?: string | null;
  avatar?: string | null;
  bio?: string | null;
}
export interface UserLogin {
  email: string;
  password: string;
  token:string | null
}
export interface UserRegister {
  username: string;
  email: string;
  password: string;
  token:string | null

}
