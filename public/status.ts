import { jsonFetch, Reviver } from "./_utils.ts";
import { BASE_URL } from "./constants.ts";
import { isString } from "../deps.ts";

export type StatusOptions = {
  state?: "scheduled" | "ongoing" | "completed" | "canceled";
};

export type StatusResponse = {
  title: string;
  state: string;
  begin: number;
  end: number;
  href: string;
  serviceType: "0" | "1" | "2" | "3" | "4" | "5";
  system: "classic" | "unified";
  scheDesc: string;
};

const reviver: Reviver = (key, value) => {
  if (["begin", "end"].includes(key) && isString(value)) {
    return Number(value);
  }
  return value;
};
export function fetchStatus(
  options?: StatusOptions,
  init?: RequestInit,
): Promise<StatusResponse> {
  const url = new URL("system/status", BASE_URL);

  const _state = options?.state;

  if (isString(_state)) {
    url.searchParams.set("state", _state);
  }
  return jsonFetch(url, init, {
    parseJson: reviver,
  });
}
