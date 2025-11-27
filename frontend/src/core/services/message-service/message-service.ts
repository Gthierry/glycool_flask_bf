import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Message,
  MessageJson,
  MessageSenderJson,
  MessageSendJson,
} from '../../models/message-model/message-model';
import { urlencoded } from 'express';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  httpClient = inject(HttpClient);
  private readonly apiUrl = 'http://127.0.0.1:5000/message';

  getAllMessagesForRecipient(recipientUserId: number): Observable<MessageSenderJson[] | null> {
    const url = `${this.apiUrl}/recipient/${recipientUserId}`;
    return this.httpClient.get<MessageSenderJson[]>(url);
  }

  deleteMessage(messageId: number): Observable<void> {
    const url = `${this.apiUrl}/delete/${messageId}`;
    return this.httpClient.delete<void>(url);
  }

  sendMessage(message: MessageSendJson): Observable<MessageSendJson> {
    const url = `${this.apiUrl}/create`;
    return this.httpClient.post<MessageSendJson>(url, message);
  }

  getMessagesForUser1Contact(sender_id:number,receiver_id:number): Observable<MessageSenderJson[] | null>{
    const url = `${this.apiUrl}/getMessagesForAUserToDistinctRecipient/${sender_id}/${receiver_id}`;
    return this.httpClient.get<MessageSenderJson[]>(url)
  }
}

