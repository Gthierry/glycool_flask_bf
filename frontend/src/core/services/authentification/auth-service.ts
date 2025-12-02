import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { User, UserLogin } from '../../models/user-models/user.model';
import { Observable } from 'rxjs';
import { sign } from 'crypto';
import { jwtDecode } from 'jwt-decode';
import { exists } from 'fs';
import { isPlatformBrowser } from '@angular/common';

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
  private platformId = inject(PLATFORM_ID);
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
            this.setUserSignal(response.user);
            console.log('authservice user:', response.user);
            //localStorage.setItem('user', JSON.stringify(response.user));
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
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
    this.userSignal.set(null);
  }

  restoreAuthFromStorage() {
  }
}
