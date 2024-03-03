import { v4 } from 'uuid';

export class TransactionTarget {
  id: string;
  args: any[];
  replaceArgs: boolean;

  constructor(
    readonly name: string,
    opt?: {
      id?: string;
      args?: any[];
      replaceArgs?: boolean;
    },
  ) {
    this.id = opt?.id ?? v4();
    this.args = opt?.args ?? [];
    this.replaceArgs = opt?.replaceArgs ?? false;
  }
}
