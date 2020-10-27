## Server APIs

> Author: Jimmy Lan
>
> Creation Date: 2020-10-26

Server APIs folder keeps track of a set of files that send requests to 
server. The purpose of this directory is to create a separate of concern
between side effects (in this case, this means the async server calls) and
the actual components that we write.

Using our implementation, when changes are made in the servers, we only need
to change method implementations in this directory. Also, since this project
has two phases, and in phase 1 we are not allowed to make any API calls to external
servers, we substitute the method implementation with fake server calls.

### Helper: Getting Fake Server Calls

You can get a fake server call by using the utility function `getFakeServerCall` found
in `helpers.ts`. For example,

```typescript
getFakeServerCall({success: true, data: { hi: "there" }}, 1)
```

would return a promise which will resolve in 1 second with the object 
`{success: true, data: { hi: "there" }}`.

### Server Response Interface

Please make sure your data follows the `ServerResponse` interface.
You can extend this interface to make more specific blueprints in order to reuse
the type, or you can hard code a bit.
