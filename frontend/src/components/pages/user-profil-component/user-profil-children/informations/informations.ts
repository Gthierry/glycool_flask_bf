import { Component, Input, input } from '@angular/core';
import { User } from '../../../../../core/models/user-models/user.model';
@Component({
  selector: 'informations',
  imports: [],
  templateUrl: './informations.html',
  styleUrl: './informations.css',
})
export class Informations {

  //input siganl user to retrieve informations from userSignal declared in the user-profil
  // user = input<User>()
  @Input() user : User | undefined 



}
