import { Component, inject, signal, OnInit } from '@angular/core';
import { User } from '../../../core/models/user-models/user.model';
import { TokenService } from '../../../core/services/token-service/token-service';
import { Router, RouterOutlet, ActivatedRoute, NavigationEnd } from '@angular/router';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Messages } from './user-profil-children/messages/messages';
import { Informations } from "./user-profil-children/informations/informations";

@Component({
  selector: 'user-profil-component',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './user-profil-component.html',
  styleUrls: ['./user-profil-component.css'],
})
export class UserProfilComponent {
  //signal to hold user data and reactively update the template
  userSignal = signal<User | null>(null)
  //
  user: User | null = null;
  //route injection 
  route = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  showDefaultContent = signal(true);

  constructor(tokenService: TokenService) {
    if (tokenService.getToken()) {
      this.user = JSON.parse(localStorage.getItem('user') || '{}');
      //put the user in the signal to share it with children
      this.userSignal.set(this.user);
      console.log('User from localStorage:', this.user);
    } else {
      this.route.navigate(['register']);
    }
  }

  navigateToInfosProfile() {
    this.route.navigate(['infos-profil']);
  }

  updateUserSignal(user:User){
    this.userSignal.set(user)
  }
}
