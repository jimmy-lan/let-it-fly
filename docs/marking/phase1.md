## Brief Marking Guide for Phase 1

> Author: Jimmy Lan
>
> Date: 2020-11-09

For marking of phase 1, you do NOT have to follow the installation guide
on the README.md file found at the root of this repository. Simply enter
the directory `client`, and run

```bash
npm install
npm start
```

to see the application.

**Alternatively, you can run a docker image of our application.**
Please find the `Dockerfile` in the `client` directory to do this.

### Folder Structure (in `client/src` folder)

- app: Outer-most layer of the application. Consists of store, theme,
  and the App component.

- config: Configuration files to be parsed by the application.
  See: [Configurating the Application (with Menu Configuration)](/client/src/config).

- features: the main ui components.

- routes: Consists of route configuration files.
  See: [Using the Route Config Files and useRenderRoutes Hook](/client/src/routes)

\*\*Note that the route configuration features are not coming from a library.
We (or, in this case, I) wrote the logic to process the route configurations.
Find the logic in `common` and `hooks` folder.

- services: where our application makes outside API requests.

**Note that there are no API requests made at this point, as
requested. A `getFakeServerCall` helper is used to return a Promise.**
See: [Understanding the Server API Folder](/client/src/services/serverApi)

Thank you for grading our project. This awesome project would not
be possible without your help.

Jimmy Lan
