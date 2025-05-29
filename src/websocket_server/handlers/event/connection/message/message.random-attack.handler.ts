import { RandomAttackRequest } from '../../../../dtos/message/request/message.random-attack.request.interface';

export class RandomAttackHandler {
  public static handle(request: RandomAttackRequest): void {
    console.log(request);
  }
}
