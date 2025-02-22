import { bold, cyan, green } from "@std/fmt/colors";
import { Context, Next } from "@oak/oak";

export async function logRequests(context: Context, next: Next) {
  await next();
  const rt = context.response.headers.get("X-Response-Time");
  console.log(
    `${green(context.request.method)} ${cyan(context.request.url.pathname)} - ${
      bold(
        String(rt),
      )
    }`,
  );
}
