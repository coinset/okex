import { jsonFetch, Reviver, SuccessResponse } from "./_utils.ts";
import { BASE_URL } from "./constants.ts";
import { isString } from "../deps.ts";
import type { InstType } from "./types.ts";

export type TickerOptions = {
  /** Instrument ID, e.g. `BTC-USD-SWAP` */
  instId: string;
};

type TickerData = {
  /** Instrument type */
  instType: InstType;

  /** Instrument ID */
  instId: string;

  /** Last traded price */
  last: number;

  /** Last traded size */
  lastSz: number;

  /** Best ask price */
  askPx: number;

  /** Best ask size */
  askSz: number;

  /** Best bid price */
  bidPx: number;

  /** Best bid size */
  bidSz: number;

  /** Open price in the past 24 hours */
  open24h: number;

  /** Highest price in the past 24 hours */
  high24h: number;

  /** Lowest price in the past 24 hours */
  low24h: number;

  /** 24h trading volume, with a unit of `currency`.
   * If it is a `derivatives` contract, the value is the number of base currency.
   * If it is `SPOT/MARGIN`, the value is the number of quote currency.
   */
  volCcy24h: number;

  /** 24h trading volume, with a unit of `contact`.
   * If it is a `derivatives` contract, the value is the number of contracts.
   * If it is `SPOT/MARGIN`, the value is the amount of base currency.
   */
  vol24h: number;

  /** Open price in the UTC 0 */
  sodUtc0: number;

  /** Open price in the UTC 8 */
  sodUtc8: number;

  /** Ticker data generation time, Unix timestamp format in milliseconds, e.g. `1597026383085`. */
  ts: number;
};

export type TickerResponse = SuccessResponse<
  TickerData[]
>;

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

/** Retrieve the latest price snapshot, best bid/ask price, and trading volume in the last 24 hours.
 * ```ts
 * import { fetchTicker } from "https://deno.land/x/okex@$VERSION/mod.ts"
 *
 * await fetchTicker({ instId: "BTC-USD-SWAP" })
 * ```
 * @see https://www.okex.com/docs-v5/en/?c++#rest-api-market-data-get-tickers
 */
export function fetchTicker(
  { instId }: TickerOptions,
  init?: RequestInit,
): Promise<TickerResponse> {
  const url = new URL("market/ticker", BASE_URL);

  url.searchParams.set("instId", instId);

  return jsonFetch(
    url,
    init,
    {
      parseJson: reviver,
    },
  );
}

export { reviver };
export type { TickerData };
