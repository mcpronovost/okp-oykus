export const getStore = (key: string, init: string | null) => {
  if (typeof window !== "undefined") {
    const value = window.localStorage.getItem(`okp-${key}`);
    console.log(`Get store ${key}:`, value); // Debug log
    if (value !== null) return value; // Changed from if (value) to if (value !== null)
  }
  setStore(key, init);
  return init;
};

export const setStore = (key: string, value: string | null) => {
  console.log(`Setting store for ${key}:`, value); // Debug log
  if (typeof window !== "undefined") {
    if (value === null) {
      window.localStorage.removeItem(`okp-${key}`);
    } else {
      window.localStorage.setItem(`okp-${key}`, value);
    }
  }
};