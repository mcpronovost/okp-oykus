import { atom } from "nanostores";

export const okpKey = (item) => `okp-${item}`;

const DB_NAME = 'okpDatabase';
const STORE_NAME = 'okpStore';
const DB_VERSION = 1;

// Initialize the database
const initDB = () => {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return resolve(null);
    
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
  });
};

// Helper functions for IndexedDB operations
const getValue = async (key) => {
  const db = await initDB();
  if (!db) return null;
  
  return new Promise((resolve) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(okpKey(key));
    
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => resolve(null);
  });
};

const setValue = async (key, value) => {
  const db = await initDB();
  if (!db) return;
  
  const transaction = db.transaction(STORE_NAME, 'readwrite');
  const store = transaction.objectStore(STORE_NAME);
  
  if (value === null) {
    store.delete(okpKey(key));
  } else {
    store.put(value, okpKey(key));
  }
};

export const okpStore = (key, defaultValue = null) => {
  const store = atom(defaultValue);
  
  // Initialize store with value from IndexedDB
  if (typeof window !== "undefined") {
    getValue(key).then(value => {
      store.set(value ?? defaultValue);
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