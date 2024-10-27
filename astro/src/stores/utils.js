import { atom } from "nanostores";

export const okpKey = (item) => `okp-${item}`;

export const okpStore = (key, defaultValue = null) => {
  const initial = typeof window !== "undefined" ? (
    JSON.parse(localStorage.getItem(okpKey(key))) ?? defaultValue
  ) : defaultValue;
  const store = atom(initial);

  store.subscribe((value) => {
    if (typeof window !== "undefined") {
      if (value === null) {
        localStorage.removeItem(okpKey(key));
      } else {
        localStorage.setItem(okpKey(key), JSON.stringify(value));
      }
    }
  });

  return store;
};
