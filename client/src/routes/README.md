## Route Configurations

> Author: Jimmy Lan
>
> Creation Date: 2020-10-26

To configure routes, go to one of the existing files and add your route,
or create a new configuration file by exporting an array of `RouteEntry`.
If you are creating a new route configuration file, make sure to add your
array to the `routes` array in `index.ts` so that your route is properly
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
they may match, will not be rendered.

Remember the processor will only concern about the big `routes` array found in `index.ts`
in this directory. Therefore, the way that you concat the routes inside of the `routes` array
can have an effect on what route will be rendered on the screen.

**Example**

What is the problem with the route configuration below?

```typescript
[
  {
    path: "/my",
    Component: MyComponent,
  },
  {
    path: "/my/dummyText",
    Component: DummyText,
  },
];
```

_Answer:_ Since the first route entry for `MyComponent` does not have an `exact` attribute on it,
the route entry will match every path starting with `/my`. Therefore, `/my/dummyText` will also be
matched by the first route entry, so `MyComponent` will be displayed. The dummy text component will not
be shown even if you navigate to `/my/dummyText`.

A simple fix for this would be:

```typescript
[
  {
    path: "/my",
    exact: true,
    Component: MyComponent,
  },
  {
    path: "/my/dummyText",
    Component: DummyText,
  },
];
```

### Ambiguous Matches and Generic Matches

Route configuration supports ambiguous matches and generic matches. In particular, the following
route entry

```typescript
{
  path: "*",
  Component: MatchesEverywhereComponent
}
```

will match every path, and

```typescript
{
  path: "/friends/:friendId",
  Component: FriendsComponent
}
```

will match all routes going to `"/friends/..."`.
You can obtain the path parameter using one of the provided hooks.
More information on this to come.

### Notes on Children Routes

You should only specify a list of children routes when the rendering of
children components _depends_ on the rendering of parent component.
That is, the child component cannot be independently rendered on the screen
without some rendering of the parent component.

When you configure children routes, you will receive a prop `routes` in your parent
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
  const { renderRoutes } = useRenderRoutes(props.routes);
  return (
    <div>
      <h1>My fancy parent component</h1>
      {/*Call renderRoutes with the passed in
       routes at the place where
       you want to render children routes.*/}
      {renderRoutes()}
    </div>
  );
};
```

### Route Inheritance

The `isProtected` attribute of route entries can inherit to children components.
In particular, the inheritance follows the following rules:

1. If the parent has a specified `isProtected` array, and the child does not have a
   `isProtected` associating with it, then the child inherits the `isProtected` property
   automatically from the parent component.

**Example**

```typescript
{
  path: "/parent",
  Component: ParentComponent,
  isProtected: [UserRole.admin]
  children: [
    {
      path: "/parent/child",
      Component: ChildComponent
    }
  ]
}
```

In the above case, the child component is only accessible if the user is `UserRole.admin`.

2. If the parent has a specified `isProtected` array, but the child also has a
   `isProtected` attribute associating with it, and the `isProtected` attribute overlaps
   with the parent `isProtected` array, then the children has an `isProtected` value to
   the overlapping roles.

**Example**

```typescript
{
  path: "/parent",
  Component: ParentComponent,
  isProtected: [UserRole.admin, UserRole.user]
  children: [
    {
      path: "/parent/child",
      Component: ChildComponent,
      isProtected: [UserRole.user]
    }
  ]
}
```

In the above case, the `ChildComponent` will only render if the user has role `UserRole.user`.

3. If the parent has a `isProtected` value set, but the child has a completely different
   `isProtected` array such that both `isProtected` arrays do not overlap.
   Then, the route entry corresponding to the child component is discarded and ignored.

**Example**

```typescript
{
  path: "/parent",
  Component: ParentComponent,
  isProtected: [UserRole.user]
  children: [
    {
      path: "/parent/child",
      Component: ChildComponent,
      isProtected: [UserRole.admin]
    }
  ]
}
```

In the above case, the configuration is equivalent to

```typescript
{
  path: "/parent",
  Component: ParentComponent,
  isProtected: [UserRole.user]
  children: []
}
```

As you can see, the children entry is ignored and will not be rendered
on the screen.
