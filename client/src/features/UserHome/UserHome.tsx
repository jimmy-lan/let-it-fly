/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-30
 * Description: Home page for regular user.
 */
import React, { FunctionComponent } from "react";
import { useStyles } from "./UserHome.style";
import { FeatureContainer } from "../../common/components/FeatureContainer";
import { Grid } from "@material-ui/core";

interface OwnProps {}

type Props = OwnProps;

const UserHome: FunctionComponent<Props> = (props) => {
  const classes = useStyles();

  return (
    <FeatureContainer fullHeight className={classes.root}>
      <Grid container className={classes.optionsContainer}>
        <Grid item>Space</Grid>
        <Grid item>Compose</Grid>
      </Grid>
    </FeatureContainer>
  );
};

export { UserHome };
