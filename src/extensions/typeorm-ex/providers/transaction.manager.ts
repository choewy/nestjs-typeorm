import { DataSource, EntityManager } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { TransactionTarget } from '../abstracts';
import { OnTransactionResult } from '../decorators';

@Injectable()
export class TransactionManager {
  constructor(private readonly dataSource: DataSource, private readonly eventEmitter: EventEmitter2) {}

  private async emit(em: EntityManager, target: TransactionTarget) {
    const results = (await this.eventEmitter.emitAsync(target.name, em, ...(target.args ?? []))) as OnTransactionResult[];

    for (const result of results) {
      if (result.error) {
        throw result;
      }
    }

    return results;
  }

  async run(...targets: TransactionTarget[]) {
    return this.dataSource.transaction(async (em) => {
      const returnValue: Record<string, OnTransactionResult[]> = {};

      for (let i = 0; i < targets.length; i++) {
        const target = targets[i];
        const results = await this.emit(em, target);

        const nextTarget = targets[i + 1];

        if (nextTarget && nextTarget.replaceArgs) {
          nextTarget.args = results.map((result) => result.value);
        }

        returnValue[target.name] = [];

        for (const result of results) {
          returnValue[target.name].push(result);
        }
      }

      return returnValue;
    });
  }
}
