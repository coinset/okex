import { jsonFetch, Reviver, SuccessResponse } from "./_utils.ts";
import { BASE_URL } from "./constants.ts";
import { isString } from "../deps.ts";
import type { InstType } from "./types.ts";

export type TickersOptions = (
  | {
    instType: Exclude<InstType, "OPTION">;
    uly?: string;
  }
  | {
    instType: Extract<InstType, "OPTION">;
    uly: string;
  }
);

export type TickersResponse = SuccessResponse<{
  instType: InstType;
  instId: string;
  last: number;
  lastSz: number;
  askPx: number;
  askSz: number;
  bidPx: number;
  bidSz: number;
  open24h: number;
  high24h: number;
  low24h: number;
  volCcy24h: number;
  vol24h: number;
  sodUtc0: number;
  sodUtc8: number;
  ts: number;
}[]>;

const reviver: Reviver = (key, value) => {
  if (
    [
      "last",
      "lastSz",
      "askPx",
      "askSz",
      "bidPx",
      "bidSz",
      "open24h",
      "high24h",
      "low24h",
      "volCcy24h",
      "vol24h",
      "sodUtc0",
      "sodUtc8",
      "ts",
    ]
      .includes(
        key,
      ) &&
    isString(value)
  ) {
    return Number(value);
  }
  return value;
};

/**
 * @see https://www.okex.com/docs-v5/en/?c++#rest-api-market-data-get-tickers
 */
export function fetchTickers(
  { instType, uly }: TickersOptions,
  init?: RequestInit,
): Promise<TickersResponse> {
  const url = new URL("market/tickers", BASE_URL);

  url.searchParams.set("instType", instType);

  if (isString(uly)) {
    url.searchParams.set("uly", uly);
  }

  return jsonFetch(
    url,
    init,
    {
      parseJson: reviver,
    },
  );
}
