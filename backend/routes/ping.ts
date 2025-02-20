import { Router } from "jsr:@oak/oak";

const pingRouter = new Router({
  prefix: "/api/ping",
});

pingRouter.get("/", (ctx) => {
  ctx.response.body = { message: "Pong" };
});

export { pingRouter };
