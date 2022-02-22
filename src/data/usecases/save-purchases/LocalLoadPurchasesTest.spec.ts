import { CacheStoreSpy } from "@/data/tests";
import { LocalLoadPurchases } from "@/data/usecases/save-purchases/LocalLoadPurchases";

const makeSut = (timestamp = new Date()): SutTypes => {
  const cacheStore = new CacheStoreSpy();
  const sut = new LocalLoadPurchases(cacheStore, timestamp);
  return { sut, cacheStore };
};
type SutTypes = {
  sut: LocalLoadPurchases;
  cacheStore: CacheStoreSpy;
};
describe("LocalLoadPurchasesTest", () => {
  test("It should not delete or insert Cache on sut.init", () => {
    const { cacheStore } = makeSut();

    expect(cacheStore.actions).toEqual([]);
  });

  test("It should call correct key on load", async () => {
    const { cacheStore, sut } = makeSut();
    await sut.loadAll();
    expect(cacheStore.actions).toEqual([CacheStoreSpy.Action.fetch]);
    expect(cacheStore.fetchKey).toBe("purchase");
  });
});
