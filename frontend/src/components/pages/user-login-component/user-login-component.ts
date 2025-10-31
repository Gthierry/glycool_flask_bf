import { Component, inject } from '@angular/core';
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
      const email = this.form.value.email;
      const password = this.form.value.password;

      this.loginService.login(email, password).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          this.user = response.user;
          console.log("l'utilsateur: " + this.user);
          localStorage.setItem('user', JSON.stringify(response));
          // localStorage.setItem('token', response.access_token);

          this.route.navigate(['/user-profile-component']);
        },
        error: (error) => {
          console.error('Login failed:', error);
        },
      });
    }
  }
}
