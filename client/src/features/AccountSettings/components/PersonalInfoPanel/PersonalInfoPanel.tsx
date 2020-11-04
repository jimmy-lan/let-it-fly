/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-03
 */
import React, { FunctionComponent } from "react";
import { useStyles } from "./PersonalInfoPanel.style";
import { Grid, TextField, Typography, Divider } from "@material-ui/core";

interface OwnProps {}

type Props = OwnProps;

const PersonalInfoPanel: FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  return (
    <form autoComplete="off" className={classes.root}>
      <Typography variant="h6" className={classes.title}>
        Personal Information
      </Typography>
      <Divider className={classes.divider} />
      <Grid container spacing={3} className={classes.nameGrid}>
        <Grid item md={6} sm={12} xs={12}>
          <TextField label="First Name" variant="outlined" fullWidth />
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <TextField label="Last Name" variant="outlined" fullWidth />
        </Grid>
      </Grid>
    </form>
  );
};

export { PersonalInfoPanel };
