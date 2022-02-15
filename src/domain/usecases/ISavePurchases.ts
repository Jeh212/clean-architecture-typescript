export interface ISavePurchase {
  save: (purchases: ISavePurchase.Params[]) => Promise<void>;
}

export namespace ISavePurchase {
  export type Params = {
    id: string;
    date: Date;
    value: number;
  };
}
