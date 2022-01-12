# @coinset/okex

Universal OKEX API client

:children_crossing: This is not official

## Public API

A request for an entry point that does not require authentication.

### fetchTicker

Retrieve the latest price snapshot, best bid/ask price, and trading volume in
the last 24 hours.
[Docs](https://www.okex.com/docs-v5/en/?c++#rest-api-market-data-get-tickers)

example:

```ts
import { fetchTicker } from "https://deno.land/x/okex@$VERSION/mod.ts";
await fetchTicker({ instId: "BTC-USD-SWAP" });
```

parameters:

```ts
type TickerOptions = {
  instId: string;
};
```

returns:

```ts
type TickerResponse = {
  code: "0";
  msg: "";
  data: {
    instType: InstType;
    instId: string;
    last: number;
    lastSz: number;
    askPx: number;
    askSz: number;
    bidPx: number;
    bidSz: number;
    open24h: number;
    high24h: number;
    low24h: number;
    volCcy24h: number;
    vol24h: number;
    sodUtc0: number;
    sodUtc8: number;
    ts: number;
  }[];
};
```

### fetchTickers

Retrieve the latest price snapshot, best bid/ask price, and trading volume in
the last 24 hours.
[Docs](https://www.okex.com/docs-v5/en/?c++#rest-api-market-data-get-tickers)

example:

```ts
import { fetchTickers } from "https://deno.land/x/okex@$VERSION/mod.ts";

await fetchTickers({ instType: "SPOT" });
```

parameters:

```ts
type InstType = "SPOT" | "MARGIN" | "SWAP" | "FUTURES" | "OPTION";

type TickersOptions = {
  instType: Exclude<InstType, "OPTION">;
  uly?: string | undefined;
} | {
  instType: Extract<InstType, "OPTION">;
  uly: string;
};
```

returns:

```ts
type TickersResponse = {
  code: "0";
  msg: "";
  data: {
    instType: InstType;
    instId: string;
    last: number;
    lastSz: number;
    askPx: number;
    askSz: number;
    bidPx: number;
    bidSz: number;
    open24h: number;
    high24h: number;
    low24h: number;
    volCcy24h: number;
    vol24h: number;
    sodUtc0: number;
    sodUtc8: number;
    ts: number;
  }[];
};
```

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
  code: "0";
  msg: "";
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
