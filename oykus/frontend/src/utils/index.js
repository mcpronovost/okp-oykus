export const getInitData = () => {
  try {
    const initData = document.getElementById("okp-init").textContent;
    return JSON.parse(initData);
  } catch {
    return {};
  }
};

export const getUnit = (num, digits = 2) => {
    const l = [
        { v: 1, u: "" },
        { v: 1e3, u: "k" },
        { v: 1e6, u: "M" },
        { v: 1e9, u: "G" },
        { v: 1e12, u: "T" },
        { v: 1e15, u: "P" },
        { v: 1e18, u: "E" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i = l.slice().reverse().find(function (i) {
        return num >= i.v;
    });
    return i ? (num / i.v).toFixed(digits).replace(rx, "$1") + i.u : "0";
}
