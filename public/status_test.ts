import {
  anyArray,
  anyNumber,
  anyOf,
  anyString,
  expect,
  test,
} from "../dev_deps.ts";
import { fetchStatus } from "./status.ts";
test("fetchStatus", async () => {
  await expect(fetchStatus({ state: "canceled" })).resolves.toEqual(
    {
      code: "0",
      msg: "",
      data: anyOf([
        [],
        anyArray({
          title: anyString(),
          state: anyString(),
          begin: anyNumber(),
          end: anyNumber(),
          href: anyString(),
          serviceType: anyOf(["0", "1", "2", "3", "4", "5"]),
          system: anyOf(["classic", "unified"]),
          scheDesc: anyString(),
        }),
      ]),
    },
  );
});
