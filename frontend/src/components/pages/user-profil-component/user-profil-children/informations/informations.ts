import { Component, inject, Input, input } from '@angular/core';
import { User } from '../../../../../core/models/user-models/user.model';
import { UserProfilComponent } from '../../user-profil-component';
@Component({
  selector: 'informations',
  imports: [],
  templateUrl: './informations.html',
  styleUrl: './informations.css',
})
export class Informations {

 //injection of the parent to retrieve the siganl from the parent
 parent = inject(UserProfilComponent)
 user = this.parent.user



}
