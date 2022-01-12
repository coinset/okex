import { anyArray, anyNumber, anyString, expect, test } from "../dev_deps.ts";
import { fetchIndexTickers } from "./index_tickers.ts";
test("fetchIndexTickers", async () => {
  await expect(fetchIndexTickers({ quoteCcy: "BTC" })).resolves.toEqual(
    {
      code: "0",
      msg: "",
      data: anyArray({
        instId: anyString(),
        idxPx: anyNumber(),
        high24h: anyNumber(),
        low24h: anyNumber(),
        open24h: anyNumber(),
        sodUtc0: anyNumber(),
        sodUtc8: anyNumber(),
        ts: anyNumber(),
      }),
    },
  );

  await expect(fetchIndexTickers({ "instId": "BTC-USD" })).resolves.toEqual(
    {
      code: "0",
      msg: "",
      data: anyArray({
        instId: anyString(),
        idxPx: anyNumber(),
        high24h: anyNumber(),
        low24h: anyNumber(),
        open24h: anyNumber(),
        sodUtc0: anyNumber(),
        sodUtc8: anyNumber(),
        ts: anyNumber(),
      }),
    },
  );
});
