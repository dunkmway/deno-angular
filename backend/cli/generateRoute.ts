async function generateRoute(routeName: string) {
  const captializeRouteName = routeName.charAt(0).toUpperCase() + routeName.substring(1);
  const routeDir = `src/routes/${routeName}`;
  await Deno.mkdir(routeDir);

  const routeFile = `${routeDir}/${routeName}.ts`;
  const testFile = `${routeDir}/${routeName}.test.ts`;

  const routeContent = `
import { createEndpoint } from "../api.types.ts";

export const get${captializeRouteName} = createEndpoint({
  method: "get",
  path: "/",
  middleware: (ctx, next): void => {
    next();
  },
  handler: (ctx): void => {
    ctx.response.status = 501;
  }
});
`;

  const testContent = `
import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { testing } from "@oak/oak";

import { get${captializeRouteName} } from "./${routeName}.ts";

describe("get ${routeName}", () => {
  const ctx = testing.createMockContext<"/">();
  it("has been implemented", () => {
    get${captializeRouteName}.handler(ctx);
    expect(ctx.response.status).not.toBe(501);
  });
})
`;

  await Deno.writeTextFile(routeFile, routeContent.trim());
  await Deno.writeTextFile(testFile, testContent.trim());

  console.log(`Route '${routeName}' created successfully!`);

  await updateRouterFile(routeName);
}

async function updateRouterFile(routeName: string) {
  const captializeRouteName = routeName.charAt(0).toUpperCase() + routeName.substring(1);
  const ROUTER_FILE = "src/routes/api.routes.ts";
  let routerContent = await Deno.readTextFile(ROUTER_FILE);

  // Insert import statement
  routerContent = routerContent.replace(
    /(^import.*$)(?!\n^import.*$)/gm,
    `$1\nimport { get${captializeRouteName} } from "./${routeName}/${routeName}.ts";`
  );

  // Insert route object
  routerContent = routerContent.replace(
    /({\s*(?:[^{}]|\{[^{}]*\})*\s*})$/gm,
    `$1,\n\t{\n\t\tpath: "/${routeName}",\n\t\tendpoints: [\n\t\t\tget${captializeRouteName}\n\t\t]\n\t}`
  );

  await Deno.writeTextFile(ROUTER_FILE, routerContent);
  console.log(`Updated 'api.routes.ts' to include '${routeName}' route.`);
}


if (Deno.args[0] != null) {
  await generateRoute(Deno.args[0]);
} else {
  console.log('Please specify a route to generate');
}
