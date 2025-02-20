import { describe, it } from "jsr:@std/testing/bdd";

import { superoak } from "@x/superoak";
import app from "./main.ts";


// FIXME: gives error becuase not closing server
describe("server working", () => {

  it("the heartbeat is heard", async () => {
    const request = await superoak(app);
    request.get("/api/heartbeat").expect("Alive");
  })
})
