import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  MessageJson,
  MessageSenderJson,
  MessageSendJson,
} from '../../../../../core/models/message-model/message-model';
import { UserService } from '../../../../../core/services/user-services/user-service';
import { User, UserMessage } from '../../../../../core/models/user-models/user.model';
import { MessageService } from '../../../../../core/services/message-service/message-service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../../core/services/authentification/auth-service';
import { time } from 'node:console';
import { ContactService } from '../../../../../core/services/contact-service/contact-service';
import { Contact } from '../../../../../core/models/contact-models/contact.model';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-messages-component',
  templateUrl: './messages-component.html',
  styleUrls: ['./messages-component.css'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
})
export class MessagesComponent implements OnInit {
  //injections activated route to use with resolver and message service
  activatedRoute = inject(ActivatedRoute);
  messageService = inject(MessageService);
  authService = inject(AuthService);
  contactService = inject(ContactService);
  userService = inject(UserService);
  //form builder injection for message form sending
  fb = inject(FormBuilder);
  messageForm: FormGroup;
  //sendersignal to hold the sender user
  sender = signal<User | null>(null);
  //signal to hold the list of messages
  messages = signal<MessageSenderJson[]>([]);

  //Signal current user
  currentUser = signal<User | null>(null);

  userContacts: User[] = [];
  //contacts
  contacts: Contact[] | undefined;

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
      //set current user signal
      this.currentUser.set(this.authService.getCurrentUser());

      console.log('Current User in Messages Component:', this.currentUser());
      console.log('---------------------------------------------');
      console.log('Loading contacts for current user...');
      //recupération des contacts de l'utilisateur courant
      if (this.currentUser()) {
        //récupération des contacts
        console.log('Current User ID:', this.currentUser()!.user_id);
        this.contactService.getAllContactsForUser(this.currentUser()!).subscribe((response) => {
          console.log('Contacts response:', response);
          this.contacts = response;

          if (this.contacts) {
            for (let c of this.contacts) {
              this.userService.getUserById(c.contact_user_id).subscribe({
                next: (response) => {
                  this.userContacts.push(response);
                },
              });
            }
          }
        });
      }
    });

    //initialize the message form
    this.messageForm = this.fb.group({
      recipient: [''],
      subject: [''],
      body: [''],
    });
  }

  //used for toggling the contacts list display in html
  displayContactsListe = signal<boolean>(false);
  FilteredContacts: User[] = [];
  displaySendMessageOk = signal<boolean>(false);

  ngOnInit(): void {
    //subscribe to changes in the recipient field of the form
    this.messageForm.get('recipient')?.valueChanges.subscribe((value) => {
      console.log('Recipient field changed:', value);
      this.FilteredContacts = this.userContacts.filter((user) =>
        user.username.toLowerCase().startsWith(value.toLowerCase()),
      );
      console.log('Filtered Contacts:', this.FilteredContacts);
      this.displayContactsListe.set(this.FilteredContacts.length > 0);
      console.log('Display Contacts List:', this.displayContactsListe());
    });
  }

  selectRecipient(username: string): number {
    this.messageForm.get('recipient')?.setValue(username);
    const id = this.userContacts.find((user) => user.username === username)?.user_id;
    this.displayContactsListe.set(false);
    return id ?? 0;
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
      console.log('Sending message with form values:', this.messageForm.value);
      const newMessage: MessageSendJson = {
        message_sender_user_id: this.currentUser()?.user_id ?? 0,
        message_receiver_user_id: this.selectRecipient(this.messageForm.value.recipient),
        message_subject: this.messageForm.value.subject,
        message_body: this.messageForm.value.body,
        message_type: 'message',
        message_read: false,
      };
      try {
        console.log('New Message to send:', newMessage);
        this.messageService.sendMessage(newMessage).subscribe({
          next: (response) => {
            console.log('Message sent successfully:', response);
            this.displaySendMessageOk.set(true);
            // Optionally, reset the form after successful sending
            this.messageForm.reset();
            setTimeout(() => this.displaySendMessageOk.set(false), 3000);
          },
          error: (error) => {
            console.error('Error sending message:', error);
          },
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  }
}
