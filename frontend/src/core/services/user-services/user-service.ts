import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserLogin, UserRegister, UserUpdate } from '../../models/user-models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  //define the api url
  private apiUrl = 'http://localhost:5000/users';
  // Inject HttpClient
  private httpClient = inject(HttpClient);

  //get a list of users from the backend
  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiUrl);
  }
  //récupération d'un utilisateur par son id
  getUserById(id: number): Observable<User> {
    try {
      const url = `${this.apiUrl}/getuserbyid/${id}`;
      return this.httpClient.get<User>(url);
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      throw error; // Re-throw the error after logging it
    }
  }

  getUserByletter(data: string): Observable<User> {
    const url = `${this.apiUrl}/getuserbyletter/${data}`;
    return this.httpClient.get<User>(url);
  }

  createUser(user: UserRegister): Observable<any> {
    try {
      console.log('UserService: createUser called');
      const url = `${this.apiUrl}/create`;
      console.log('API URL:', url);
      console.log('Creating user with data:', user);
      return this.httpClient.post<any>(url, user);
    } catch (error) {
      console.error('Error creating user with sercice', error);
      throw error;
    }
  }

  updateUser(user: UserUpdate): Observable<User> {
    const url = `${this.apiUrl}/update`;
    console.log('service update called for user ID: ' + user);
    return this.httpClient.put<any>(url, user);
  }

  deleteUser(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.delete<void>(url);
  }
}
