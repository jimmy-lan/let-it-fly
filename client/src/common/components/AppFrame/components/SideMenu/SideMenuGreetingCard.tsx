/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-01
 * Description: Greeting card displayed in the side menu.
 */
import React, { FunctionComponent } from "react";
import { Send as PaperCraneIcon } from "@material-ui/icons";
import { Typography } from "@material-ui/core";
import { useStyles } from "./SideMenu.style";

interface OwnProps {
  className?: string;
}

type Props = OwnProps;

const SideMenuGreetingCard: FunctionComponent<Props> = ({
  className,
}: Props) => {
  const classes = useStyles();
  return (
    <div className={className}>
      <PaperCraneIcon className={classes.logo} />
      <div>
        <Typography variant="subtitle2">Welcome,</Typography>
        <Typography variant="subtitle1" className={classes.nameLabel}>
          William Joyce!
        </Typography>
      </div>
    </div>
  );
};

export { SideMenuGreetingCard };
