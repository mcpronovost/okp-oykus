
export const setStoreItem = (key, value) => {
    localStorage.setItem(`okp-oykus-${key}`, JSON.stringify(value));
};

export const getStoreItem = (key) => {
    const storedItem = localStorage.getItem(`okp-oykus-${key}`);
    return storedItem ? JSON.parse(storedItem) : null;
};
