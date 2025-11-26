import { Component, inject, signal } from '@angular/core';
import { User } from '../../../../../core/models/user-models/user.model';
import { Router } from '@angular/router';
import { ContactsComponent } from '../contacts-component/contacts-component';
import { ContactService } from '../../../../../core/services/contact-service/contact-service';

@Component({
  selector: 'contactinformations',
  imports: [],
  templateUrl: './contact-informations.html',
  styleUrl: './contact-informations.css',
})
export class ContactInformations {
  contact = signal<User | null>(null);

  router = inject(Router);
  contactService = inject(ContactService);

  constructor() {
    this.contact = this.contactService.UserContactSignal;
    console.log('Contact informations loaded:', this.contact());
  }
}
