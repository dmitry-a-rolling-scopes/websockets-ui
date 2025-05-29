import { MessageType } from '../../../../enums/message.type.enum';
import { StartGameResponse } from '../../../../dtos/message/response/message.start-game.response.interface';
import { Ship } from '../../../../entities/ship.entity';
import { Ship as ShipInterface } from '../../../../dtos/message/message.data.ship.interface';
import { Game } from '../../../../entities/game.entity';
import { Player } from '../../../../entities/player.entity';

export class StartGameHandler {
  public static handle(game: Game, player: Player): StartGameResponse {
    return {
      type: MessageType.START_GAME,
      data: {
        ships: game.getShips(player).map(
          (ship: Ship): ShipInterface => ({
            position: ship.getPosition(),
            direction: ship.getDirection(),
            length: ship.getLength(),
            type: ship.getType(),
          }),
        ),
        currentPlayerIndex: player.id,
      },
      id: 0,
    };
  }
}
