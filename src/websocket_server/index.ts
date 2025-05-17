import http, { IncomingMessage } from 'node:http';
import { WebSocket, WebSocketServer } from 'ws';
import { Signal } from './enums/signal.enum';
import { SignalHandler } from './handlers/process/signal.handler';
import { ConsoleLogger } from './utils/console.logger';
import { ConnectionHandler } from './handlers/event/connection.handler';

const port = 3000;
const httpServer = http.createServer();
const webSocketServer = new WebSocketServer({ server: httpServer });
const webSocketClients = new Set<WebSocket>();

webSocketServer.on(
  'connection',
  (webSocket: WebSocket, request: IncomingMessage): void =>
    ConnectionHandler.handle(webSocket, request, webSocketClients),
);

httpServer.listen(port, (): void => {
  ConsoleLogger.logSuccess(
    `WebSocket server is running on ws://localhost:${port}`,
  );
});

process.on(Signal.SIGINT, (): void =>
  SignalHandler.handle(httpServer, webSocketServer, webSocketClients),
);

process.on(Signal.SIGTERM, (): void =>
  SignalHandler.handle(httpServer, webSocketServer, webSocketClients),
);
