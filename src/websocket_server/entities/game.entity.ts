import { AbstractEntity } from './entity.abstract';
import { Player } from './player.entity';
import { Ship as ShipInterface } from '../dtos/message/message.data.ship.interface';
import { Status } from '../dtos/message/message.data.attack.status.type';
import { Room } from './room.entity';
import { Ship } from './ship.entity';

export class Game extends AbstractEntity {
  private readonly room: Room;

  private ships: Map<Player, Ship[]> = new Map<Player, Ship[]>();

  constructor(room: Room) {
    super();

    this.room = room;
  }

  public getRoom = (): Room => this.room;

  public addShips = (player: Player, ships: ShipInterface[]): Game => {
    const shipsCollection = ships.map(
      (ship: ShipInterface): Ship =>
        new Ship(ship.direction, ship.length, ship.position, ship.type),
    );

    this.ships.set(player, shipsCollection);

    return this;
  };

  public getShips = (player: Player): Ship[] => {
    return this.ships.get(player) as Ship[];
  };

  public attack(player: Player, x: number, y: number): Status {
    for (const ship of this.getShips(player)) {
      const status = ship.attack(x, y);

      if (['shot', 'killed'].includes(status)) {
        return status;
      }
    }

    return 'miss';
  }

  public isReady(): boolean {
    return this.ships.size === 2;
  }

  public isFinished(player: Player): boolean {
    for (const ship of this.getShips(player)) {
      if (!ship.isKilled()) {
        return false;
      }
    }

    return true;
  }
}
