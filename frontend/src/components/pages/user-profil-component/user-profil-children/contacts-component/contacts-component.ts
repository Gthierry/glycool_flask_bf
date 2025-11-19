import { Component, effect, inject } from '@angular/core';
import { AuthService } from '../../../../../core/services/authentification/auth-service';
import { ContactService } from '../../../../../core/services/contact-service/contact-service';
import { Contact } from '../../../../../core/models/contact-models/contact.model';
import { User } from '../../../../../core/models/user-models/user.model';
import { UserService } from '../../../../../core/services/user-services/user-service';

@Component({
  selector: 'app-contacts-component',
  imports: [],
  templateUrl: './contacts-component.html',
  styleUrl: './contacts-component.css',
})
export class ContactsComponent {
  authService = inject(AuthService);
  userService = inject(UserService);
  userSignal = this.authService.userSignal;
  contactService = inject(ContactService);
  user: User | null = null;
  contactList: User[] = [];
  contacts: Contact[] | undefined;

  constructor() {
    //Utiliser effect pour réagir aux changements du signal
    effect(() => {
      const userData = this.userSignal();
      if (userData) {
        this.user = userData;
        this.contactService.getAllContactsForUser(this.user).subscribe({
          next: (response) => {
            this.contacts = response;
            console.log(this.contacts);
            console.log('Contacts récupérés !');
            if (this.contacts) {
              for (let contact of this.contacts) {
                console.log('test timing');
                console.log(contact.contact_user_id);
                this.userService.getUserById(contact.contact_user_id).subscribe({
                  next: (response) => {
                    console.log(response);
                    this.user = response;
                    this.contactList.push(this.user);
                    console.log(this.contactList);
                  },
                });
              }
            }
          },
          error() {
            console.log('Erreur de récupération de contacts');
          },
        });
      }
    });
  }
}
