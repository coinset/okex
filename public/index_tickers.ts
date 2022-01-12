import { jsonFetch, Reviver, SuccessResponse } from "./_utils.ts";
import { BASE_URL } from "./constants.ts";
import { Exclusive, isString } from "../deps.ts";

type IndexTickersOptions = Exclusive<{
  quoteCcy: "USD" | "USDT" | "BTC";
}, {
  instId: string;
}>;

export type IndexTickersResponse = SuccessResponse<{
  instId: string;
  idxPx: number;
  high24h: number;
  low24h: number;
  open24h: number;
  sodUtc0: number;
  sodUtc8: number;
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
