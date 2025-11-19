import { Component, effect, inject } from '@angular/core';
import { AuthService } from '../../../../../core/services/authentification/auth-service';
import { ContactService } from '../../../../../core/services/contact-service/contact-service';
import { Contact } from '../../../../../core/models/contact-models/contact.model';
import { User } from '../../../../../core/models/user-models/user.model';

@Component({
  selector: 'app-contacts-component',
  imports: [],
  templateUrl: './contacts-component.html',
  styleUrl: './contacts-component.css',
})
export class ContactsComponent {
  authService = inject(AuthService);
  userSignal = this.authService.userSignal;
  contactService = inject(ContactService);
  user: User | null = null;

  contactsList: Contact[] = [];

  constructor() {
    //Utiliser effect pour réagir aux changements du signal
    effect(() => {
      const userData = this.userSignal();
      if (userData) {
        this.user = userData;
        this.contactService.getAllContactsForUser(this.user).subscribe({
          next: (response) => {
            this.contactsList = response;
            console.log('Contacts récupérés !');
          },
          error() {
            console.log('Erreur de récupération de contacts');
          },
        });
      }
    });
  }
}
