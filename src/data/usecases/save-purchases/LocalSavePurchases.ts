import { ICacheStore } from "@/data/protocols/cache";
import { ISavePurchase } from "@/domain";

class LocalSavePurchases implements ISavePurchase {
  constructor(private readonly cacheStore: ICacheStore) {}

  async save(purchases: ISavePurchase.Params[]): Promise<void> {
    this.cacheStore.delete("purchases");
    this.cacheStore.insert("purchase", purchases);
  }
}
export { LocalSavePurchases };
