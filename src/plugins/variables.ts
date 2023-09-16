import { openDB, IDBPDatabase } from "idb";

export function dbjdr(): Promise<IDBPDatabase<unknown>> {
  const db = openDB("jdr", 1, {
    async upgrade(db: any) {
      if (!db.objectStoreNames.contains("co")) {
        db.createObjectStore("co", { keyPath: "id" }).createIndex("id", "id");
      }
    },
  });
  return db;
}
