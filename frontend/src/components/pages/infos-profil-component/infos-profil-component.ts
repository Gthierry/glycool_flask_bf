import { Component } from '@angular/core';
import { User } from '../../../core/models/user-models/user.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'infos-profil',
  imports: [DatePipe],
  templateUrl: './infos-profil-component.html',
  styleUrl: './infos-profil-component.css',
})
export class InfosProfilComponent {
  user: User | undefined;

  constructor() {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }
}
