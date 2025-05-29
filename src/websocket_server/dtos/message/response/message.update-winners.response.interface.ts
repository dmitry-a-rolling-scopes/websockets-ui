import { MessageType } from '../../../enums/message.type.enum';
import { Message } from '../../message.interface';
import { Winner } from '../message.data.winner';

export interface UpdateWinnersResponse extends Message {
  type: MessageType.UPDATE_WINNERS;
  data: Winner[] | [];
}
