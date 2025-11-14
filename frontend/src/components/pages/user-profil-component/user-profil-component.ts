import { Component, inject, signal, OnInit } from '@angular/core';
import { User } from '../../../core/models/user-models/user.model';
import { TokenService } from '../../../core/services/token-service/token-service';
import { Router, RouterOutlet, ActivatedRoute, NavigationEnd } from '@angular/router';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Messages } from './user-profil-children/messages/messages';
import { Informations } from './user-profil-children/informations/informations';
import { AuthService } from '../../../core/services/authentification/auth-service';

@Component({
  selector: 'user-profil-component',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './user-profil-component.html',
  styleUrls: ['./user-profil-component.css'],
})
export class UserProfilComponent {
  //signal injection for user data
  userSignal = inject(AuthService);
  //local user data
  user: User | null = null;
  //route injection
  route = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  //token service injection
  tokenService = inject(TokenService);

  constructor() {
    //check if token is valid
    if (this.tokenService.getToken()) {
      //get user data from signal
      this.user = this.userSignal.userSignal();
      console.log('User from localStorage:', this.user);
    } else {
      console.log('No valid token found, redirecting to register.');
      this.route.navigate(['register']);
    }
  }

  navigateToInfosProfile() {
    this.route.navigate(['infos-profil']);
  }
}
