import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  MessageJson,
  MessageSenderJson,
} from '../../../../../core/models/message-model/message-model';
import { UserService } from '../../../../../core/services/user-services/user-service';
import { User, UserMessage } from '../../../../../core/models/user-models/user.model';
import { MessageService } from '../../../../../core/services/message-service/message-service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../../core/services/authentification/auth-service';

@Component({
  selector: 'app-messages-component',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './messages-component.html',
  styleUrl: './messages-component.css',
})
export class MessagesComponent {
  //injections activated route to use with resolver and message service
  activatedRoute = inject(ActivatedRoute);
  messageService = inject(MessageService);
  authService = inject(AuthService);
  //form builder injection for message form sending
  fb = inject(FormBuilder);
  messageForm: FormGroup;
  //sendersignal to hold the sender user
  sender = signal<User | null>(null);
  //signal to hold the list of messages
  messages = signal<MessageSenderJson[]>([]);

  //Signal current user
  currentUser = signal<User | null>(null);

  //signal to control message display
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
    //initialize the message form
    this.messageForm = this.fb.group({
      recipient: [''],
      subject: [''],
      body: [''],
    });
    //set current user signal
    this.currentUser.set(this.authService.getCurrentUser());
  }

  //delete message function to be implemented
  delete(messageId: number) {
    this.messageService.deleteMessage(messageId).subscribe({
      next: () => {
        this.messages.update((list) => list.filter((m) => m.id !== messageId));
      },
    });
  }
  //send message function to be implemented
  sendMessage() {
    if (this.messageForm.valid && this.currentUser()) {
      const newMessage: MessageJson = {
        sender_user_id: this.currentUser().user_id,
        receiver_user_id: this.messageForm.value.recipient,
        subject: this.messageForm.value.subject,
        body: this.messageForm.value.body,
        created_at: new Date().toISOString(),
        type: 'message',
        read: false,
      };
      // Implement sending logic here
    }
  }
}
