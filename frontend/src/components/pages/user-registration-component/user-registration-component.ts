import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

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
import { User } from '../../../core/models/user-models/user.model';

@Component({
  selector: 'app-user-registration-component',
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
      const newUser: User = {
        username: this.form.value.username,
        email: this.form.value.email,
        password: this.form.value.password,
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        birthDate: this.form.value.birthDate ? new Date(this.form.value.birthDate) : null,
        city: this.form.value.city,
        avatar: this.form.value.avatar,
        bio: this.form.value.bio,
        role: 'user', // or another default role as required
        isActive: true, // or false, depending on your logic
      };
      console.log('Creating user with data from component:', newUser);
      this.userService.createUser(newUser).subscribe({
        next: () => {
          console.log('User created successfully:');
          this.route.navigate(['user-profile-component']);
        },
        error: (error) => {
          console.error('Form my component : Error creating user:', error);
        },
      });
    }
  }
}
