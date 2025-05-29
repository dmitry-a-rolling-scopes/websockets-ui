import { RawData } from 'ws';
import { MessageType } from '../../../enums/message.type.enum';
import { RegHandler } from './message/message.reg.handler';
import { CreateRoomHandler } from './message/message.create-room.handler';
import { AddUserToRoomHandler } from './message/message.add-user-to-room.handler';
import { AddShipsHandler } from './message/message.add-ships.handler';
import { AttackHandler } from './message/message.attack.handler';
import { RandomAttackHandler } from './message/message.random-attack.handler';
import { AddShipsRequest } from '../../../dtos/message/request/message.add-ships.request.interface';
import { AddUserToRoomRequest } from '../../../dtos/message/request/message.add-user-to-room.request.interface';
import { AttackRequest } from '../../../dtos/message/request/message.attack.request.interface';
import { RandomAttackRequest } from '../../../dtos/message/request/message.random-attack.request.interface';
import { RegRequest } from '../../../dtos/message/request/message.reg.request.interface';
import { ResponseHandler } from './message/message.response.handler';
import { UpdateRoomHandler } from './message/message.update-room.handler';
import { UpdateWinnersHandler } from './message/message.update-winners.handler';
import { State } from '../../../state';
import { CreateGameHandler } from './message/message.create-game.handler';
import { MessageDeserializer } from '../../../utils/message.deserializer';
import { StartGameHandler } from './message/message.start-game.handler';
import { Game } from '../../../entities/game.entity';
import { Player } from '../../../entities/player.entity';
import { TurnHandler } from './message/message.turn.handler';
import { FinishHandler } from './message/message.finish.handler';
import { PlayerWebSocket } from '../../../interfaces/web-socket.player.interface';

export class MessageHandler {
  public static handle = (
    webSocket: PlayerWebSocket,
    message: RawData,
  ): void => {
    try {
      const request = MessageDeserializer.deserialize(message);

      console.log({ request: request });

      switch (request.type) {
        case MessageType.REG:
          const registrationRequest = request as RegRequest;
          const registrationResponse = RegHandler.handle(
            webSocket,
            registrationRequest,
          );

          if (registrationResponse.data.error) {
            ResponseHandler.handle(webSocket, registrationResponse);
            break;
          }

          const registeredPlayer = State.database.getPlayer(
            registrationResponse.data.index,
          );

          ResponseHandler.handle(
            registeredPlayer.getWebSocket(),
            registrationResponse,
            UpdateRoomHandler.handle(),
            UpdateWinnersHandler.handle(),
          );

          break;
        case MessageType.CREATE_ROOM:
          CreateRoomHandler.handle(webSocket);
          ResponseHandler.handle(webSocket, UpdateRoomHandler.handle());

          break;
        case MessageType.ADD_USER_TO_ROOM:
          const addUserToRoomRequest = request as AddUserToRoomRequest;
          const targetRoom = AddUserToRoomHandler.handle(
            webSocket,
            addUserToRoomRequest,
          );

          const targetGame = new Game(targetRoom);
          State.database.addGame(targetGame);

          targetRoom.getPlayers().forEach((player: Player): void => {
            ResponseHandler.handle(
              player.getWebSocket(),
              CreateGameHandler.handle(targetGame, player),
              UpdateRoomHandler.handle(),
              UpdateWinnersHandler.handle(),
            );
          });

          break;
        case MessageType.ADD_SHIPS:
          const addShipsRequest = request as AddShipsRequest;
          const gameToAddShips = AddShipsHandler.handle(
            webSocket,
            addShipsRequest,
          );

          if (gameToAddShips.isReady()) {
            gameToAddShips
              .getRoom()
              .getPlayers()
              .forEach((player: Player): void => {
                ResponseHandler.handle(
                  player.getWebSocket(),
                  StartGameHandler.handle(gameToAddShips, player),
                  TurnHandler.handle(webSocket.player),
                );
              });
          }

          break;
        case MessageType.ATTACK:
          const attackRequest = request as AttackRequest;
          const game = State.database.getGame(attackRequest.data.gameId);
          const currentRoom = game.getRoom();
          const currentPlayerId = attackRequest.data.indexPlayer;
          const currentPlayer = State.database.getPlayer(currentPlayerId);
          const nextPlayer = currentRoom.getNextPlayer(currentPlayer);

          const attackStatus = game.attack(
            nextPlayer,
            attackRequest.data.x,
            attackRequest.data.y,
          );

          currentRoom
            .getWebSockets()
            .forEach((webSocket: PlayerWebSocket): void => {
              ResponseHandler.handle(
                webSocket,
                AttackHandler.handle(attackRequest, attackStatus),
              );

              if (game.isFinished(currentPlayer)) {
                ResponseHandler.handle(
                  webSocket,
                  FinishHandler.handle(currentPlayer),
                  UpdateWinnersHandler.handle(),
                );
              } else {
                const turnResponse = TurnHandler.handle(
                  attackStatus === 'miss' ? nextPlayer : currentPlayer,
                );

                ResponseHandler.handle(webSocket, turnResponse);
              }
            });

          break;
        case MessageType.RANDOM_ATTACK:
          RandomAttackHandler.handle(request as RandomAttackRequest);

          break;
      }
    } catch (error) {
      console.error(error);
    }
  };
}
