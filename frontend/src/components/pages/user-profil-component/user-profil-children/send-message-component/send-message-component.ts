import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../../core/services/authentification/auth-service';
import { User } from '../../../../../core/models/user-models/user.model';
import { ActivatedRoute } from '@angular/router';
import { MessageJson } from '../../../../../core/models/message-model/message-model';

@Component({
  selector: 'send-message',
  imports: [],
  templateUrl: './send-message-component.html',
  styleUrl: './send-message-component.css',
})
export class SendMessageComponent {

  userSignal = inject(AuthService)
  user: User | null
  messages: MessageJson [] = [] 

  private readonly route = inject(ActivatedRoute)
  constructor() {

    this.user = this.userSignal.userSignal()
  }


}