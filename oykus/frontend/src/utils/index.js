export const getInitData = () => {
  try {
    const initData = document.getElementById("okp-init").textContent;
    return JSON.parse(initData);
  } catch {
    return {};
  }
};
