/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-05
 */
import React, { FunctionComponent, PropsWithChildren } from "react";
import clsx from "clsx";
import { Button, ListItem, MuiThemeProvider, Theme } from "@material-ui/core";
import { useStyles } from "./list.style";

interface OwnProps {
  theme: Theme;
  className?: string;
}

type Props = OwnProps;

const ListButtonWithTheme: FunctionComponent<Props> = ({
  theme,
  className,
  children,
}: PropsWithChildren<Props>) => {
  const classes = useStyles();

  return (
    <ListItem className={clsx(className, classes.noPadding)}>
      <MuiThemeProvider theme={theme}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
        >
          {children}
        </Button>
      </MuiThemeProvider>
    </ListItem>
  );
};

export { ListButtonWithTheme };
