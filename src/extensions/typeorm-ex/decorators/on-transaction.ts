import { EntityManager } from 'typeorm';

import { applyDecorators } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

export type OnTransactionResult<T = any> = {
  handler: string;
  value: T | null;
  error: Error | null;
};

export const OnTransaction = (name: string) =>
  applyDecorators(OnEvent(name), (_target: any, _key: string, descriptor: PropertyDescriptor) => {
    const handler = descriptor.value;
    const metadataKeys = Reflect.getOwnMetadataKeys(descriptor.value);
    const metadataValues = metadataKeys.map((key) => {
      return [key, Reflect.getMetadata(key, descriptor.value)];
    });

    descriptor.value = async function (em: EntityManager, ...args: any[]): Promise<OnTransactionResult> {
      try {
        const value = await handler.bind(em.getRepository(this.target))(...args);

        return { handler: handler.name, value, error: null };
      } catch (e) {
        return { handler: handler.name, value: null, error: e };
      }
    };

    metadataValues.forEach(([key, value]) => Reflect.defineMetadata(key, value, descriptor.value));
  });
