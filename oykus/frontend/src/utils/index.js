export const getInitData = () => {
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

export const okpUnit = (num, digits = 2) => {
  const l = [
    { v: 1, u: "" },
    { v: 1e3, u: "k" },
    { v: 1e6, u: "M" },
    { v: 1e9, u: "G" },
    { v: 1e12, u: "T" },
    { v: 1e15, u: "P" },
    { v: 1e18, u: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var i = l
    .slice()
    .reverse()
    .find(function (i) {
      return num >= i.v;
    });
  return i ? (num / i.v).toFixed(digits).replace(rx, "$1") + i.u : "0";
};

export const okpCode = (text) => {
  let r = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/\n/g, "<br />")
    .replace(/\[g\]/g, '<span style="font-weight:bold;">')
    .replace(/\[\/g\]/g, "</span>")
    .replace(/\[i\]/g, '<span style="font-style:italic;">')
    .replace(/\[\/i\]/g, "</span>")
    .replace(/\[s\]/g, '<span style="text-decoration:underline;">')
    .replace(/\[\/s\]/g, "</span>")
    .replace(/\[b\]/g, '<span style="text-decoration:line-through;">')
    .replace(/\[\/b\]/g, "</span>")
    .replace(/\[ag\]/g, '<div style="text-align:left;">')
    .replace(/\[\/ag\]/g, "</div>")
    .replace(/\[ac\]/g, '<div style="text-align:center;">')
    .replace(/\[\/ac\]/g, "</div>")
    .replace(/\[ad\]/g, '<div style="text-align:right;">')
    .replace(/\[\/ad\]/g, "</div>")
    .replace(
      /\[c=#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})\]/g,
      '<span style="color:#$1;">'
    )
    .replace(/\[c=([a-zA-Z0-9_]+)\]/g, '<span style="color:var(--c-$1);">')
    .replace(/\[\/c\]/g, "</span>")
    .replace(/\[url=([^<>[\]]+)\]/g, '<a href="$1">')
    .replace(/\[\/url\]/g, "</a>")
    .replace(/\[urlo=([^<>[\]]+)\]/g, '<a href="$1" target="_blank">')
    .replace(/\[\/urlo\]/g, "</a>")
    .replace(/\[img=([^<>[\]]+)\]/g, '<img src="$1" alt="" />')
    .replace(/\[ico=([a-z- ]+)\]/g, '<i class="mdi $1"></i>');
  return r;
};
