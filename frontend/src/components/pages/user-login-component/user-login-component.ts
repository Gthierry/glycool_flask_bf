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
  isLogged = signal<boolean>(false);

  //initialisation du formulaire via le constructeur
  constructor() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // Méthode de connexion
  connexion() {
    console.log('button pushed');
    if (this.form.valid) {
      console.log('valid form !');
      try {
        const userCredentials: UserLogin = {
          email: this.form.value.email,
          password: this.form.value.password,
          token: null,
        };
        console.log('UserLogin created');

        this.loginService.userLogin(userCredentials);
        if (this.isLogged()) {
          this.route.navigate(['profil']);
        }
      } catch (error) {
        console.error('Login error:', error);
      }
    }
  }
}
