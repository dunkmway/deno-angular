import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { testing } from "@oak/oak";

import { getHello } from "./hello.ts";

describe("get hello", () => {
  const ctx = testing.createMockContext<"/:name">({
    params: { name: "World" },
  });

  it("has been implemented", () => {
    getHello.handler(ctx);
    expect(ctx.response.status).not.toBe(501);
  });

  it("responds back", () => {
    getHello.handler(ctx);
    expect(ctx.response.body).toBe("Hello, World!");
  });
});
