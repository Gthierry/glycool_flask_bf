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
  imports: [],
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
  user: User | null = null;

  //initialisation du formulaire via le constructeur
  constructor() {
    this.form = this.fb.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
    });
  }

  // Méthode de connexion
  connexion() {
    if (this.form.valid) {
      console.log('Form is valid, submitting login request...');
      const email = this.form.get('email')?.value;
      const password = this.form.get('password')?.value;
      this.loginService.login(email, password).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          this.user = response;
          localStorage.setItem('user', JSON.stringify(response));
          localStorage.setItem('token', response.access_token);

          this.route.navigate(['/user-profile']);
        },
        error: (error) => {
          console.error('Login failed:', error);
        },
      });
    }
  }
}
