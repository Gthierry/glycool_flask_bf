import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../../models/user-models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiURL = 'http://localhost:5000/users/login';
  httpClient = inject(HttpClient);

  login(email: string, password: string) {
    const body = { email: email, password: password };
    console.log('Login request body:', body);
    console.log('json data: ' + JSON.stringify(body));
    return this.httpClient.post<any>(this.apiURL, body);
  }
}
