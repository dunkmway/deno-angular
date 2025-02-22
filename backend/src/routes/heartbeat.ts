import { Router } from "jsr:@oak/oak";

const heartbeatRouter = new Router({
  prefix: "/api/heartbeat",
});

heartbeatRouter.get("/", (ctx) => {
  ctx.response.body = { message: "Alive" };
});

export default heartbeatRouter;
