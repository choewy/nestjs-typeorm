import { DataSource, EntityManager } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { TransactionTarget } from '../abstracts';

@Injectable()
export class TransactionManager {
  constructor(private readonly dataSource: DataSource, private readonly eventEmitter: EventEmitter2) {}

  private async emit(em: EntityManager, target: TransactionTarget) {
    const results = await this.eventEmitter.emitAsync(target.name, em, ...(target.args ?? []));

    for (const result of results) {
      if (result instanceof Error) {
        throw result;
      }
    }

    return results;
  }

  async run(...targets: TransactionTarget[]) {
    return this.dataSource.transaction(async (em) => {
      const returnValue: Record<string, any[]> = {};

      for (let i = 0; i < targets.length; i++) {
        const target = targets[i];
        const results = await this.emit(em, target);

        const nextTarget = targets[i + 1];

        if (nextTarget && nextTarget.replaceArgs) {
          nextTarget.args = [...results];
        }

        returnValue[target.name] = results;
      }

      return returnValue;
    });
  }
}
