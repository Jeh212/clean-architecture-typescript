import { ICacheStore } from "@/data/protocols/cache";
import { LocalSavePurchases } from "@/data/usecases/save-purchases/LocalSavePurchases";
import { ISavePurchase } from "@/domain";
describe("LocalSavePurchasesTest", () => {
  class CacheStoreSpy implements ICacheStore {
    deleteCallsCount = 0;
    insertCallsCount = 0;

    deleteKey?: string;
    insertKey?: string;

    insertValues: ISavePurchase.Params[] = [];

    delete(key: string): void {
      this.deleteCallsCount++;
      this.deleteKey = key;
    }
    insert(key: string, value: any): void {
      this.insertCallsCount++;
      this.insertKey = key;
      this.insertValues = value;
    }

    simulateDeleteError(): void {
      jest
        .spyOn(CacheStoreSpy.prototype, "delete")
        .mockImplementationOnce(() => {
          throw new Error();
        });
    }
    simulateInsertError(): void {
      jest
        .spyOn(CacheStoreSpy.prototype, "insert")
        .mockImplementationOnce(() => {
          throw new Error();
        });
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

  const mockPurchases = (): ISavePurchase.Params[] => [
    {
      id: "1",
      date: new Date(),
      value: 50,
    },
    {
      id: "2",
      date: new Date(),
      value: 70,
    },
  ];

  test("It should not delete cache on sut.init", () => {
    const { cacheStore } = makeSut();
    new LocalSavePurchases(cacheStore);

    expect(cacheStore.deleteCallsCount).toBe(0);
  });

  test("It should delete old cache on sut.save and delete with correct key", async () => {
    const { sut, cacheStore } = makeSut();
    await sut.save(mockPurchases());
    expect(cacheStore.deleteCallsCount).toBe(1);
    expect(cacheStore.deleteKey).toBe("purchases");
  });

  test("It should not insert new Cache if delete fails", () => {
    const { sut, cacheStore } = makeSut();
    cacheStore.simulateDeleteError();
    const promise = sut.save(mockPurchases());
    expect(cacheStore.insertCallsCount).toBe(0);
    expect(promise).rejects.toThrow();
  });

  test("It should insert new Cache if delete succeeds", async () => {
    const { sut, cacheStore } = makeSut();
    const purchases = mockPurchases();

    await sut.save(purchases);
    expect(cacheStore.insertCallsCount).toBe(1);
    expect(cacheStore.deleteCallsCount).toBe(1);
    expect(cacheStore.insertKey).toBe("purchase");
    expect(cacheStore.insertValues).toEqual(purchases);
  });
  test("It should throw if insert throws", () => {
    const { sut, cacheStore } = makeSut();
    const purchases = mockPurchases();

    cacheStore.simulateInsertError();

    const promise = sut.save(purchases);

    expect(cacheStore.insertValues).rejects.toThrow(promise);
  });
});
