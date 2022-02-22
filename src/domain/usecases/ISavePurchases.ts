import { PurchaseModel } from "../models";

export interface ISavePurchase {
  save: (purchases: ISavePurchase.Result[]) => Promise<void>;
}

export namespace ISavePurchase {
  export type Result = PurchaseModel;
}
