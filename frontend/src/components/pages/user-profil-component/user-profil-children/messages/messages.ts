import { Component, Input } from '@angular/core';
import { User } from '../../../../../core/models/user-models/user.model';

@Component({
  selector: 'messages',

  templateUrl: './messages.html',
  styleUrl: './messages.css',
})
export class Messages {
  
  @Input() userSignal : User | undefined 
}
