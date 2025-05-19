import { MessageType } from '../../../enums/message.type.enum';
import { Message } from '../../message.interface';

export interface UpdateRoomResponse extends Message {
  type: MessageType.UPDATE_ROOM;
  data:
    | {
        roomId: string;
        roomUsers: {
          name: string;
          index: string;
        }[];
      }[]
    | [];
}
