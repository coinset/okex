import { anyNumber, expect, test } from "../dev_deps.ts";
import { fetchUSD24hVolume } from "./usd_24h_volume.ts";
test("fetchUSD24hVolume", async () => {
  await expect(fetchUSD24hVolume()).resolves.toEqual(
    {
      code: "0",
      msg: "",
      data: {
        volUsd: anyNumber(),
        volCny: anyNumber(),
        ts: anyNumber(),
      },
    },
  );
});
