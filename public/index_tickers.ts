import { jsonFetch, Reviver, SuccessResponse } from "./_utils.ts";
import { BASE_URL } from "./constants.ts";
import { Exclusive, isString } from "../deps.ts";

type IndexTickersOptions = Exclusive<{
  /** Quote currency */
  quoteCcy: "USD" | "USDT" | "BTC";
}, {
  /** Index, e.g. BTC-USD */
  instId: string;
}>;

export type IndexTickersResponse = SuccessResponse<{
  /** Index */
  instId: string;

  /** Latest index price */
  idxPx: number;

  /** Highest price in the past 24 hours */
  high24h: number;

  /** Lowest price in the past 24 hours */
  low24h: number;

  /** Open price in the past 24 hours */
  open24h: number;

  /** Open price in the UTC 0 */
  sodUtc0: number;

  /** Open price in the UTC 8 */
  sodUtc8: number;

  /** Update time, Unix timestamp format in milliseconds */
  ts: number;
}[]>;

const reviver: Reviver = (key, value) => {
  if (
    ["idxPx", "high24h", "low24h", "open24h", "sodUtc0", "sodUtc8", "ts"]
      .includes(
        key,
      ) && isString(value)
  ) {
    return Number(value);
  }
  return value;
};

/** Retrieve index tickers.
 * ```ts
 * import { fetchIndexTickers } from "https://deno.land/x/okex@$VERSION/mod.ts"
 *
 * await fetchIndexTickers({ quoteCcy: "BTC" })
 * await fetchIndexTickers({ instId: "BTC-USD" })
 * ```
 * @see https://www.okex.com/docs-v5/en/?c++#rest-api-market-data-get-index-tickers
 */
export function fetchIndexTickers(
  { quoteCcy, instId }: IndexTickersOptions,
  init?: RequestInit,
): Promise<IndexTickersResponse> {
  const url = new URL("market/index-tickers", BASE_URL);

  if (isString(quoteCcy)) {
    url.searchParams.set("quoteCcy", quoteCcy);
  }

  if (isString(instId)) {
    url.searchParams.set("instId", instId);
  }

  return jsonFetch(
    url,
    init,
    {
      parseJson: reviver,
    },
  );
}
