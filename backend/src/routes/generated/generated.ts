import { Context, Next, Router } from "jsr:@oak/oak";

export const getGenerated = {
  path: "/",
  middleware: (ctx: Context, next: Next): void => {
    next();
  },
  handler: (ctx: Context): void => {
    ctx.response.status = 501;
  }
}

const generated = new Router();

generated.get(getGenerated.path, getGenerated.middleware, getGenerated.handler);

export default generated;