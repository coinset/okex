export type {
  BCH,
  BTC,
  ETH,
  JPY,
  LTC,
  MONA,
  Pair,
  XEM,
  XLM,
  XRP,
  XYM,
} from "https://deno.land/x/cc_types/mod.ts";

export { isNumber, isString } from "https://deno.land/x/isx/mod.ts";
export { join } from "https://deno.land/std@0.120.0/path/mod.ts";

export type StrictExtract<T, U extends T> = T extends U ? T : never;
