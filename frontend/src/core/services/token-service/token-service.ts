import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class TokenService {

  isTokenExpired() {
    console.log("TokenService ==> isTokenExpired appellée....");
    const token = localStorage.getItem('token');
    if (!token) return true;
    console.log("Token présent !");
    const decoded: any = jwtDecode(token);
    const expired = decoded.exp < Date.now() / 1000;
    if (expired) {
      console.log('Token expired !');
    }
    return expired;
  }

  getRole() {
    console.log("TokenService ==> getRole appellée....");
    const token = localStorage.getItem('token');
    if (!token) return null;
    console.log("Token présent !");
    const decoded: any = jwtDecode(token);
    console.log(decoded.role);

    return decoded.role;
  }

  getUserId() {
    console.log("TokenService ==> getUserId appellé...");
    const token = localStorage.getItem('token');
    if (!token) return null;
    console.log("Token présent !");
    const decoded: any = jwtDecode(token);
    return decoded.userId;
  }

  getToken() {
    console.log("Tokenservice ==> getToken appellé...");
    if (localStorage.getItem('token')) {
      console.log("Token présent !");
      return localStorage.getItem('token');
    } else {
      console.log("pas de token......");
      return null;
    }
  }
}
