import { ResolveFn, Router } from '@angular/router';
import { MessageSenderJson } from '../../models/message-model/message-model';
import { inject } from '@angular/core';
import { MessageService } from '../../services/message-service/message-service';
import { AuthService } from '../../services/authentification/auth-service';
import { ContactService } from '../../services/contact-service/contact-service';
import { forkJoin } from 'rxjs';

export const inOutMessageboxResolver: ResolveFn<MessageSenderJson[] | null> = (route, state) => {
  
  const messageService = inject(MessageService);
  const router = inject(Router);

   const userSignal = inject(AuthService).userSignal;
   const contactSignal =  inject(ContactService).UserContactSignal

   if(userSignal() && userSignal()?.user_id && contactSignal() && contactSignal()?.user_id){
    return forkJoin({
      messagesSended: messageService.getMessagesForUser1Contact(userSignal()?.user_id,contactSignal()?.user_id),
      messagesReceived: messageService.getMessagesForUser1Contact(contactSignal()?.user_id,userSignal()?.user_id)
    })

   }
   else{
    router.navigate(['contactinformations'])
    return forkJoin({messagesSended:[],messagesReceived:[]})
   }

  
};
