import { jsonFetch, Reviver, SuccessResponse } from "./_utils.ts";
import { BASE_URL } from "./constants.ts";
import { isString } from "../deps.ts";

export type StatusOptions = {
  /** System maintenance status,`scheduled`: waiting; `ongoing`: processing; `completed`: completed ;`canceled`: canceled .
   * If this parameter is not filled, the data with status `scheduled` and `ongoing` will be returned by default
   */
  state?: "scheduled" | "ongoing" | "completed" | "canceled";
};

export type StatusResponse = SuccessResponse<{
  /** The title of system maintenance instructions */
  title: string;

  /** System maintenance status */
  state: string;

  /** Begin time of system maintenance, Unix timestamp format in milliseconds, e.g. `1617788463867` */
  begin: number;

  /** End time of system maintenance, Unix timestamp format in milliseconds, e.g. `1617788463867` */
  end: number;

  /** Hyperlink for system maintenance details, if there is no return value, the default value will be empty. e.g. `“”` */
  href: string;

  /** Service type, `0`：WebSocket ; `1`：Spot/Margin ; `2`：Futures ; `3`：Perpetual ; `4`：Options ; `5`：Trading service */
  serviceType: "0" | "1" | "2" | "3" | "4" | "5";

  /** System， `classic`：Classic account， `unified`：Unified account */
  system: "classic" | "unified";

  /** Rescheduled description，e.g. Rescheduled from `2021-01-26T16:30:00.000Z` to `2021-01-28T16:30:00.000Z` */
  scheDesc: string;
}[]>;

const reviver: Reviver = (key, value) => {
  if (["begin", "end"].includes(key) && isString(value)) {
    return Number(value);
  }
  return value;
};

/** Get event status of system upgrade.
 * ```ts
 * import { fetchStatus } from "https://deno.land/x/okex@$VERSION/mod.ts"
 *
 * await fetchStatus()
 * ```
 * @see https://www.okex.com/docs-v5/en/?c++#rest-api-status
 */
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
