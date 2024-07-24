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

export function getCookie (cname) {
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

export const setCookie = (cname, cvalue, exdays) => {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;SameSite=Lax";
};
