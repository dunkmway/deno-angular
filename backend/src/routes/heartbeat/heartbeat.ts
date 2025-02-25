import { Context, Next, Router } from "jsr:@oak/oak";

// if we are going to test just the handler,
// we need a way to export it so that the testing file can import it
export const getHeartbeat = {
  path: "/",
  middleware: (ctx: Context, next: Next): void => {
    // check the authorization header
    if (ctx.request.headers.get('Authorization') != 'password') {
      ctx.response.status = 403;
      return;
    }
    next();
  },
  handler: (ctx: Context): void => {
    ctx.response.body = { message: "Alive" };
  }
}

const heartbeat = new Router();

heartbeat.get(getHeartbeat.path, getHeartbeat.middleware, getHeartbeat.handler);

export default heartbeat;
