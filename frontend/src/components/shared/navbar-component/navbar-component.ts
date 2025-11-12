import { Component, inject, Input, signal } from '@angular/core';

import bootstrap from '../../../main.server';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/authentification/auth-service';
import { WhatSDiabetComponent } from '../../pages/home-component/home-components-children/what-s-diabet-component/what-s-diabet-component/what-s-diabet-component';

@Component({
  selector: 'app-navbar-component',
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css',
  imports: [RouterLink],
})
export class NavbarComponent {
  // Inject Router
  route = inject(Router);
  authentification = inject(AuthService);
  isLogged = signal<boolean>(false);

  constructor() {
    this.isLogged = this.authentification.isLogged;
  }
  //Navigate to home
  navigateToHome() {
    this.route.navigate(['']);
  }

  navigateToLogin() {
    this.route.navigate(['login']);
  }
  // Navigate to register
  navigateToRegister() {
    this.route.navigate(['registration']);
  }
  logout() {
    this.authentification.logout();
    this.authentification.isLogged.set(false);
    this.isLogged = this.authentification.isLogged;
    this.route.navigate(['']);
  }
}
