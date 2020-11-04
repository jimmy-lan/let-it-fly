/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-03
 */
import React, { FunctionComponent } from "react";
import { Divider, Typography } from "@material-ui/core";
import { useStyles } from "./FormHeader.style";

interface OwnProps {
  title: string;
}

type Props = OwnProps;

const FormHeader: FunctionComponent<Props> = ({ title }: Props) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h6" className={classes.title}>
        {title}
      </Typography>
      <Divider className={classes.divider} />
    </>
  );
};

export { FormHeader };
