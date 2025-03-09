## Database
- Postgres is working great!
- Prisma is working with a little help from github but it is a patch. It doesn't seem like that big of a patch but may get annoying. Should we consider an option that works without the patch?

## Authentication
- Use Keycloak with a [default identity provider](https://www.keycloak.org/docs/latest/server_admin/index.html#default_identity_provider) so that we are immediately redirected to CAS.
- Use the [Keycloak Angular](https://www.npmjs.com/package/keycloak-angular) npm package on the frontend to make integrating the service on Angular a breeze.
- There is a [Keycloak Connect](https://www.npmjs.com/package/keycloak-connect) npm package for use in node but it is marked as deprecated. It relies upon resource authorization rules set in the admin application itself. We may want to handle authorization ourselves so that the code for it is version controlled and we have fine-grained control that can be tested at every step.
- Think about how we are going to test the request handlers. We have to seperate out the logic of checking security and the actual logic. That way we can test just the logic. Then if needed we can also test the security seperatly. That makes each of our endpoints an integration function made up of security and the handler.

## File Object Storage
- Use the [Minio](https://www.npmjs.com/package/minio) npm package on deno (has typescript support)

## Open Telemetry
- Use the LGTM stack that fireship suggests to use (see the notes in teams)
- Deno just released a feature with [Open Telemetry](https://docs.deno.com/runtime/fundamentals/open_telemetry/) built in!

## Organization of the Backend
- I like putting the routes in their own folder so we can have the tests next to the handlers
- Not sure if I like the weird object thing that has the path, middleware, and handler all bundled.
- I made the object thing a little more manageable by wrapping it all in an Angular inspired routes file. I really feel like it is overkill and isn't worth it. Might just go back to doing it exactly has oak intends for it to be done. We still need to solve the export problem so that the handler (and probably the middleware as well) is testable in another file. It is nice to have everything all wrapped up and to have all of the routes organized all in one place with explicit reference to all the routes. The solution is just really complex for what it is doing. Will need to talk to the team about it and see if there is another way of doing this.
- Doing some weird things with custom generate commands