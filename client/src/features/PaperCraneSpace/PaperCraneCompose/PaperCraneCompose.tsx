/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-09
 */
import React, { FunctionComponent } from "react";
import { FeatureContainerWithHeader } from "../components/FeatureContainerWithHeader/FeatureContainerWithHeader";
import { TextField } from "@material-ui/core";
import { useStyles } from "./PaperCraneCompose.style";

interface OwnProps {}

type Props = OwnProps;

const PaperCraneCompose: FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  return (
    <FeatureContainerWithHeader headerTitle="Compose">
      <form autoComplete="off" className={classes.form}>
        <TextField
          label="Title"
          variant="outlined"
          className={classes.formField}
        />
      </form>
    </FeatureContainerWithHeader>
  );
};

export { PaperCraneCompose };
