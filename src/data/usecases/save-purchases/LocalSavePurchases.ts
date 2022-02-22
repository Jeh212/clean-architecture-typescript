import { ICacheStore } from "@/data/protocols/cache";
import { ISavePurchase } from "@/domain/usecases";

class LocalSavePurchases implements ISavePurchase {
  constructor(
    private readonly cacheStore: ICacheStore,
    private readonly timestamp: Date
  ) {}

  async save(purchases: ISavePurchase.Params[]): Promise<void> {
    this.cacheStore.delete("purchases");
    this.cacheStore.insert("purchase", {
      timestamp: this.timestamp,
      value: purchases,
    });
  }
}
export { LocalSavePurchases };
