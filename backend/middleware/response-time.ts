import { Context, Next } from "@oak/oak";

export async function setResponseTimeHeader(context: Context, next: Next) {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  context.response.headers.set("X-Response-Time", `${ms}ms`);
}
