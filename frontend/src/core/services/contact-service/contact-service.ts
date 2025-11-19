import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../../models/contact-models/contact.model';
import { User } from '../../models/user-models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contacts: Contact[] = [];

  //define the api url
  private apiUrl = 'http://localhost:5000/contacts/';
  // Inject HttpClient
  private httpClient = inject(HttpClient);

  getAllContactsForUser(user: User): Observable<Contact[]> {
    const url = `${this.apiUrl}getByUserId/${user.user_id}`;
    return this.httpClient.get<Contact[]>(url);
  }
}
