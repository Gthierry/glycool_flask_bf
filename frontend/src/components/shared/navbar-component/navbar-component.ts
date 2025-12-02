import { Component, inject, Input, signal } from '@angular/core';

import bootstrap from '../../../main.server';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/authentification/auth-service';
import { User } from '../../../core/models/user-models/user.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar-component',
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css',
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
})
export class NavbarComponent {
  // Inject Router
  route = inject(Router);
  authentification = inject(AuthService);
  isLogged = signal<boolean>(false);
  userSignal = signal<User | null>(null);

  constructor() {
    this.isLogged = this.authentification.isLogged;
    this.userSignal = this.authentification.userSignal;
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
    this.route.navigate(['register']);
  }
  logout() {
    this.authentification.logout();
    this.authentification.isLogged.set(false);
    this.isLogged = this.authentification.isLogged;
    this.route.navigate(['']);
  }
}
