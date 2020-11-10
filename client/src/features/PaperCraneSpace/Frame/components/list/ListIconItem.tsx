/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-05
 */
import React, { FunctionComponent, ReactNode } from "react";
import { ListItemIcon, ListItemText, ListItem } from "@material-ui/core";

interface OwnProps {
  text: string;
  icon: ReactNode;
  onClick?: () => void;
  className?: string;
}

type Props = OwnProps;

const ListIconItem: FunctionComponent<Props> = ({
  text,
  icon,
  onClick,
  className,
}: Props) => {
  return (
    <ListItem button onClick={onClick} className={className}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );
};

export { ListIconItem };
