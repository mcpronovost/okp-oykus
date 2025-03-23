export const loadInitData = () => {
  try {
    const initDataElement = document.getElementById("okp-init");
    if (!initDataElement) return null;
    const initData = initDataElement.textContent;
    initDataElement.remove();
    return JSON.parse(initData);
  } catch {
    return null;
  }
};

export const loadInitTheme = () => {
  try {
    const initThemeElement = document.getElementById("okp-theme");
    if (!initThemeElement) return null;
    const initTheme = initThemeElement.textContent;
    initThemeElement.remove();
    return JSON.parse(initTheme);
  } catch {
    return null;
  }
};
