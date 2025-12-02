import { Component, inject, Input, signal } from '@angular/core';

import bootstrap from '../../../main.server';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/authentification/auth-service';
import { User } from '../../../core/models/user-models/user.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenService } from '../../../core/services/token-service/token-service';

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

  isLogged = this.authentification.isLogged;
  userSignal = this.authentification.userSignal
  

  // constructor() {
  //   console.log("passage par constructeur navbar");
  //   if (this.isLogged()) {
  //     console.log("if constructeur" + this.isLogged);
  //     this.isLogged.set(this.authentification.isLogged())
  //     this.userSignal.set(this.authentification.userSignal())
   
  //   }
  // }

  // ngOnInit(): void {
  //   console.log("passage par oninit navbar");
  //  if (this.isLogged()) {
  //     console.log("if onInit");
  //     this.isLogged.set(this.authentification.isLogged())
  //     this.userSignal.set(this.authentification.userSignal())
  //   }
  // }
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
