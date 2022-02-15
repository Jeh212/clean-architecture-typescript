import { ICacheStore } from "@/data/protocols/cache";
import { LocalSavePurchases } from "@/data/usecases/save-purchases/LocalSavePurchases";
describe("LocalSavePurchasesTest", () => {
  class CacheStoreSpy implements ICacheStore {
    deleteCallsCount = 0;
    insertCallsCount = 0;

    deleteKey?: string;
    insertKey?: string;

    delete(key: string): void {
      this.deleteCallsCount++;
      this.deleteKey = key;
    }
    insert(key: string): void {
      this.insertCallsCount++;
      this.insertKey = key;
    }
  }

  type SutTypes = {
    sut: LocalSavePurchases;
    cacheStore: CacheStoreSpy;
  };

  const makeSut = (): SutTypes => {
    const cacheStore = new CacheStoreSpy();
    const sut = new LocalSavePurchases(cacheStore);
    return { sut, cacheStore };
  };

  test("It should not delete cache on sut.init", () => {
    const { cacheStore } = makeSut();
    new LocalSavePurchases(cacheStore);

    expect(cacheStore.deleteCallsCount).toBe(0);
  });

  test("It should delete old cache on sut.save and delete with correct key", async () => {
    const { sut, cacheStore } = makeSut();
    await sut.save();
    expect(cacheStore.deleteCallsCount).toBe(1);
    expect(cacheStore.deleteKey).toBe("purchases");
  });

  test("It should not insert new Cache if delete fails", () => {
    const { sut, cacheStore } = makeSut();
    jest.spyOn(cacheStore, "delete").mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = sut.save();
    expect(cacheStore.insertCallsCount).toBe(0);
    expect(promise).rejects.toThrow();
  });

  test("It should insert new Cache if delete succeeds", async () => {
    const { sut, cacheStore } = makeSut();

    await sut.save();
    expect(cacheStore.insertCallsCount).toBe(1);
    expect(cacheStore.deleteCallsCount).toBe(1);
    expect(cacheStore.insertKey).toBe("purchase");
  });
});