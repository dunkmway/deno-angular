import { createEndpoint } from "../api.types.ts";

export const getHeartbeat = createEndpoint({
  method: "get",
  path: "/",
  middleware: (ctx, next): void => {
    // check the authorization header
    if (ctx.request.headers.get("Authorization") != "password") {
      ctx.response.status = 403;
      return;
    }
    next();
  },
  handler: (ctx): void => {
    ctx.response.body = { message: "Alive" };
  },
});

export const postHeartbeat = createEndpoint({
  method: "post",
  path: "/",
  middleware: (ctx, next): void => {
    // check the authorization header
    if (ctx.request.headers.get("Authorization") != "password") {
      ctx.response.status = 403;
      return;
    }
    next();
  },
  handler: (ctx): void => {
    ctx.response.body = { message: "Alive" };
  },
});
