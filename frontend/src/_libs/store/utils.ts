export const getStore = (key: string, init: string | null) => {
  if (typeof window !== "undefined") {
    const value = window.localStorage.getItem(`okp-${key}`);
    if (value) return value;
  }
  setStore(key, init);
  return init;
};

export const setStore = (key: string, value: string | null) => {
  if (typeof window !== "undefined" && value) window.localStorage.setItem(`okp-${key}`, value);
};