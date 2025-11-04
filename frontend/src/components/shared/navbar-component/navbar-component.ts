import { Component, inject, Input } from '@angular/core';

import bootstrap from '../../../main.server';
import { Router } from '@angular/router';
import { log } from 'console';

@Component({
  selector: 'app-navbar-component',
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css',
})
export class NavbarComponent {
  isLogged = false;
  // Inject Router
  route = inject(Router);

  //Navigate to home
  navigateToHome() {
    this.route.navigate(['']);
  }
  // Navigate to register
  navigateToRegister() {
    this.route.navigate(['registration']);
  }
  navigateToLogin() {
    this.route.navigate(['login']);
  }
  logout() {
    this.isLogged = false;
    this.route.navigate(['']);
  }
  
}
