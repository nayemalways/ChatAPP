import { Types } from 'mongoose';

export interface IMessage {
  sender_id: string | Types.ObjectId;
  receiver_id: string | Types.ObjectId;
  text?: string;
  img?: string;
  seen?: boolean;
}
