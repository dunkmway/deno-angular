import { createEndpoint } from "../api.types.ts";

export const getHello = createEndpoint({
  method: "get",
  path: "/:name",
  middleware: (ctx, next): void => {
    next();
  },
  handler: (ctx): void => {
    ctx.response.body = `Hello, ${ctx.params.name}!`;
  },
});
