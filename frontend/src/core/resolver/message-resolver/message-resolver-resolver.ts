import { ResolveFn, Router } from '@angular/router';
import { Message, MessageJson, MessageSenderJson } from '../../models/message-model/message-model';
import { User } from '../../models/user-models/user.model';
import { MessageService } from '../../services/message-service/message-service';
import { inject } from '@angular/core';
import { AuthService } from '../../services/authentification/auth-service';
import { Observable } from 'rxjs';

export const messageResolverResolver: ResolveFn<MessageSenderJson[] | null> = (route, state) => {
  const messageService = inject(MessageService);
  const router = inject(Router);

  const userSignal = inject(AuthService).userSignal;

  const user = userSignal();

  if (user && user.user_id !== null && user.user_id !== undefined) {
    try {
      const userId = user.user_id;
      return messageService.getAllMessagesForRecipient(userId);
    } catch (error) {
      return null;
      router.navigate(['messages']);
    }
  } else {
    router.navigate(['messages']);
    return null;
  }
};
