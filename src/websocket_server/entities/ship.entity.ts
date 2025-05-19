import { Status } from '../dtos/message/message.data.attack.status.type';
import { Position } from '../dtos/message/message.data.ship.position.interface';
import { Type } from '../dtos/message/message.data.ship.type';

export class Ship {
  private readonly direction: boolean;

  private readonly length: number;

  private readonly position: Position;

  private coordinates: Position[] = [];

  private shots: number = 0;

  private status: Status = 'miss';

  private readonly type: Type;

  constructor(
    direction: boolean,
    length: number,
    position: Position,
    type: Type,
  ) {
    this.direction = direction;
    this.length = length;
    this.position = position;
    this.type = type;

    this.fillCoordinates();
  }

  public attack(x: number, y: number): Status {
    this.coordinates.forEach((coordinate: Position) => {
      if (coordinate.x === x && coordinate.y === y) {
        this.shot();

        return this.isKilled() ? 'killed' : 'shot';
      }
    });

    return 'miss';
  }

  public getDirection(): boolean {
    return this.direction;
  }

  public getLength(): number {
    return this.length;
  }

  public getPosition(): Position {
    return this.position;
  }

  public getStatus(): Status {
    return this.status;
  }

  public getType(): Type {
    return this.type;
  }

  public isKilled(): boolean {
    return this.status === 'killed';
  }

  private fillCoordinates(): Ship {
    for (let coordinate = 0; coordinate < this.length; coordinate++) {
      const position = this.direction
        ? {
            x: this.position.x,
            y: this.position.y + coordinate,
          }
        : {
            x: this.position.x + coordinate,
            y: this.position.y,
          };

      this.coordinates.push(position);
    }

    return this;
  }

  private shot(): Ship {
    this.status = 'shot';
    this.shots++;

    if (this.shots === this.length) {
      this.kill();
    }

    return this;
  }

  private kill(): Ship {
    this.status = 'killed';

    return this;
  }
}
