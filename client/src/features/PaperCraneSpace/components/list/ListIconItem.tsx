/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-05
 */
import React, { FunctionComponent, ReactNode } from "react";
import { ListItemIcon, ListItemText, ListItem } from "@material-ui/core";

interface OwnProps {
  text: string;
  icon: ReactNode;
  className?: string;
}

type Props = OwnProps;

const ListIconItem: FunctionComponent<Props> = ({
  text,
  icon,
  className,
}: Props) => {
  return (
    <ListItem button className={className}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );
};

export { ListIconItem };
