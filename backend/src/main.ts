import { bold, yellow } from "@std/fmt/colors";
import { Application, Router } from "@oak/oak";

import { handleErrors } from "./middleware/errors.ts";
import { logRequests } from "./middleware/logging.ts";
import { setResponseTimeHeader } from "./middleware/response-time.ts";

import { routes } from "./routes/api.routes.ts";

const app = new Application();

// Middleware
app.use(handleErrors); // Handle errors
app.use(logRequests); // Logger
app.use(setResponseTimeHeader); // Response Time

// handle api routes
const api = new Router({
  prefix: "/api",
});

routes.forEach((route) => {
  const router = new Router();
  for (const endpoint of Object.values(route.endpoints)) {
    router[endpoint.method](
      endpoint.path,
      endpoint.middleware,
      endpoint.handler,
    );
  }
  api.use(route.path, router.routes(), router.allowedMethods());
});

app.use(api.routes(), api.allowedMethods());

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
