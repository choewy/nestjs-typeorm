import { EntityManager } from 'typeorm';

import { applyDecorators } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { TransactionResult } from '../classes';

export const OnTransaction = (name: string) =>
  applyDecorators(OnEvent(name), (_target: any, _key: string, descriptor: PropertyDescriptor) => {
    const handler = descriptor.value;
    const metadataKeys = Reflect.getOwnMetadataKeys(descriptor.value);
    const metadataValues = metadataKeys.map((key) => {
      return [key, Reflect.getMetadata(key, descriptor.value)];
    });

    descriptor.value = async function (em: EntityManager, id?: string, ...args: any[]): Promise<TransactionResult> {
      try {
        const value = await handler.bind(em.getRepository(this.target))(...args);

        return new TransactionResult(handler.name, id, value);
      } catch (e) {
        return new TransactionResult(handler.name, id, null, e);
      }
    };

    metadataValues.forEach(([key, value]) => Reflect.defineMetadata(key, value, descriptor.value));
  });
