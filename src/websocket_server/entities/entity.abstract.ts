import { randomUUID } from 'node:crypto';

export abstract class AbstractEntity {
  public id: string = randomUUID();
}
