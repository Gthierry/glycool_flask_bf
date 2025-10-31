import { Component, signal } from '@angular/core';
import { User } from '../../../core/models/user-models/user.model';

@Component({
  selector: 'user-profil-component',
  imports: [],
  templateUrl: './user-profil-component.html',
  styleUrl: './user-profil-component.css',
})
export class UserProfilComponent {
  user: User | null = null;

  constructor() {
    // this.user = JSON.parse(localStorage.getItem('user') || '{}');
    // console.log('User from localStorage:', this.user);
  }
}
