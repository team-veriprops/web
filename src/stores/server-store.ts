export class ServerStore {
  private readonly store: Map<string, any>;

  constructor() {
    this.store = new Map<string, any>();
  }

  setValue(key: string, value: any): void {
    this.store.set(key, value);
  }

  getValue<T = any>(key: string): T | undefined {
    return this.store.get(key) as T | undefined;
  }
}