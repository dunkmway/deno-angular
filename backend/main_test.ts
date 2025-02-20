import { expect } from "@std/expect";
import { add } from "./main.ts";

Deno.test(function addTest() {
  expect(add(2, 3)).toBe(5);
});
