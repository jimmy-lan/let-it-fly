## App Configurations

> Author: Jimmy Lan
>
> Creation Date: 2020-10-31

In this directory, you can find configurations of this app.

### Side Menu Configurations

This configuration file is associating with the rendering of side menu 
on the AppFrame component. In particular, AppFrame decides to render a 
different set of menu items based on the role of the current user.

To configure menu items, please understand two interfaces: `SideMenuConfigEntry`
and `SideMenuConfigGroup`. You can find them in the `sideMenuConfig.ts` file.
`SideMenuConfigGroup` is a group of configuration
entries that will be applied for one specific role. 
Obviously, it contains a list of `SideMenuConfigEntry`.

For a `SideMenuConfigEntry`, you have options to set a name for the 
entry (the text that you will see on the menu item), the url that the
menu item will link to, the icon to be displayed, and the size of the
icon being rendered.

**Example**
```typescript
{
  role: UserRole.user,
  menuItems: [
    {
      name: "Home",
      url: "/my",
      Icon: HomeIcon,
    } 
  ] 
}
```

The above code specifies that for authenticated individual with role
`UserRole.user`, the menu will render an item with icon `HomeIcon`
and text `Home`. In addition, the menu item will bring the user to url `/my` when
the user clicks on it.
