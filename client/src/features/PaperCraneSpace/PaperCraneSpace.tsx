/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-04
 * Description:
 *    Paper crane space for regular users.
 *    Provide frame for pages in paper crane space.
 */
import React, { FunctionComponent, PropsWithChildren, useRef } from "react";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Inbox as InboxIcon } from "@material-ui/icons";

import { RouteEntry } from "../../routes";
import { useStyles } from "./PaperCraneSpace.style";
import { FeatureContainer } from "../../common/components/FeatureContainer";
import { useRenderRoutes } from "../../hooks/useRenderRoutes";

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
        <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItem>
      </List>
      <FeatureContainer className={classes.content} fullHeight>
        Example content
      </FeatureContainer>
    </div>
  );
};

export { PaperCraneSpace };
