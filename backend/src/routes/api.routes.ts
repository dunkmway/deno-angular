import { Route } from "./api.types.ts";
import { getHeartbeat, postHeartbeat } from "./heartbeat/heartbeat.ts";
import { getHello } from "./hello/hello.ts";

export const routes: Route[] = [
  {
    path: "/heartbeat",
    endpoints: [
      getHeartbeat,
      postHeartbeat,
    ],
  },
  {
    path: "/hello",
    endpoints: [
      getHello,
    ],
  },
];
