import { User } from '../user-models/user.model';
import { MessageTypeEnum } from './message-type-enum';

//Objet Message
export interface Message {
  id: number;
  senderUserId: number;
  recipientUserId: number;
  subject: string;
  body: string;
  timestamp: string;
  type: string;
  read: boolean;
}
//Objet pour récupérer mon objet depuis json
export interface MessageJson {
  id: number;
  sender_user_id: number;
  receiver_user_id: number;
  subject: string;
  body: string;
  created_at: string;
  type: string;
  read: boolean;
}

export interface MessageSenderJson {
  id: number;
  sender_user_id: number;
  receiver_user_id: number;
  subject: string;
  body: string;
  created_at: string;
  type: string;
  read: boolean;
  sender: User;
}

export interface MessageSendJson {
  message_sender_user_id: number;
  message_receiver_user_id: number;
  message_subject: string;
  message_body: string;
  message_type: string;
  message_read: boolean | false;
}
