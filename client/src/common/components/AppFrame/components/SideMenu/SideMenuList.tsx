/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-25
 * Description:
 *    A list rendered based on configured routes.
 */
import React, { FunctionComponent } from "react";
import { List } from "@material-ui/core";

import { useSideMenuConfig } from "../../../../../hooks/useConfig";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../app/store";
import {
  SideMenuConfigEntry,
  SideMenuConfigGroup,
} from "../../../../../config";
import { SideMenuItem } from "./SideMenuItem";

interface OwnProps {
  className?: string;
}

type Props = OwnProps;

const SideMenuList: FunctionComponent<Props> = ({ className }: Props) => {
  const sideMenuConfig = useSideMenuConfig();
  const currentUserRole = useSelector(
    (state: RootState) => state.userAuth.role
  );
  const menuToRender: SideMenuConfigEntry[] | undefined = sideMenuConfig.find(
    (sideMenuConfigGroup: SideMenuConfigGroup) =>
      sideMenuConfigGroup.role === currentUserRole
  )?.menuItems;

  if (!menuToRender) {
    return <></>;
  }

  return (
    <List className={className}>
      {menuToRender.map(
        ({ name, Icon, url, size, highlightExact }: SideMenuConfigEntry) => (
          <SideMenuItem
            name={name}
            Icon={Icon}
            url={url}
            size={size}
            highlightExact={highlightExact}
            key={`${name}${url}`}
          />
        )
      )}
    </List>
  );
};

export { SideMenuList };
