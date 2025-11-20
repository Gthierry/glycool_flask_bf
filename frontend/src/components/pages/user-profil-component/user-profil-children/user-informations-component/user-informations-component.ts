import { Component, effect, inject, Signal } from '@angular/core';

import { AuthService } from '../../../../../core/services/authentification/auth-service';
import { User } from '../../../../../core/models/user-models/user.model';

@Component({
  selector: 'app-user-informations-component',
  imports: [],
  templateUrl: './user-informations-component.html',
  styleUrl: './user-informations-component.css',
})
export class UserInformationsComponent {
  //injection of the parent to retrieve the siganl from the parent
  authService = inject(AuthService);
  user: User | null = null;

  constructor() {
    effect(() => {
      const userData = this.authService.userSignal();
      if (userData) {
        this.user = userData;
        console.log('User data updated in Informations component:', this.user);
      }
    });
  }
}
