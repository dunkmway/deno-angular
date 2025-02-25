import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { testing } from "@oak/oak";

import { getGenerated } from "./generated.ts";

describe("get generated", () => {
  it("has been configured", () => {
    const ctx = testing.createMockContext();
    getGenerated.handler(ctx);

    expect(false).toBeTruthy()
  });
})