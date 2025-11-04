import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import {User, UserLogin } from '../../models/user-models/user.model';
import { Observable } from 'rxjs';
import { sign } from 'crypto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiURL = 'http://localhost:5000/users/login';
  httpClient = inject(HttpClient);

    user: User | any;
  
    
    //login user
    userLogin(user:UserLogin): Observable<any>{
      try{
        const url = `${this.apiURL}`;
        
        return this.httpClient.post<any>(url, user);
          
      } catch (error) {
        console.error('Error during user login:', error);
        throw error;
      }
    }
  }
 
  

