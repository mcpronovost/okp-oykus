"use server";

import { cookies, headers } from "next/headers";
import { Buffer } from "buffer";

export const getRat = async () => {
  const drat64: string | undefined = await cookies().get("okp-drat")?.value;
  const frat64: string | undefined = await cookies().get("okp-frat")?.value;
  if (drat64 && frat64) {
    const dratascii: string = Buffer.from(drat64, "base64").toString("ascii");
    const fratascii: string = Buffer.from(frat64, "base64").toString("ascii");
    return `${dratascii.slice(3, -5)}${fratascii.slice(5, -3)}`;
  }
};

export const setRat = async (rat, agent) => {
  const drat = `okp${rat.slice(0, 11)}oykus`;
  const frat = `oykus${rat.slice(11)}okp`;
  const drat64 = Buffer.from(drat, "ascii").toString("base64");
  const frat64 = Buffer.from(frat, "ascii").toString("base64");
  const agent64 = Buffer.from(agent, "ascii").toString("base64");
  const expireDate = Date.now() + 30 * 86400 * 1000;
  await cookies().set("okp-drat", drat64, {
    expires: expireDate,
  });
  await cookies().set("okp-frat", frat64, {
    expires: expireDate,
  });
  await cookies().set("okp-arat", agent64, {
    expires: expireDate,
  });
};

export const getAgent = async () => {
  const agent: string | undefined = await cookies().get("okp-arat")?.value;
  if (agent) {
    return agent;
  }
};

export const delAuth = async () => {
  await cookies().delete("okp-drat");
  await cookies().delete("okp-frat");
  await cookies().delete("okp-arat");
};

export const api = async (path) => {
  const protocol = await headers().get("x-forwarded-proto");
  return `${protocol}://backend:8000/api${path}`;
};

export const apiHeaders = async () => {
  const result = {};
  // ===---
  try {
    const rat = await getRat();
    const agent = await getAgent();
    if (rat) {
      result["headers"] = {
        Authorization: `Rat ${rat}`,
        Agent: `Rat ${agent}`,
      };
    }
  } catch (e) {
    console.error(e);
  }
  // ===---
  return result;
};
