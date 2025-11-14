import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User, UserLogin } from '../../models/user-models/user.model';
import { Observable } from 'rxjs';
import { sign } from 'crypto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiURL: string = 'http://localhost:5000/users/login';
  httpClient = inject(HttpClient);
  //signal pour communiquer l'état de l'utilisateur connecté
  userSignal = signal<User | null>(null);

  //methode pour setter mon user dans mon siganl en lecture seule
  setUserSignal(user: User) {
    this.userSignal.set(user);
  }

  getCurrentUser(): User | null {
    return this.userSignal();
  }

  clearUserSignal(): void {
    this.userSignal.set(null);
  }

  //signal pour communiquer l'état de connexion
  isLogged = signal<boolean>(false);

  //login user
  async userLogin(user: UserLogin) {
    console.log('AuthService launched...');
    try {
      await new Promise<void>((resolve, reject) => {
        const url = `${this.apiURL}`;
        this.httpClient.post<any>(url, user).subscribe({
          next: (response) => {
            //set le signal userSignal avec les infos provenant de mon backend
            this.userSignal.set(response.user);
            //localStorage.setItem('user', JSON.stringify(response.user));
            localStorage.setItem('token', response.token);
            this.isLogged.set(true);
            console.log('Is logged in authService value = ' + this.isLogged);
            resolve();
          },
          error: (error) => {
            console.error('Login error:', error);
            reject(error);
          },
        });
      });
    } catch (error) {
      console.error('Error during user login:', error);
      throw error;
    }
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.isLogged.set(false);
  }
}
