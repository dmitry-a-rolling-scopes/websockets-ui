import { Player } from './entities/player.entity';
import { Room } from './entities/room.entity';
import { Game } from './entities/game.entity';
import { Winner } from './entities/winner.entity';

export class Database {
  private players: Map<string, Player> = new Map<string, Player>();

  private rooms: Map<string, Room> = new Map<string, Room>();

  private games: Map<string, Game> = new Map<string, Game>();

  private winners: Map<string, Winner> = new Map<string, Winner>();

  public addRoom(room: Room): Database {
    this.rooms.set(room.id, room);

    return this;
  }

  public getRoom = (id: string): Room => {
    return this.rooms.get(id) as Room;
  };

  public getAvailableRooms = (): Room[] => {
    const rooms = Array.from(this.rooms.values());

    return rooms.filter((room: Room): boolean => !room.isFull());
  };

  public addPlayer(player: Player): Database {
    this.players.set(player.id, player);

    return this;
  }

  public getPlayer = (id: string): Player => {
    return this.players.get(id) as Player;
  };

  public addGame(game: Game): Database {
    this.games.set(game.id, game);

    return this;
  }

  public getGame = (id: string): Game => {
    return this.games.get(id) as Game;
  };

  public getWinners = (): Map<string, Winner> => this.winners;
}
