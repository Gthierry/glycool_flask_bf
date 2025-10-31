import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user-models/user.model';

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

  getUserById(id: number): Observable<User> {
    try {
      const url = `${this.apiUrl}/${id}`;
      return this.httpClient.get<User>(url);
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      throw error; // Re-throw the error after logging it
    }
  }

  createUser(user: User): Observable<User> {
    try {
      console.log('UserService: createUser called');
      const url = `${this.apiUrl}/create`;
      console.log('API URL:', url);
      console.log('Creating user with data:', user);
      return this.httpClient.post<User>(url, user);
    } catch (error) {
      console.error('Error creating user with sercice', error);
      throw error;
    }
  }

  updateUser(id: number, user: User): Observable<User> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.put<User>(url, user);
  }
  deleteUser(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.delete<void>(url);
  }
}
