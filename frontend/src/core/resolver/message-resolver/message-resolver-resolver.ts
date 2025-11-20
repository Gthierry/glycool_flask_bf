import { ResolveFn, Router } from '@angular/router';
import { Message, MessageJson } from '../../models/message-model/message-model';
import { User } from '../../models/user-models/user.model';
import { MessageService } from '../../services/message-service/message-service';
import { inject } from '@angular/core';
import { AuthService } from '../../services/authentification/auth-service';

export const messageResolverResolver: ResolveFn<MessageJson[] | null> = (route, state) => {

 const messageService = inject(MessageService)
 const router = inject(Router)

 let userSignal = inject(AuthService).userSignal
 
 
 

    const user = userSignal();
    
    if (user && user.user_id !== null && user.user_id !== undefined) {
        
      const userId = user.user_id;
      return messageService.getAllMessagesForRecipient(userId);
    }

router.navigate(['messages'])
return null


};
