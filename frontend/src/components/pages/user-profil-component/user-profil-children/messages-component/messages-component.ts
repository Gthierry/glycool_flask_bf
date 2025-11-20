import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageJson } from '../../../../../core/models/message-model/message-model';

@Component({
  selector: 'app-messages-component',
  imports: [],
  templateUrl: './messages-component.html',
  styleUrl: './messages-component.css',
})
export class MessagesComponent {
  
  messages:MessageJson [] = []
  activatedRoute = inject(ActivatedRoute);
  userService = inject(UserService);

  constructor() {
   this.messages = this.activatedRoute.snapshot.data['messages'];

   
  }

 
}
