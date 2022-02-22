import { ISavePurchase } from "@/domain/usecases";
import { ICacheStore } from "../protocols/cache/ICacheStore";

export class CacheStoreSpy implements ICacheStore {
  messages: CacheStoreSpy.Action[] = [];
  actions: CacheStoreSpy.Action[] = [];
  fetchKey: string | undefined;
  deleteKey?: string;
  insertKey?: string;
  insertValues: ISavePurchase.Result[] = [];

  fetch(key: string): void {
    this.actions.push(CacheStoreSpy.Action.fetch);
    this.fetchKey = key;
  }

  delete(key: string): void {
    this.messages.push(CacheStoreSpy.Action.delete);
    this.deleteKey = key;
  }
  insert(key: string, value: any): void {
    this.messages.push(CacheStoreSpy.Action.insert);
    this.insertKey = key;
    this.insertValues = value;
  }

  simulateDeleteError(): void {
    jest.spyOn(CacheStoreSpy.prototype, "delete").mockImplementationOnce(() => {
      this.messages.push(CacheStoreSpy.Action.delete);
      throw new Error();
    });
  }
  simulateInsertError(): void {
    jest.spyOn(CacheStoreSpy.prototype, "insert").mockImplementationOnce(() => {
      this.messages.push(CacheStoreSpy.Action.insert);
      throw new Error();
    });
  }
}

export namespace CacheStoreSpy {
  export enum Action {
    delete,
    insert,
    fetch,
    fetchKey,
  }
}
