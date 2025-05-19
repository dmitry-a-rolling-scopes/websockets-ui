import { MessageType } from '../../../enums/message.type.enum';
import { Message } from '../../message.interface';

export interface AddUserToRoomRequest extends Message {
  type: MessageType.ADD_USER_TO_ROOM;
  data: {
    indexRoom: string;
  };
}
