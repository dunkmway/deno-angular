import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { testing } from "@oak/oak";

import { getHeartbeat } from "./heartbeat.ts";

describe("get heartbeat", () => {
  it("responds with Alive", () => {
    const ctx = testing.createMockContext<"/">();
    getHeartbeat.handler(ctx);

    expect(ctx.response.body).toMatchObject({ message: "Alive" });
  });
});
