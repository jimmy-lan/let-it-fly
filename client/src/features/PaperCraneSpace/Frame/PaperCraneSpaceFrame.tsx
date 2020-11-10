/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-04
 * Description:
 *    Paper crane space for regular users.
 *    Provide frame for pages in paper crane space.
 */
import React, { FunctionComponent, PropsWithChildren } from "react";
import { List } from "@material-ui/core";
import {
  Inbox as InboxIcon,
  Send as SendIcon,
  Star as StarredIcon,
} from "@material-ui/icons";

import { RouteEntry } from "../../../routes";
import { useStyles } from "./PaperCraneSpaceFrame.style";
import { useRenderRoutes } from "../../../hooks/useRenderRoutes";
import { ListButtonWithTheme } from "./components/list/ListButtonWithTheme";
import { blueTheme, redTheme } from "./components/list/list.style";
import { ListIconItem } from "./components/list/ListIconItem";
import { useHistory } from "../../../hooks/useHistory";

interface OwnProps {
  routes?: RouteEntry[];
}

type Props = OwnProps;

const PaperCraneSpaceFrame: FunctionComponent<Props> = ({
  routes,
}: PropsWithChildren<Props>) => {
  const classes = useStyles();
  const history = useHistory();
  const { renderRoutes } = useRenderRoutes(routes);

  const navigateToLocation = (url: string) => {
    history.push(url);
  };

  return (
    <div className={classes.root}>
      <List className={classes.list}>
        <ListButtonWithTheme theme={redTheme} className={classes.listItem}>
          Compose
        </ListButtonWithTheme>
        <ListButtonWithTheme theme={blueTheme} className={classes.listItem}>
          Search
        </ListButtonWithTheme>
        <ListIconItem
          onClick={() => navigateToLocation("/my/space/inbox")}
          text="Received"
          icon={<InboxIcon />}
        />
        <ListIconItem
          onClick={() => navigateToLocation("/my/space/sent")}
          text="Sent"
          icon={<SendIcon />}
        />
        <ListIconItem
          onClick={() => navigateToLocation("/my/space/starred")}
          text="Starred"
          icon={<StarredIcon />}
        />
      </List>
      {renderRoutes()}
    </div>
  );
};

export { PaperCraneSpaceFrame };
