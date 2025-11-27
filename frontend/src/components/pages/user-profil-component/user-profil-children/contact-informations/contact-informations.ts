import { Component, effect, inject, signal, Signal } from '@angular/core';
import { User } from '../../../../../core/models/user-models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsComponent } from '../contacts-component/contacts-component';
import { ContactService } from '../../../../../core/services/contact-service/contact-service';
import { UserService } from '../../../../../core/services/user-services/user-service';
import { AuthService } from '../../../../../core/services/authentification/auth-service';
import {
  Message,
  MessageSenderJson,
  MessageSendJson,
} from '../../../../../core/models/message-model/message-model';

@Component({
  selector: 'contactinformations',
  imports: [],
  templateUrl: './contact-informations.html',
  styleUrl: './contact-informations.css',
})
export class ContactInformations {
  contact = signal<User | null>(null);
  user = signal<User | null>(null);

  router = inject(Router);
  contactService = inject(ContactService);
  authService = inject(AuthService);

  activatedRoute = inject(ActivatedRoute);

  receivedMessages = signal<MessageSenderJson[]>([]);
  sendedMessages = signal<MessageSenderJson[]>([]);

  constructor() {
    effect(() => {
      this.user.set(this.authService.userSignal());
      this.contact.set(this.contactService.UserContactSignal());
    });

    this.activatedRoute.snapshot.data['listes'];
    this.receivedMessages.set(this.activatedRoute.snapshot.data['listes'].messagesReceived);
    this.sendedMessages.set(this.activatedRoute.snapshot.data['listes'].messagesSended);
  }
}
