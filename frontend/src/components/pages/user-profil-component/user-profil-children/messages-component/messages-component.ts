import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  MessageJson,
  MessageSenderJson,
} from '../../../../../core/models/message-model/message-model';
import { UserService } from '../../../../../core/services/user-services/user-service';
import { User, UserMessage } from '../../../../../core/models/user-models/user.model';
import { MessageService } from '../../../../../core/services/message-service/message-service';

@Component({
  selector: 'app-messages-component',
  imports: [],
  templateUrl: './messages-component.html',
  styleUrl: './messages-component.css',
})
export class MessagesComponent {
  //injections activated route to use with resolver and message service
  activatedRoute = inject(ActivatedRoute);
  messageService = inject(MessageService);

  //sendersignal to hold the sender user
  sender = signal<User | null>(null);
  //signal to hold the list of messages
  messages = signal<MessageSenderJson[]>([]);

  messageToDisplay = signal<boolean>(false);

  constructor() {
    effect(() => {
      if (this.activatedRoute.snapshot.data['messages']?.length > 0) {
        this.messageToDisplay.set(true);
        this.messages.set(this.activatedRoute.snapshot.data['messages']);
        this.sender.set(this.activatedRoute.snapshot.data['messages'][0]?.sender);
      } else {
        this.messageToDisplay.set(false);
      }
    });
  }

  //delete message function to be implemented
  delete(messageId: number) {
    this.messageService.deleteMessage(messageId).subscribe({
      next: () => {
        this.messages.update((list) => list.filter((m) => m.id !== messageId));
      },
    });
  }
}
