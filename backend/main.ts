import { bold, yellow } from "jsr:@std/fmt/colors";
import { Application } from "jsr:@oak/oak";

import {
  handleErrors,
  logRequests,
  sendStaticContent,
  setResponseTimeHeader,
} from "./middleware.ts";

import { pingRouter } from "./ping.ts";

const app = new Application();
// const angularApp = new AngularAppEngine();

/** * This is a request handler used by the Angular CLI (dev-server and during build). */
// createRequestHandler(async (req: Request) =>  await angularApp.handle(req));

// Middleware
app.use(handleErrors); // Handle errors
app.use(logRequests); // Logger
app.use(setResponseTimeHeader); // Response Time

// handle api routes
app.use(pingRouter.routes());
app.use(pingRouter.allowedMethods());

// Send static content
app.use(sendStaticContent);

app.addEventListener("listen", ({ hostname, port }) => {
  console.log(bold("Start listening on ") + yellow(`${hostname}:${port}`));
});

await app.listen({ port: 8000 });
