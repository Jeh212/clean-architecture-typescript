import { ISavePurchase } from "@/domain/usecases";
import faker from "faker";

export const mockPurchases = (): ISavePurchase.Params[] => [
  {
    id: faker.random.uuid(),
    date: faker.date.recent(),
    value: faker.random.number(),
  },
  {
    id: faker.random.uuid(),
    date: faker.date.recent(),
    value: faker.random.number(),
  },
];
