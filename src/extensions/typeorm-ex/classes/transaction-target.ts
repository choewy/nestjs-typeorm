import { v4 } from 'uuid';

export class TransactionTarget {
  args: any[];
  id: string = v4();
  replaceArgs = false;

  constructor(readonly name: string, ...args: any[]) {
    this.args = args ?? [];
  }

  setId(id: string) {
    this.id = id;

    return this;
  }

  setReplaceArgs() {
    this.replaceArgs = true;

    return this;
  }
}
