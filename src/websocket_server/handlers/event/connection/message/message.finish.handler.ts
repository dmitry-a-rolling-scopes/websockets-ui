import { MessageType } from '../../../../enums/message.type.enum';
import { Player } from '../../../../entities/player.entity';
import { FinishResponse } from '../../../../dtos/message/response/message.finish.response.interface';

export class FinishHandler {
  public static handle(winnerPlayer: Player): FinishResponse {
    return {
      type: MessageType.FINISH,
      data: {
        winPlayer: winnerPlayer.id,
      },
      id: 0,
    };
  }
}
