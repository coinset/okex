import { jsonFetch, SuccessResponse } from "./_utils.ts";
import { BASE_URL } from "./constants.ts";
import { isString } from "../deps.ts";
import { reviver, TickerData } from "./ticker.ts";
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

export type TickersResponse = SuccessResponse<TickerData[]>;

/** Retrieve the latest price snapshot, best bid/ask price, and trading volume in the last 24 hours.
 * ```ts
 * import { fetchTickers } from "https://deno.land/x/okex@$VERSION/mod.ts"
 *
 * await fetchTickers({ instType: "SPOT" })
 * ```
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
