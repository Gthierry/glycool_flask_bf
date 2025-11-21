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
  activatedRoute = inject(ActivatedRoute);
  messageService = inject(MessageService);
  user: User | undefined;
  messages = signal<MessageSenderJson[]>([]);

  constructor() {
    effect(() => {
      this.messages.set(this.activatedRoute.snapshot.data['messages']);
      this.user = this.activatedRoute.snapshot.data['messages'][0]?.sender;
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
