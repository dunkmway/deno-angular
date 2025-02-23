## Database
- Postgres is working great!
- Prisma is working with a little help from github but it is a patch. It doesn't seem like that big of a patch but may get annoying. Should we consider an option that works without the patch?

## Authentication
- Use Keycloak with a [default identity provider](https://www.keycloak.org/docs/latest/server_admin/index.html#default_identity_provider) so that we are immediately redirected to CAS.
- Use the [Keycloak Angular](https://www.npmjs.com/package/keycloak-angular) npm package on the frontend to make integrating the service on Angular a breeze.
- There is a [Keycloak Connect](https://www.npmjs.com/package/keycloak-connect) npm package for use in node but it is marked as deprecated. It relies upon resource authorization rules set in the admin application itself. We may want to handle authorization ourselves so that the code for it is version controlled and we have fine-grained control that can be tested at every step.

## File Object Storage
- Use the [Minio](https://www.npmjs.com/package/minio) npm package on deno (has typescript support)

## Open Telemetry
- Use the LGTM stack that fireship suggests to use (see the notes in teams)
- Deno just released a feature with [Open Telemetry](https://docs.deno.com/runtime/fundamentals/open_telemetry/) built in!
