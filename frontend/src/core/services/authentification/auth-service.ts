import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiURL = 'http://localhost:5000/users/login';
  httpClient = inject(HttpClient);

  login(email: string, password: string) {
    const body = { email: email, password: password };
    console.log('Login request body:', body);
    return this.httpClient.post<any>(this.apiURL, body);
  }
}
