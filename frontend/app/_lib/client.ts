"use client";

export const getAgent = () => {
  if (typeof navigator != "undefined") {
    return navigator.userAgent;
  }
  return undefined;
};

export const getAgent64 = () => {
  if (typeof navigator != "undefined") {
    return Buffer.from(navigator.userAgent, "ascii").toString("base64");
  }
  return undefined;
};

export const getCookie = (cname) => {
  if (typeof document != "undefined") {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
  }
  return undefined;
};
