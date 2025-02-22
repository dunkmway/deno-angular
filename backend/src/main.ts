import { bold, yellow } from "@std/fmt/colors";
import { Application } from "@oak/oak";

import { handleErrors } from "./middleware/errors.ts";
import { logRequests } from "./middleware/logging.ts";
import { setResponseTimeHeader } from "./middleware/response-time.ts";

import heartbeatRouter from "./routes/heartbeat.ts";

const app = new Application();

// Middleware
app.use(handleErrors); // Handle errors
app.use(logRequests); // Logger
app.use(setResponseTimeHeader); // Response Time

// handle api routes
app.use(heartbeatRouter.routes());
app.use(heartbeatRouter.allowedMethods());

// Send static content
app.use(async (context, next) => {
  try {
    await context.send({
      root: `dist/browser`,
      index: "index.html",
    });
  } catch {
    await next();
  }
});

app.addEventListener("listen", ({ hostname, port }) => {
  console.log(bold("Start listening on ") + yellow(`${hostname}:${port}`));
});

if (import.meta.main) {
  await app.listen({ port: 8000 });
}

export default app;
