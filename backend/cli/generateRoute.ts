async function generateRoute(routeName: string) {
  const captializeRouteName = routeName.charAt(0).toUpperCase() + routeName.substring(1);
  const routeDir = `src/routes/${routeName}`;
  await Deno.mkdir(routeDir);

  const routeFile = `${routeDir}/${routeName}.ts`;
  const testFile = `${routeDir}/${routeName}.test.ts`;

  const routeContent = `
import { Context, Next, Router } from "jsr:@oak/oak";

export const get${captializeRouteName} = {
  path: "/",
  middleware: (ctx: Context, next: Next): void => {
    next();
  },
  handler: (ctx: Context): void => {
    ctx.response.status = 501;
  }
}

const ${routeName} = new Router();

${routeName}.get(get${captializeRouteName}.path, get${captializeRouteName}.middleware, get${captializeRouteName}.handler);

export default ${routeName};
`;

  const testContent = `
import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { testing } from "@oak/oak";

import { get${captializeRouteName} } from "./${routeName}.ts";

describe("get ${routeName}", () => {
  it("has been configured", () => {
    const ctx = testing.createMockContext();
    get${captializeRouteName}.handler(ctx);

    expect(false).toBeTruthy()
  });
})
`;

  await Deno.writeTextFile(routeFile, routeContent.trim());
  await Deno.writeTextFile(testFile, testContent.trim());

  console.log(`Route '${routeName}' created successfully!`);

  await updateRouterFile(routeName);
}

async function updateRouterFile(routeName: string) {
  const ROUTER_FILE = "src/routes/api.ts";
  let routerContent = await Deno.readTextFile(ROUTER_FILE);

  // Check if route is already included
  if (routerContent.includes(`import ${routeName} from`)) {
    console.log(`Route '${routeName}' is already registered.`);
    return;
  }

  // Insert import statement
  routerContent = routerContent.replace(
    "// New route import will be appended here (DO NOT REMOVE)",
    `import ${routeName} from "./${routeName}/${routeName}.ts";\n// New route import will be appended here (DO NOT REMOVE)`
  );

  // Insert api.use() statement before `export default api;`
  routerContent = routerContent.replace(
    "// New route will be appended here (DO NOT REMOVE)",
    `api.use("/${routeName}", ${routeName}.routes(), ${routeName}.allowedMethods());\n// New route will be appended here (DO NOT REMOVE)`
  );

  await Deno.writeTextFile(ROUTER_FILE, routerContent);
  console.log(`Updated 'api.ts' to include '${routeName}' route.`);
}


if (Deno.args[0] != null) {
  await generateRoute(Deno.args[0]);
} else {
  console.log('Please specify a route to generate');
}
