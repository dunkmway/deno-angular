import { Next, RouterContext } from "jsr:@oak/oak";

export type Endpoint<Path extends string> = {
  method: "get" | "post" | "put" | "patch" | "delete" | "options" | "head";
  path: Path;
  middleware: (ctx: RouterContext<Path>, next: Next) => void;
  handler: (ctx: RouterContext<Path>) => void;
};

export function createEndpoint<Path extends string>(config: {
  path: Path;
  method: Endpoint<Path>["method"];
  middleware: Endpoint<Path>["middleware"];
  handler: Endpoint<Path>["handler"];
}): Endpoint<Path> {
  return {
    method: config.method,
    path: config.path,
    middleware: config.middleware,
    handler: config.handler,
  };
}

export type Route = {
  path: string;
  // deno-lint-ignore no-explicit-any
  endpoints: Endpoint<any>[];
};
