import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../../models/message-model/message-model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  httpClient = inject(HttpClient);
  private readonly apiUrl = 'http://127.0.0.1/message';

  getAllMessagesForRecipient(recipientUserId: number): Observable<Message[]> {
    const url = `${this.apiUrl}/recipient/${recipientUserId}`;
    return this.httpClient.get<Message[]>(url);
  }
}
