import { Component, effect, inject, signal } from '@angular/core';
import { AuthService } from '../../../../../core/services/authentification/auth-service';
import { ContactService } from '../../../../../core/services/contact-service/contact-service';
import { Contact } from '../../../../../core/models/contact-models/contact.model';
import { User } from '../../../../../core/models/user-models/user.model';
import { UserService } from '../../../../../core/services/user-services/user-service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contacts-component',
  imports: [],
  templateUrl: './contacts-component.html',
  styleUrl: './contacts-component.css',
})
export class ContactsComponent {
  // injection de AuthService pour la récup du current signal user
  authService = inject(AuthService);
  userSignal = this.authService.userSignal;

  // injection de UserService pour faire la recup des contacts
  userService = inject(UserService);

  // injection du ContactService afin de récupérer les contacts
  contactService = inject(ContactService);

  route = inject(Router);
  //injection de ActivatedRoute afin de naviguer vers les autres composants enfants avec les informations concernant le user selectionné
  activatedRoute = inject(ActivatedRoute);

  // déclaration des variables globales user, contactList pour récupérer les contacts utilisateurs, contacts pour récupérer les contacts
  user: User | null = null;
  // utilisation de sig
  contactListSignal = signal<User[]>([]);
  contacts: Contact[] | undefined;

  // constructeur pour charger les données
  constructor() {
    // Utiliser effect pour réagir aux changements du signal
    effect(() => {
      //récup du signal pour vérification
      const userData = this.userSignal();
      if (userData) {
        this.user = userData;
        //récupération des contacts
        this.contactService.getAllContactsForUser(this.user).subscribe({
          next: (response) => {
            this.contacts = response;
            console.log(this.contacts);
            console.log('Contacts récupérés !');
            //s'il ya des contacts dans la listes, on la parcourt et on récupère les infos du user correspondant au contact
            if (this.contacts) {
              for (let contact of this.contacts) {
                console.log('test timing');
                console.log(contact.contact_user_id);
                this.userService.getUserById(contact.contact_user_id).subscribe({
                  next: (response) => {
                    console.log(response);
                    //this.user = response;
                    //on place enfin les contacts dans la liste des contacts que l'on va afficher
                    this.contactListSignal.update((list) => [...list, response]);
                    console.log('affichage des contacts');
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
  navigateToReadMessage() {
    console.log('navigation to readmessage');
    // Navigation vers le composant de lecture de message
    this.route.navigate(['../readmessage'], { relativeTo: this.activatedRoute });
  }
  navigateToContactProfile() {
    console.log('navigation to contact profile informations');
    // Navigation vers le composant des informations du profil du contact
    this.route.navigate(['../informations'], { relativeTo: this.activatedRoute });
  }
}
