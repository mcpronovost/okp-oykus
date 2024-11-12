export const getStore = (key: string, init: string | null) => {
  const value = window.localStorage.getItem(`okp-${key}`);
  if (value !== null) return value;
  setStore(key, init);
  return init;
};

export const setStore = (key: string, value: string | null) => {
  if (value === null) {
    window.localStorage.removeItem(`okp-${key}`);
  } else {
    try {
      window.localStorage.setItem(`okp-${key}`, value);
    } catch (e) {
      if (e instanceof Error && e.name === "QuotaExceededError") {
        console.error("LocalStorage quota exceeded!");
        // TODO: Implement fallback logic here
      } else {
        console.error(`Error setting store for ${key}:`, e);
      }
    }
  }
};