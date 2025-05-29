import { CreateGameResponse } from '../../../../dtos/message/response/message.create-game.response.interface';
import { MessageType } from '../../../../enums/message.type.enum';
import { Player } from '../../../../entities/player.entity';
import { Game } from '../../../../entities/game.entity';

export class CreateGameHandler {
  public static handle(game: Game, player: Player): CreateGameResponse {
    return {
      type: MessageType.CREATE_GAME,
      data: {
        idGame: game.id,
        idPlayer: player.id,
      },
      id: 0,
    };
  }
}
