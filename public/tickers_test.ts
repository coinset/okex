import {
  anyArray,
  anyNumber,
  anyOf,
  anyString,
  expect,
  test,
} from "../dev_deps.ts";
import { fetchTickers } from "./tickers.ts";
const equality = {
  code: "0",
  msg: "",
  data: anyArray({
    instType: anyOf(["SPOT", "MARGIN", "SWAP", "FUTURES", "OPTION"]),
    instId: anyString(),
    last: anyNumber(),
    lastSz: anyNumber(),
    askPx: anyNumber(),
    askSz: anyNumber(),
    bidPx: anyNumber(),
    bidSz: anyNumber(),
    open24h: anyNumber(),
    high24h: anyNumber(),
    low24h: anyNumber(),
    volCcy24h: anyNumber(),
    vol24h: anyNumber(),
    sodUtc0: anyNumber(),
    sodUtc8: anyNumber(),
    ts: anyNumber(),
  }),
};
test("fetchTickers", async () => {
  await expect(fetchTickers({ "instType": "SPOT" })).resolves.toEqual(
    equality,
  );
});
