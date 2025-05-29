import { RawData } from 'ws';
import { IncomingMessage } from 'node:http';
import { ConsoleLogger } from '../../utils/console.logger';
import { MessageHandler } from './connection/message.handler';
import { PlayerWebSocket } from '../../interfaces/web-socket.player.interface';

export class ConnectionHandler {
  public static handle = (
    webSocket: PlayerWebSocket,
    request: IncomingMessage,
    webSocketClients: Set<PlayerWebSocket>,
  ): void => {
    webSocketClients.add(webSocket);

    const ip = request.socket.remoteAddress;
    ConsoleLogger.logSuccess(`Client "${ip}" connected`);

    webSocket.send(JSON.stringify('handshake'));

    webSocket.on('message', (message: RawData): void =>
      MessageHandler.handle(webSocket, message),
    );

    webSocket.on('close', (): void => {
      webSocketClients.delete(webSocket);

      ConsoleLogger.logWarning('Client disconnected');
    });
  };
}
