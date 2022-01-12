import { expect, test } from "../dev_deps.ts";
import { fetchTickers } from "./tickers.ts";
import { equality } from "./ticker_test.ts";

test("fetchTickers", async () => {
  await expect(fetchTickers({ "instType": "SPOT" })).resolves.toEqual(
    equality,
  );
});
