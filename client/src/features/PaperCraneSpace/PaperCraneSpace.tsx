/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-04
 * Description:
 *    Paper crane space for regular users.
 *    Provide frame for pages in paper crane space.
 */
import React, { FunctionComponent, PropsWithChildren } from "react";
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MuiThemeProvider,
} from "@material-ui/core";
import { Inbox as InboxIcon, Send as SendIcon } from "@material-ui/icons";

import { RouteEntry } from "../../routes";
import { blueTheme, redTheme, useStyles } from "./PaperCraneSpace.style";
import { FeatureContainer } from "../../common/components/FeatureContainer";
import { useRenderRoutes } from "../../hooks/useRenderRoutes";
import clsx from "clsx";

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
        <ListItem className={clsx(classes.noPadding, classes.listItem)}>
          <MuiThemeProvider theme={redTheme}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
            >
              Compose
            </Button>
          </MuiThemeProvider>
        </ListItem>
        <ListItem className={clsx(classes.noPadding, classes.listItem)}>
          <MuiThemeProvider theme={blueTheme}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
            >
              Search
            </Button>
          </MuiThemeProvider>
        </ListItem>
        <ListItem button className={classes.listItem}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="New Msgs" />
        </ListItem>
        <ListItem button className={classes.listItem}>
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText primary="Sent Msgs" />
        </ListItem>
      </List>
      <FeatureContainer className={classes.content} fullHeight>
        {renderRoutes()}
      </FeatureContainer>
    </div>
  );
};

export { PaperCraneSpace };
