/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-03
 */
import React, { FunctionComponent } from "react";
import { Divider, Typography } from "@material-ui/core";
import { useStyles } from "./FormHeader.style";

interface OwnProps {
  title: string;
  className?: string;
}

type Props = OwnProps;

const FormHeader: FunctionComponent<Props> = ({ title, className }: Props) => {
  const classes = useStyles();

  return (
    <div className={className}>
      <Typography variant="h6" className={classes.title}>
        {title}
      </Typography>
      <Divider />
    </div>
  );
};

export { FormHeader };
