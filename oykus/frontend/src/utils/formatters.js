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

export const okpDate = (
  value,
  show = "full",
  lang = "fr",
  tz = "America/Toronto"
) => {
  if (lang === "en") lang = "en-CA";
  let d = !!value ? new Date(value) : new Date(new Date().toString());
  let o = {
    timeZone: tz,
    hour12: false,
    year: ["full", "date"].includes(show) ? "numeric" : undefined,
    month: ["full", "date"].includes(show) ? "long" : undefined,
    day: ["full", "date"].includes(show) ? "numeric" : undefined,
    hour: ["full", "time"].includes(show) ? "2-digit" : undefined,
    minute: ["full", "time"].includes(show) ? "2-digit" : undefined,
  };
  return d.toLocaleString(lang, o);
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

// Helper functions to manipulate colors
const hexToRGB = (hex) => {
  if (!hex) return null;
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.substr(0, 2), 16),
    g: parseInt(h.substr(2, 2), 16),
    b: parseInt(h.substr(4, 2), 16)
  };
};

const isLightColor = (colour) => {
  if (!colour) return true;
  const rgb = hexToRGB(colour);
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  return luminance > 0.5;
};

const adjustColor = (colour, percent) => {
  if (!colour) return null;
  const rgb = hexToRGB(colour);
  const adjust = (value) => {
    const adjusted = Math.floor(value * (1 + percent));
    return Math.min(255, Math.max(0, adjusted));
  };
  
  const r = adjust(rgb.r).toString(16).padStart(2, "0");
  const g = adjust(rgb.g).toString(16).padStart(2, "0");
  const b = adjust(rgb.b).toString(16).padStart(2, "0");
  return `#${r}${g}${b}`;
};

export const okpContrast = (colour) => {
  return isLightColor(colour) ? adjustColor(colour, -1) : adjustColor(colour, 1);
};
