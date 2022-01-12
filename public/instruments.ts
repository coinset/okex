import { jsonFetch, Reviver, SuccessResponse } from "./_utils.ts";
import { BASE_URL } from "./constants.ts";
import { isString } from "../deps.ts";
import type { InstType } from "./types.ts";

export type InstrumentsOptions =
  & {
    /** Instrument ID */
    instId?: string;
  }
  & (
    | {
      /** Instrument type */
      instType: Exclude<InstType, "OPTION">;
      uly?: string;
    }
    | {
      /** Instrument type */
      instType: Extract<InstType, "OPTION">;

      /** Underlying Only applicable to `FUTURES/SWAP/OPTION`. Required for `OPTION`. */
      uly: string;
    }
  );

export type InstrumentsResponse = SuccessResponse<{
  /** Instrument type */
  instType: InstType;

  /** Instrument ID, e.g. `BTC-USD-SWAP` */
  instId: string;

  /** Underlying, e.g. `BTC-USD`
   * Only applicable to `FUTURES/SWAP/OPTION` */
  uly: string;

  /** Fee schedule */
  category: string;

  /** Base currency, e.g. `BTC` in `BTC-USDT`
   * Only applicable to `SPOT` */
  baseCcy: string;

  /** Quote currency, e.g. `USDT` in `BTC-USDT`
   * Only applicable to `SPOT` */
  quoteCcy: string;

  /** Settlement and margin currency, e.g. `BTC`
   * Only applicable to `FUTURES/SWAP/OPTION`
   */
  settleCcy: string;

  /** Contract value
   * Only applicable to `FUTURES/SWAP/OPTION` */
  ctVal: number;

  /** Contract multiplier
   * Only applicable to `FUTURES/SWAP/OPTION` */
  ctMult: number;

  /** Contract value currency
   * Only applicable to `FUTURES/SWAP/OPTION` */
  ctValCcy: string;

  /** Option type, `C`: Call `P`: put
   * Only applicable to `OPTION` */
  optType: "C" | "P" | "";

  /** Strike price
   * Only applicable to `OPTION` */
  stk: string;

  /** Listing time, Unix timestamp format in milliseconds, e.g. `1597026383085` */
  listTime: number;

  /** Expiry time, Unix timestamp format in milliseconds, e.g. `1597026383085`
   * Only applicable to `FUTURES/OPTION` */
  expTime: number;

  /** Max Leverage,
   * Not applicable to `SPOT`、`OPTION` */
  lever: number;

  /** Tick size, e.g. `0.0001` */
  tickSz: number;

  /** Lot size, e.g. BTC-USDT-SWAP: `1` */
  lotSz: number;

  /** Minimum order size */
  minSz: number;

  /** Contract type
   * `linear`: linear contract
   * `inverse`: inverse contract
   * Only applicable to `FUTURES/SWAP` */
  ctType: "linear" | "inverse" | "";

  /** Alias
   * `this_week`
   * `next_week`
   * `quarter`
   * `next_quarter`
   * Only applicable to `FUTURES`
   */
  alias: "this_week" | "next_week" | "quarter" | "next_quarter" | "";

  /** Instrument status
   * `live`
   * `suspend`
   * `preopen`
   * `settlement` */
  state: "live" | "suspend" | "preopen" | "settlement";
}[]>;

const reviver: Reviver = (key, value) => {
  if (
    [
      "listTime",
      "expTime",
      "lever",
      "tickSz",
      "lotSz",
      "minSz",
      "ctVal",
      "ctMult",
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

/** Retrieve a list of instruments with open contracts.
 * ```ts
 * import { fetchInstruments } from "https://deno.land/x/okex@$VERSION/mod.ts"
 * await fetchInstruments({ instType: "SPOT" })
 * ```
 * @see https://www.okex.com/docs-v5/en/?c++#rest-api-public-data-get-instruments
 */
export function fetchInstruments(
  { instType, uly, instId }: InstrumentsOptions,
  init?: RequestInit,
): Promise<InstrumentsResponse> {
  const url = new URL("public/instruments", BASE_URL);

  url.searchParams.set("instType", instType);

  if (isString(uly)) {
    url.searchParams.set("uly", uly);
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
