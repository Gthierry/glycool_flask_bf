import { Component, inject, signal, OnInit } from '@angular/core';
import { User } from '../../../core/models/user-models/user.model';
import { TokenService } from '../../../core/services/token-service/token-service';
import { Router, RouterOutlet, ActivatedRoute, NavigationEnd } from '@angular/router';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Messages } from './user-profil-children/messages/messages';

@Component({
  selector: 'user-profil-component',
  imports: [RouterLink, Messages],
  templateUrl: './user-profil-component.html',
  styleUrls: ['./user-profil-component.css'],
})
export class UserProfilComponent {
  user: User | null = null;
  route = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  showDefaultContent = signal(true);

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
