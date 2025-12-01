import { ResolveFn, Router } from '@angular/router';
import { MessageSenderJson } from '../../models/message-model/message-model';
import { inject } from '@angular/core';
import { MessageService } from '../../services/message-service/message-service';
import { AuthService } from '../../services/authentification/auth-service';
import { ContactService } from '../../services/contact-service/contact-service';
import { forkJoin, map } from 'rxjs';

export const inOutMessageboxResolver: ResolveFn<{
  messagesSended: MessageSenderJson[];
  messagesReceived: MessageSenderJson[];
}> = (route, state) => {
  const messageService = inject(MessageService);
  const router = inject(Router);

  const userSignal = inject(AuthService).userSignal;
  const contactSignal = inject(ContactService).UserContactSignal;
  const user = userSignal();
  const contact = contactSignal();

  if (user && user.user_id && contact && contact.user_id) {
    
    return forkJoin({
      messagesSended: messageService
        .getMessagesForUser1Contact(user.user_id, contact.user_id)
        .pipe(map((result) => result ?? [])),
      messagesReceived: messageService
        .getMessagesForUser1Contact(contact.user_id, user.user_id)
        .pipe(map((result) => result ?? [])),
    });
  } else {
    router.navigate(['contactinformations']);
    return forkJoin({ messagesSended: [], messagesReceived: [] });
  }
};
