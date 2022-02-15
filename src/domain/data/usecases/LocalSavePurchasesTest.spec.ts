describe("LocalSavePurchasesTest", () => {
  class LocalSavePurchases {
    constructor(private readonly cacheStore: ICacheStore) {}
  }
  interface ICacheStore {}

  class CacheStoreSpy implements ICacheStore {
    deleteCallsCount = 0;
  }

  test("It should not delete cache on sut.init", () => {
    const cacheStore = new CacheStoreSpy();
    new LocalSavePurchases(cacheStore);

    expect(cacheStore.deleteCallsCount).toBe(0);
  });
});
