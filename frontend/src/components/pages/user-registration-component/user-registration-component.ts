import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';

//import form modules
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { first } from 'rxjs';
import { UserService } from '../../../core/services/user-services/user-service';
import { Router } from '@angular/router';
import { User, UserRegister } from '../../../core/models/user-models/user.model';
import { AuthService } from '../../../core/services/authentification/auth-service';

@Component({
  selector: 'register',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './user-registration-component.html',
  styleUrl: './user-registration-component.css',
})

//User Registration Component
export class UserRegistrationComponent {
  //form declaration
  form: FormGroup;
  //form builder injection
  fb = inject(FormBuilder);

  //signal user pour l'info à la page profil
  
  authService = inject(AuthService)
  //form initialization in constructor
  constructor() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        Validators.required,
        // Validators.pattern(
        //   '^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\\-={}\\[\\]|:;"\'<>,.?/]).+$',
        // ),
      ],
      confirmPassword: ['', Validators.required],
      firstName: [''],
      lastName: [''],
      birthDate: [''],
      city: [''],
      avatar: [''],
      bio: [''],
      acceptTerms: [false, Validators.requiredTrue],
    });
   
  }

  //inject services
  private userService = inject(UserService);
  //inject activated route
  private route = inject(Router);

  //create user
  userCreate() {
    if (this.form.valid) {
      //TODO ajout verif username en db
      const newUser: UserRegister = {
        username: this.form.value.username,
        email: this.form.value.email,
        password: this.form.value.password,
        token: null,
      };
      console.log('Creating user with data from component:', newUser);
      this.userService.createUser(newUser).subscribe({
        next: (response) => {
          console.log('User created successfully:');
          if(response)
          {
          localStorage.setItem('user', JSON.stringify(response.user) || '');
          localStorage.setItem('token', response.token || '');
          this.authService.userSignal.set(response.user);
          this.route.navigate(['profil']);
        }
        },
        error: (error) => {
          console.error('Form my component : Error creating user:', error);
        },
      });
    }
  }
}
