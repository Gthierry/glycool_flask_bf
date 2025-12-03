import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../../models/contact-models/contact.model';
import { User } from '../../models/user-models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  UserContactSignal = signal<User | null>(null);
  contacts: Contact[] = [];

  setUserContactSignal(user: User | null) {
    this.UserContactSignal.set(user);
  }

  //define the api url
  private apiUrl = 'http://localhost:5000/contacts/';
  // Inject HttpClient
  private httpClient = inject(HttpClient);

  getAllContactsForUser(user: User): Observable<Contact[]> {
    const url = `${this.apiUrl}getByUserId/${user.user_id}`;
    return this.httpClient.get<Contact[]>(url);
  }

  addContact(contact:Contact): Observable<Contact>{
    const url = `${this.apiUrl}/add`
    return this.httpClient.post<Contact>(url,contact)
  }
}
