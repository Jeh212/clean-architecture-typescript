describe("LocalSavePurchasesTest", () => {
  class LocalSavePurchases {
    constructor(private readonly cacheStore: ICacheStore) {}

    async save(): Promise<void> {
      this.cacheStore.delete();
    }
  }

  interface ICacheStore {
    delete: () => void;
  }

  class CacheStoreSpy implements ICacheStore {
    deleteCallsCount = 0;

    delete(): void {
      this.deleteCallsCount++;
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

  test("It should delete old cache on sut.save", async () => {
    const { sut, cacheStore } = makeSut();
    await sut.save();
    expect(cacheStore.deleteCallsCount).toBe(1);
  });
  test("It should delete old cache on sut.save", async () => {
    const { cacheStore, sut } = makeSut();
    await sut.save();
    expect(cacheStore.deleteCallsCount).toBe(1);
  });
});
