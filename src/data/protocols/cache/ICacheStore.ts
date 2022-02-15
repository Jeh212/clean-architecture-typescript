interface ICacheStore {
  delete: (deleteKey: string) => void;
  insert: (insertKey: string) => void;
}

export { ICacheStore };
