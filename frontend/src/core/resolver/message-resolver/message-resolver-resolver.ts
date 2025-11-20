import { ResolveFn, Router } from '@angular/router';
import { Message, MessageJson } from '../../models/message-model/message-model';
import { User } from '../../models/user-models/user.model';
import { MessageService } from '../../services/message-service/message-service';
import { inject } from '@angular/core';
import { AuthService } from '../../services/authentification/auth-service';
import { Observable } from 'rxjs';

export const messageResolverResolver: ResolveFn<MessageJson[] | null> = (route, state) => {

 const messageService = inject(MessageService)
 const router = inject(Router)

 let userSignal = inject(AuthService).userSignal
 let messages : Observable<MessageJson[]> | null = null;
 
 
 

    const user = userSignal();
    
    if (user && user.user_id !== null && user.user_id !== undefined) {
        
      const userId = user.user_id;
      messages =  messageService.getAllMessagesForRecipient(userId);
      

      }
    }

router.navigate(['messages'])
return null


};
