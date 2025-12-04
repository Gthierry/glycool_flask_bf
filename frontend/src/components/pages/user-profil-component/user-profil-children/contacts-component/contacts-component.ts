import {
  Component,
  effect,
  ElementRef,
  inject,
  PLATFORM_ID,
  signal,
  ViewChild,
} from '@angular/core';
import { AuthService } from '../../../../../core/services/authentification/auth-service';
import { ContactService } from '../../../../../core/services/contact-service/contact-service';
import { Contact } from '../../../../../core/models/contact-models/contact.model';
import { User, UserIdUsername } from '../../../../../core/models/user-models/user.model';
import { UserService } from '../../../../../core/services/user-services/user-service';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { Modal } from 'bootstrap';
import { isPlatformBrowser, UpperCasePipe } from '@angular/common';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { error } from 'console';
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

  // déclaration des variables globales user, contactList pour récupérer les contacts utilisateurs, contacts pour récupérer les contacts
  user: User | null = null;
  // utilisation de sig
  contactListSignal = signal<User[]>([]);
  contacts: Contact[] | undefined;
  contactSignal = this.contactService.UserContactSignal;

  //liste des user_id et username
  usernames = signal<UserIdUsername[] | undefined>([]);
  //liste des users apres recherche
  filteredUsers = signal<UserIdUsername[] | undefined>([]);
  //Variable modale pour la fenêtre avec décorateur pour la ref html
  private platformId = inject(PLATFORM_ID);
  @ViewChild('myModal', { static: false }) modalElement!: ElementRef;
  modal: any | null = null;

  
  // constructeur pour charger les données
  constructor() {
    // Utiliser effect pour réagir aux changements du signal
    effect(() => {
      //récup du signal pour vérification
      //récupère la liste des users
      this.getUsersUsername();
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

  //Navigation buttons

  navigateToReadMessage() {
    console.log('navigation to readmessage');
    // Navigation vers le composant de lecture de message
    this.route.navigate(['readmessage']);
  }

  navigateToContactDetails(contact: User) {
    console.log('navigation to contact profile informations');
    console.log(contact);
    this.contactService.setUserContactSignal(contact);
    // Navigation vers le composant des informations du profil du contact avec l'état du contact
    this.route.navigate(['profil/contactinformations']);
  }

  //recupère la liste des user_id et username
  getUsersUsername() {
    this.userService.getAllUsersIdUsername().subscribe({
      next: (response) => {
        this.usernames.set(response);
        this.filteredUsers.set(response ?? []); // init la vue
      },
      error: (err) => {
        console.error('Failed to load usernames', err);
        this.usernames.set([]);
        this.filteredUsers.set([]);
      },
    });
  }
  
  /* Fenetre Modal */
  //pour la gestion de la fenêtre modal
  openModal() {
    if (this.modal && isPlatformBrowser(this.platformId)) {
      this.modal.show();
    }
  }

  closeModal() {
    if (this.modal && isPlatformBrowser(this.platformId)) {
      this.modal.hide();
    }

  }

  //bootstrap pour la fenêtre modal
  async ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const bootstrap = await import('bootstrap');
      this.modal = new bootstrap.Modal(this.modalElement.nativeElement);
    }
  }

  search(str: string) {
    const q = (str ?? '').toLowerCase().trim();
    const src = this.usernames() ?? [];
    if (!q) {
      this.filteredUsers.set(src); // reset sur la source
      return;
    }
    this.filteredUsers.set(src.filter((u) => u.username.toLowerCase().includes(q)));
  }
  isContact(user_id: number): boolean {
    const contacts = this.contactListSignal();
    return contacts.some(contact => contact.user_id === user_id);
  }
  addContact(contact_id: number) {
    console.log("Tentative d'ajout de contact...");
    //verifier si le user à ce déjà ce contact via service
    const currentUser: User | null = this.userSignal();
    if (currentUser) {
      this.contactService.getAllContactsForUser(currentUser).subscribe({
        next: (contactList) => {
          if(contactList){
            console.log("il y a une liste de contact");
            if(contactList.length>0){}
            for (const contact of contactList) {
              //si oui, affiche une erreur
              if (contact.contact_user_id == contact_id) {
                console.log("contact déjà existant");
                return alert("Déjà existant dans la liste de contacts");
              }
            }
            console.log("ajout du contact");
            if (currentUser.user_id !== null && currentUser.user_id !== undefined) {
              const contact: Contact = {
                user_id: currentUser.user_id,
                contact_user_id: contact_id,
                
              };
              try {
                this.contactService.addContact(contact).subscribe({
                  next: (response) => {
                  const contact = this.userService.getUserById(response.contact_user_id).subscribe({
                    next: (res) =>{
                    this.contactListSignal.update(list => [...list, res])
                    }
                  })
                  }
                });
                console.log('contact ajouté');
              } catch (e) {
                console.log("Exception !!!!!!!!!!!!!!!!!!!!!");
              }
            } else {
              alert("L'identifiant utilisateur est invalide.");
            }
            //vérifier rafraichissement des contacts 
          }
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des contacts', err);
        }
      });
    } else {
      console.error('No user found, cannot add contact.');
    }
  }

  
}
