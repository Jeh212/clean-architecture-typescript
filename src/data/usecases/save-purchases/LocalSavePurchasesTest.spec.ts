import { CacheStoreSpy, mockPurchases } from "@/data/tests";
import { LocalSavePurchases } from "@/data/usecases/save-purchases/LocalSavePurchases";
describe("LocalSavePurchasesTest", () => {
  type SutTypes = {
    sut: LocalSavePurchases;
    cacheStore: CacheStoreSpy;
  };

  const makeSut = (timestamp = new Date()): SutTypes => {
    const cacheStore = new CacheStoreSpy();
    const sut = new LocalSavePurchases(cacheStore, timestamp);
    return { sut, cacheStore };
  };

  test("It should not delete or insert cache on sut.init", () => {
    const timestamp = new Date();
    const { cacheStore } = makeSut();
    new LocalSavePurchases(cacheStore, timestamp);

    expect(cacheStore.messages).toEqual([]);
  });

  test("It should delete old cache on sut.save and delete with correct key", async () => {
    const { sut, cacheStore } = makeSut();
    await sut.save(mockPurchases());
    expect(cacheStore.messages).toEqual([
      CacheStoreSpy.Message.delete,
      CacheStoreSpy.Message.insert,
    ]);
    expect(cacheStore.deleteKey).toBe("purchases");
  });

  test("It should not insert new Cache if delete fails", () => {
    const { sut, cacheStore } = makeSut();
    cacheStore.simulateDeleteError();
    const promise = sut.save(mockPurchases());
    expect(cacheStore.messages).toEqual([
      CacheStoreSpy.Message.delete,
      CacheStoreSpy.Message.insert,
    ]);
    expect(promise).rejects.toThrow();
  });

  test("It should insert new Cache if delete succeeds", async () => {
    const timestamp = new Date();
    const { sut, cacheStore } = makeSut(timestamp);
    const purchases = mockPurchases();

    const promise = await sut.save(purchases);
    expect(cacheStore.messages).toEqual([
      CacheStoreSpy.Message.delete,
      CacheStoreSpy.Message.insert,
    ]);
    expect(cacheStore.insertValues).toEqual(purchases);
    expect(cacheStore.insertKey).toBe("purchase");
    expect(cacheStore.deleteKey).toBe("purchase");
    expect(cacheStore.insertValues).toEqual({
      timestamp,
      value: purchases,
    });
    await expect(promise).resolves.toBeFalsy();
  });
  test("It should throw if insert throws", async () => {
    const { sut, cacheStore } = makeSut();

    cacheStore.simulateInsertError();
    const promise = await sut.save(mockPurchases());

    expect(cacheStore.messages).toEqual([
      CacheStoreSpy.Message.delete,
      CacheStoreSpy.Message.insert,
    ]);
    await expect(promise).rejects.toThrow();
  });
});
