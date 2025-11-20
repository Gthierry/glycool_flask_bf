import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageJson, MessageSenderJson } from '../../../../../core/models/message-model/message-model';
import { UserService } from '../../../../../core/services/user-services/user-service';
import { User, UserMessage } from '../../../../../core/models/user-models/user.model';

@Component({
  selector: 'app-messages-component',
  imports: [],
  templateUrl: './messages-component.html',
  styleUrl: './messages-component.css',
})
export class MessagesComponent {
  
  messages:MessageSenderJson [] = []
  activatedRoute = inject(ActivatedRoute);
  userName:string = ''
  user: UserMessage | null = null;

  constructor() {
   this.messages = this.activatedRoute.snapshot.data['messages'];
   this.user =this.activatedRoute.snapshot.data['messages'][0]?.sender


   
  }

 
}
