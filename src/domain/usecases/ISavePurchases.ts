interface ISavePurchase {
  save: (purchases: ISavePurchase.Params[]) => Promise<void>;
}

namespace ISavePurchase {
  export type Params = {
    id: string;
    date: string;
    value: number;
  };
}

export { ISavePurchase };
