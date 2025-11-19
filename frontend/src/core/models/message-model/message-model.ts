import { MessageTypeEnum } from './message-type-enum';

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
