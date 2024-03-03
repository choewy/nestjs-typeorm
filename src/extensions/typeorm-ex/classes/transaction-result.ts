import { v4 } from 'uuid';

export class TransactionResult<T = any> {
  constructor(readonly handler: string, readonly id: string = v4(), readonly value: T = null, readonly error: Error = null) {}
}
