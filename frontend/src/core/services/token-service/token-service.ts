import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  isTokenExpired() {
    const token = localStorage.getItem('token');
    if (!token) return true;
    const decoded: any = jwtDecode(token);

    const expired = decoded.exp < Date.now() / 1000;
    if (expired) {
      console.log('Token expired !');
    }
    return expired;
  }

  getRole() {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const decoded: any = jwtDecode(token);
    console.log(decoded.role);

    return decoded.role;
  }

  getUserId() {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const decoded: any = jwtDecode(token);
    return decoded.userId;
  }

  getToken() {
    try {
      console.log("recupération du token");
      return localStorage.getItem('token');
    } catch {
      console.log("token null !");
      return null;
    }
  }
}
