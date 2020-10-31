/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-30
 * Description: Configuration for the display of side menu.
 */
import { SvgIconTypeMap } from "@material-ui/core";
import { UserRole } from "../services/serverApi";
import {
  HomeTwoTone as HomeIcon,
  SendTwoTone as SpaceIcon,
  LibraryAddTwoTone as ComposeIcon,
  StoreTwoTone as StoreIcon,
  SupervisedUserCircleTwoTone as FriendsIcon,
} from "@material-ui/icons";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";

export interface SideMenuConfigEntry {
  name: string;
  url: string;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
}

export interface SideMenuConfigGroup {
  role: UserRole;
  menuItems: SideMenuConfigEntry[];
}

export const sideMenuConfig: SideMenuConfigGroup[] = [
  {
    role: UserRole.user,
    menuItems: [
      {
        name: "Home",
        url: "/my",
        Icon: HomeIcon,
      },
      {
        name: "Compose",
        url: "/my/space/compose",
        Icon: ComposeIcon,
      },
      {
        name: "Space",
        url: "/my/space",
        Icon: SpaceIcon,
      },
      {
        name: "Friends",
        url: "/my/friends",
        Icon: FriendsIcon,
      },
      {
        name: "Store",
        url: "/my/store",
        Icon: StoreIcon,
      },
    ],
  },
];
