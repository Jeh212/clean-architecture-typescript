import { ICacheStore } from "@/data/protocols/cache";

class LocalSavePurchases {
  constructor(private readonly cacheStore: ICacheStore) {}

  async save(): Promise<void> {
    this.cacheStore.delete("purchases");
    this.cacheStore.insert("purchase");
  }
}
export { LocalSavePurchases };
