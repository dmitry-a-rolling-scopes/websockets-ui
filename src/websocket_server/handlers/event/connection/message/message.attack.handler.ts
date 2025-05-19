import { AttackRequest } from '../../../../dtos/message/request/message.attack.request.interface';
import { AttackResponse } from '../../../../dtos/message/response/message.attack.response.interface';
import { MessageType } from '../../../../enums/message.type.enum';
import { Status } from '../../../../dtos/message/message.data.attack.status.type';

export class AttackHandler {
  public static handle(request: AttackRequest, status: Status): AttackResponse {
    return {
      type: MessageType.ATTACK,
      data: {
        currentPlayer: request.data.indexPlayer,
        position: {
          x: request.data.x,
          y: request.data.y,
        },
        status: status,
      },
      id: 0,
    };
  }
}
