export const API_URL = "http://localhost:8000/api/v1";

export const API_HEADERS = {
  "Content-Type": "application/json",
  "Accept": "application/json",
};

export const okpEncode = (data) => {
  return JSON.stringify(data);
};

export const okpDecode = (encoded) => {
  return JSON.parse(encoded);
};

