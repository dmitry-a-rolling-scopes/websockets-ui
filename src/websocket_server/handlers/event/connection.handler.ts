import { RawData, WebSocket } from 'ws';
import { IncomingMessage } from 'node:http';
import { ConsoleLogger } from '../../utils/console.logger';
import { MessageHandler } from './connection/message.handler';

export class ConnectionHandler {
  public static handle = (
    webSocket: WebSocket,
    request: IncomingMessage,
    webSocketClients: Set<WebSocket>,
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
