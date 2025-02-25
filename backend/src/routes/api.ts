import { Router } from "jsr:@oak/oak";
import heartbeat from "./heartbeat/heartbeat.ts";
import generated from "./generated/generated.ts";
// New route import will be appended here (DO NOT REMOVE)

const api = new Router({
  prefix: "/api"
});

api.use("/heartbeat", heartbeat.routes(), heartbeat.allowedMethods());
api.use("/generated", generated.routes(), generated.allowedMethods());
// New route will be appended here (DO NOT REMOVE)

export default api;