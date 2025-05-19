import { AddShipsRequest } from '../../../../dtos/message/request/message.add-ships.request.interface';
import { State } from '../../../../state';
import { PlayerWebSocket } from '../../../../interfaces/web-socket.player.interface';
import { Game } from '../../../../entities/game.entity';

export class AddShipsHandler {
  public static handle(
    webSocket: PlayerWebSocket,
    request: AddShipsRequest,
  ): Game {
    const game = State.database.getGame(request.data.gameId);

    game.addShips(webSocket.player, request.data.ships);

    return game;
  }
}
