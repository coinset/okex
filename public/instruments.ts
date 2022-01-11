import { jsonFetch, Reviver, SuccessResponse } from "./_utils.ts";
import { BASE_URL } from "./constants.ts";
import { isString } from "../deps.ts";
import type { InstType } from "./types.ts";

export type InstrumentsOptions =
  & {
    instId?: string;
  }
  & (
    | {
      instType: Exclude<InstType, "OPTION">;
      uly?: string;
    }
    | {
      instType: Extract<InstType, "OPTION">;
      uly: string;
    }
  );

export type InstrumentsResponse = SuccessResponse<{
  instType: InstType;
  instId: string;
  uly: string;
  category: string;
  baseCcy: string;
  quoteCcy: string;
  settleCcy: string;
  ctVal: number;
  ctMult: number;
  ctValCcy: string;
  optType: "C" | "P" | "";
  stk: string;
  listTime: number;
  expTime: number;
  lever: number;
  tickSz: number;
  lotSz: number;
  minSz: number;
  ctType: "linear" | "inverse" | "";
  alias: "this_week" | "next_week" | "quarter" | "next_quarter" | "";
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

/**
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
