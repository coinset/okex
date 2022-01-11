import {
  anyArray,
  anyNumber,
  anyOf,
  anyString,
  expect,
  test,
} from "../dev_deps.ts";
import { fetchInstruments } from "./instruments.ts";
const equality = {
  code: "0",
  msg: "",
  data: anyArray({
    instType: anyOf(["SPOT", "MARGIN", "SWAP", "FUTURES", "OPTION"]),
    instId: anyString(),
    uly: anyString(),
    category: anyString(),
    baseCcy: anyString(),
    quoteCcy: anyString(),
    settleCcy: anyString(),
    ctVal: anyNumber(),
    ctMult: anyNumber(),
    ctValCcy: anyString(),
    optType: anyOf(["C", "P", ""]),
    stk: anyString(),
    listTime: anyNumber(),
    expTime: anyNumber(),
    lever: anyNumber(),
    tickSz: anyNumber(),
    lotSz: anyNumber(),
    minSz: anyNumber(),
    ctType: anyOf(["linear", "inverse", ""]),
    alias: anyOf(["this_week", "next_week", "quarter", "next_quarter", ""]),
    state: anyOf(["live", "suspend", "preopen", "settlement"]),
  }),
};
test("fetchInstruments", async () => {
  await expect(fetchInstruments({ "instType": "SPOT" })).resolves.toEqual(
    equality,
  );

  await expect(fetchInstruments({ "instType": "MARGIN" })).resolves.toEqual(
    equality,
  );
});
