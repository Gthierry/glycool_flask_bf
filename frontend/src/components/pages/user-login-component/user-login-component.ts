import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User, UserLogin } from '../../../core/models/user-models/user.model';
import { UserService } from '../../../core/services/user-services/user-service';
import { AuthService } from '../../../core/services/authentification/auth-service';
import { Router } from '@angular/router';
import { log } from 'node:console';
import { passwordCheck } from '../../../Utilities/password-check';



@Component({
  selector: 'app-user-login-component',
  imports: [ReactiveFormsModule],
  templateUrl: './user-login-component.html',
  styleUrl: './user-login-component.css',
})
export class UserLoginComponent {
  // Formulaire de connexion
  form: FormGroup;
  fb = inject(FormBuilder);

  // Service et routeur
  loginService = inject(AuthService);
  route = inject(Router);

  //déclaration user
  user: User | any;
  isLogged= signal<boolean>(false);

  //initialisation du formulaire via le constructeur
  constructor() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // Méthode de connexion
  connexion() {
    if (this.form.valid) {
      const userCredentials: UserLogin = {
       email: this.form.value.email,
       password: this.form.value.password,
       token: null
      }
      this.loginService.userLogin(userCredentials).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          localStorage.setItem('user', JSON.stringify(response.user));
          if (response.token) {
            localStorage.setItem('token',response.token );
          }
          this.route.navigate(['/profil']);
        },
        error: (error: any) => {
          console.error('Login invalide', error);
        },
        complete: () => {
         this.isLogged.set(true);
          console.log('Login request completed.');
        }
      });
    }
  }
}
