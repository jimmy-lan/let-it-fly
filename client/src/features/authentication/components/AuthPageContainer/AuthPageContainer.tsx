/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-28
 * Description:
 *    Background container for authentication pages.
 */

import React, { FunctionComponent, PropsWithChildren } from "react";
import { Paper } from "@material-ui/core";

import { GridImageCard } from "../GridImageCard";
import authenticationImage from "../../../../images/authentication-image.jpg";
import { useStyles } from "./AuthPageContainer.style";

interface OwnProps {}

type Props = OwnProps;

const AuthPageContainer: FunctionComponent<Props> = ({
  children,
}: PropsWithChildren<Props>) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <GridImageCard imageSrc={authenticationImage} className={classes.card}>
        <div className={classes.container}>{children}</div>
      </GridImageCard>
    </Paper>
  );
};

export { AuthPageContainer };
