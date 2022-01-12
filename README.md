# @coinset/okex

Universal OKEX API client

:children_crossing: This is not official

## Public API

A request for an entry point that does not require authentication.

### fetchIndexTickers

Retrieve index tickers.
[Docs](https://www.okex.com/docs-v5/en/?c++#rest-api-market-data-get-index-tickers)

example:

```ts
import { fetchIndexTickers } from "https://deno.land/x/okex@$VERSION/mod.ts";

await fetchIndexTickers({ quoteCcy: "BTC" });
await fetchIndexTickers({ instId: "BTC-USD" });
```

parameters:

```ts
type IndexTickersOptions =
  | ({
    quoteCcy: "USD" | "USDT" | "BTC";
  } & {
    instId?: undefined;
  })
  | ({
    instId: string;
  } & {
    quoteCcy?: undefined;
  });
```

returns:

```ts
type IndexTickersResponse = {
  code: string;
  msg: string;
  data: {
    instId: string;
    idxPx: number;
    high24h: number;
    low24h: number;
    open24h: number;
    sodUtc0: number;
    sodUtc8: number;
    ts: number;
  }[];
};
```
