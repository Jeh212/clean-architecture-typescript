interface ICacheStore {
  delete: (deleteKey: string) => void;
  insert: (insertKey: string, value: any) => void;
}

export { ICacheStore };
