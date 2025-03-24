export const okpEncode = (data) => {
  return JSON.stringify(data);
};

export const okpDecode = (encoded) => {
  return JSON.parse(encoded);
};
