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
  onClick?: () => void;
  className?: string;
}

type Props = OwnProps;

const ListButtonWithTheme: FunctionComponent<Props> = ({
  theme,
  onClick,
  className,
  children,
}: PropsWithChildren<Props>) => {
  const classes = useStyles();

  return (
    <ListItem onClick={onClick} className={clsx(className, classes.noPadding)}>
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
