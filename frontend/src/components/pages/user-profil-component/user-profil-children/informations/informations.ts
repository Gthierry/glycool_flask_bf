import { Component, effect, inject, Input, input } from '@angular/core';
import { User } from '../../../../../core/models/user-models/user.model';
import { UserProfilComponent } from '../../user-profil-component';
import { AuthService } from '../../../../../core/services/authentification/auth-service';
@Component({
  selector: 'informations',
  imports: [],
  templateUrl: './informations.html',
  styleUrl: './informations.css',
})
export class Informations {
  //injection of the parent to retrieve the siganl from the parent
  userSignal = inject(AuthService).userSignal;
  user: User | null = null;

  constructor() {
    effect(() => {
      const userData = this.userSignal();
      if (userData) {
        this.user = userData;
        console.log('User data updated in Informations component:', this.user);
      }
    });
  }
}
