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
  Markunread as UnreadIcon,
} from "@material-ui/icons";

import { RouteEntry } from "../../routes";
import { useStyles } from "./PaperCraneSpace.style";
import { FeatureContainer } from "../../common/components/FeatureContainer";
import { useRenderRoutes } from "../../hooks/useRenderRoutes";
import { ListButtonWithTheme } from "./components/list/ListButtonWithTheme";
import { blueTheme, redTheme } from "./components/list/list.style";
import { ListIconItem } from "./components/list/ListIconItem";

interface OwnProps {
  routes?: RouteEntry[];
}

type Props = OwnProps;

const PaperCraneSpace: FunctionComponent<Props> = ({
  routes,
}: PropsWithChildren<Props>) => {
  const classes = useStyles();
  const { renderRoutes } = useRenderRoutes(routes);

  return (
    <div className={classes.root}>
      <List className={classes.list}>
        <ListButtonWithTheme theme={redTheme} className={classes.listItem}>
          Compose
        </ListButtonWithTheme>
        <ListButtonWithTheme theme={blueTheme} className={classes.listItem}>
          Search
        </ListButtonWithTheme>
        <ListIconItem text="Unread" icon={<UnreadIcon />} />
        <ListIconItem text="Received" icon={<InboxIcon />} />
        <ListIconItem text="Sent" icon={<SendIcon />} />
      </List>
      <FeatureContainer className={classes.content} fullHeight>
        {renderRoutes()}
      </FeatureContainer>
    </div>
  );
};

export { PaperCraneSpace };
