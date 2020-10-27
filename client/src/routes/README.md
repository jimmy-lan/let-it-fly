## Route Configurations

> Author: Jimmy Lan
>
> Creation Date: 2020-10-26

To configure routes, go to one of the existing files and add your route,
or start a new configuration file by exporting an array of `RouteEntry`.
If you are starting a new route configuration file, make sure to add your
array to the `routes` array in `models.ts` so that your route is properly
exported to the processor.

### Route Entry

The following is a detailed explanation for each attribute that you can specify.
You can also find this object in `models.ts`.

```typescript
/**
 * An entry in the route configuration object.
 */
export interface RouteEntry {
  /**
   * Path name to render the component
   */
  path: string;
  /**
   * Use exact route match. Defaults to false.
   */
  exact?: boolean;
  /**
   * Use route protection so that this route is only exposed to users
   * with the specified roles. If set to undefined, no route protection
   * is enabled. Defaults to undefined.
   */
  isProtected?: UserRole[] | undefined;
  /**
   * Url to redirect user if the user is not authenticated.
   * Defaults to undefined, where the redirect url in config object will
   * be used. Ignored if isProtected is false.
   */
  redirectUrl?: string;
  /**
   * The component to render in this route.
   */
  Component: FunctionComponent;
  /**
   * Children routes for this route. Children routes should
   * only be specified when the rendering of children depends
   * on the rendering of parent.
   */
  children?: RouteEntry[];
}
```

### Rendering of Components

For a given path, or url, **only** the first route entry matched
will be rendered. That is, routes that come after it, although
that route may match, will not be rendered.

Remember we are referring to the big `routes` object found in `index.ts`
in this directory. Therefore, the way that you concat the routes can have
an effect on what route will be rendered on the screen.

To create a fallback `404` route, add a route that matches everything
at the end of the big `routes` object.

### Notes on Children Routes

You should only specify a list of children routes when the rendering of
children components _depends_ on the rendering of parent component.
That is, the child component cannot be independently rendered on the screen
without some render of the parent component.

When you specify children routes, you will receive a prop `routes` in your parent
component, and a React hook `useRenderRoutes` is provided to you
for your convenience.

**Example of `useRenderRoutes`**

```typescript
interface OwnProps {
  /**
   * You will receive this prop if you specified children in the
   * route config file.
   */
  routes: RouteEntry[];
}

type Props = OwnProps;

const Example: FunctionComponent<Props> = (props) => {
  const { renderRoutes } = useRenderRoutes();
  return (
    <div>
      <h1>My fancy parent component</h1>
      {/*Call renderRoutes with the passed in
       routes at the place where
       you want to render children routes.*/}
      {renderRoutes(props.routes)}
    </div>
  );
};
```
