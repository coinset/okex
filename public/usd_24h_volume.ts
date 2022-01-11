import { jsonFetch, Reviver, SuccessResponse } from "./_utils.ts";
import { BASE_URL } from "./constants.ts";
import { isString } from "../deps.ts";

type USD24hVolume = {
  volUsd: number;
  volCny: number;
  ts: number;
};

export type USD24hVolumeResponse = SuccessResponse<USD24hVolume>;

const reviver: Reviver = (key, value) => {
  if (["volUsd", "volCny", "ts"].includes(key) && isString(value)) {
    return Number(value);
  }
  return value;
};

/**
 * @see https://www.okex.com/docs-v5/en/?c++#rest-api-market-data-get-24h-total-volume
 */
export async function fetchUSD24hVolume(
  init?: RequestInit,
): Promise<USD24hVolumeResponse> {
  const url = new URL("market/platform-24-volume", BASE_URL);

  const { code, msg, data } = await jsonFetch<
    { code: "0"; msg: ""; data: [USD24hVolume] }
  >(
    url,
    init,
    {
      parseJson: reviver,
    },
  );

  return {
    code,
    msg,
    data: data[0],
  };
}
