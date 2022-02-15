import { ICacheStore } from "@/data/protocols/cache";
import { LocalSavePurchases } from "@/data/usecases/save-purchases/LocalSavePurchases";
describe("LocalSavePurchasesTest", () => {
  class CacheStoreSpy implements ICacheStore {
    deleteCallsCount = 0;
    key?: string;

    delete(key: string): void {
      this.deleteCallsCount++;
      this.key = key;
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
    expect(cacheStore.key).toBe("purchases");
    expect(cacheStore.deleteCallsCount).toBe(1);
  });
});
