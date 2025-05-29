import { MessageType } from '../../../enums/message.type.enum';
import { Message } from '../../message.interface';

export interface CreateRoomRequest extends Message {
  type: MessageType.CREATE_ROOM;
  data: '';
}
