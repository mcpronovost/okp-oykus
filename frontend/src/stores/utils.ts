import { atom } from "nanostores";

export const okpKey = (item: string) => `okp-${item}`;

const DB_NAME = "okpDatabase";
const STORE_NAME = "okpStore";
const DB_VERSION = 1;

// Initialize the database
const initDB = (): Promise<IDBDatabase | null> => {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return resolve(null);
    
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
  });
};

// Helper functions for IndexedDB operations
export const getValue = async (key: string) => {
  const db = await initDB();
  if (!db) return null;
  
  return new Promise((resolve) => {
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(okpKey(key));
    
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => resolve(null);
  });
};

const setValue = async (key: string, value: any) => {
  const db = await initDB();
  if (!db) return;
  
  const transaction = db.transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);
  
  if (value === null) {
    store.delete(okpKey(key));
  } else {
    store.put(value, okpKey(key));
  }
};

export const okpStore = <T>(key: string, defaultValue: T = null as T) => {
  const store = atom<T>(defaultValue);
  
  // Initialize store with value from IndexedDB
  if (typeof window !== "undefined") {
    getValue(key).then(value => {
      store.set((value === null || value === undefined) ? defaultValue : value as T);
    });
  }

  // Subscribe to changes and update IndexedDB
  store.subscribe((value) => {
    if (typeof window !== "undefined") {
      setValue(key, value);
    }
  });

  return store;
};