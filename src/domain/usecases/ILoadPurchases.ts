import { PurchaseModel } from "../models";

export interface ILoadPurchases {
  loadAll: () => Promise<ILoadPurchases.Result[]>;
}

export namespace ILoadPurchases {
  export type Result = PurchaseModel;
}
