import { MessageType } from '../../../../enums/message.type.enum';
import { TurnResponse } from '../../../../dtos/message/response/message.turn.response.interface';
import { Player } from '../../../../entities/player.entity';

export class TurnHandler {
  public static handle(currentPlayer: Player): TurnResponse {
    return {
      type: MessageType.TURN,
      data: {
        currentPlayer: currentPlayer.id,
      },
      id: 0,
    };
  }
}
