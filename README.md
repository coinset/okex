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

### fetchInstruments

Retrieve a list of instruments with open contracts.
[Docs](https://www.okex.com/docs-v5/en/?c++#rest-api-public-data-get-instruments)

example:

```ts
import { fetchInstruments } from "https://deno.land/x/okex@$VERSION/mod.ts";
await fetchInstruments({ instType: "SPOT" });
```

parameters:

```ts
type InstrumentsOptions =
  & {
    instId?: string | undefined;
  }
  & ({
    instType: "SPOT" | "MARGIN" | "SWAP" | "FUTURES";
    uly?: string | undefined;
  } | {
    instType: "OPTION";
    uly: string;
  });
```

returns:

```ts
type InstType = "SPOT" | "MARGIN" | "SWAP" | "FUTURES" | "OPTION";

type InstrumentsResponse = {
  code: "0";
  msg: "";
  data: {
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
  }[];
};
```

### fetchUSD24hVolume

The 24-hour trading volume is calculated on a rolling basis, using USD as the
pricing unit.
[Docs](https://www.okex.com/docs-v5/en/?c++#rest-api-market-data-get-24h-total-volume)

example:

```ts
import { fetchUSD24hVolume } from "https://deno.land/x/okex@$VERSION/mod.ts";

await fetchUSD24hVolume();
```

returns:

```ts
type USD24hVolumeResponse = {
  code: "0";
  msg: "";
  data: {
    volUsd: number;
    volCny: number;
    ts: number;
  };
};
```

### fetchState

Get event status of system upgrade.
[Docs](https://www.okex.com/docs-v5/en/?c++#rest-api-status)

example:

```ts
import { fetchStatus } from "https://deno.land/x/okex@$VERSION/mod.ts";

await fetchStatus();
```

parameters:

```ts
type StatusOptions = {
  state?: "scheduled" | "ongoing" | "completed" | "canceled" | undefined;
};
```

returns:

```ts
type StatusResponse = {
  code: "0";
  msg: "";
  data: {
    title: string;
    state: string;
    begin: number;
    end: number;
    href: string;
    serviceType: "0" | "1" | "2" | "3" | "4" | "5";
    system: "classic" | "unified";
    scheDesc: string;
  }[];
};
```
