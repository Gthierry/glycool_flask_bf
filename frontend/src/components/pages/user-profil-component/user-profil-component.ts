import { Component, inject, signal } from '@angular/core';
import { User } from '../../../core/models/user-models/user.model';
import { TokenService } from '../../../core/services/token-service/token-service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'user-profil-component',
  imports: [DatePipe, RouterLink],
  templateUrl: './user-profil-component.html',
  styleUrl: './user-profil-component.css',
})
export class UserProfilComponent {
  user: User | null = null;
  route = inject(Router);

  constructor(tokenService: TokenService) {
    if (tokenService.getToken()) {
      this.user = JSON.parse(localStorage.getItem('user') || '{}');
      console.log('User from localStorage:', this.user);
    } else {
      this.route.navigate(['register']);
    }
  }

  navigateToInfosProfile() {
    this.route.navigate(['infos-profil']);
  }
}
