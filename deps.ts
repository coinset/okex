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

type Primitive = string | number | bigint | undefined | null | symbol | boolean;

export type Exclusive<
  T extends Record<PropertyKey, unknown>,
  U extends Record<PropertyKey, unknown>,
> =
  | (
    & T
    & {
      [k in keyof U]?: U[k] extends Record<PropertyKey, unknown>
        ? T[k] extends Record<PropertyKey, unknown> ? Exclusive<U[k], T[k]>
        : T[k]
        : T[k] extends Record<PropertyKey, unknown> ? T[k]
        : T[k] extends Primitive | unknown[] ? T[k]
        : never;
    }
  )
  | (
    & U
    & {
      [k in keyof T]?: T[k] extends Record<PropertyKey, unknown>
        ? U[k] extends Record<PropertyKey, unknown> ? Exclusive<T[k], U[k]>
        : U[k]
        : U[k] extends Record<PropertyKey, unknown> ? U[k]
        : U[k] extends Primitive | unknown[] ? U[k]
        : never;
    }
  );
