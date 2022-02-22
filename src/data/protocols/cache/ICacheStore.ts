interface ICacheStore {
  delete: (deleteKey: string) => void;
  insert: (insertKey: string, value: any) => void;
  fetch: (key: string) => void;
}

export { ICacheStore };
