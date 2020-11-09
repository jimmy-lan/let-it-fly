import React, { FunctionComponent, useState } from "react";
import { Grid, Paper } from "@material-ui/core";
import { useStyles } from "./AdminHome.style";
import activityImage from "../../images/activity-log.jpg";
import userImage from "../../images/users.jpg";
import cranesImages from "../../images/cranes.jpg";
import storeImage from "../../images/store.jpg";
import { AnimatedImageCardButton } from "../UserHome/components/AnimatedImageCardButton";
import clsx from "clsx";
import { Link } from "../../common";

interface OwnProps { }

type Props = OwnProps;

const AdminHome: FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const [shouldImageCardFade, setShouldImageCardFade] = useState(false);

  const handleImageCardMouseEnter = () => {
    setShouldImageCardFade(true);
  };

  const handleImageCardMouseLeave = () => {
    setShouldImageCardFade(false);
  };

  return (
    <Paper className={classes.root}
    >
      <Grid container className={classes.optionsGrid} spacing={4}>
        <Grid item className={classes.optionContainer}>
          <Link to={"./../my/logTable"}>
            <AnimatedImageCardButton
              className={clsx(classes.imageCardButton, "animatedCard")}
              imageSrc={activityImage}
              imageAlt="kiwi"
              title="Activity"
              shouldFade={shouldImageCardFade}
              onMouseEnter={handleImageCardMouseEnter}
              onMouseLeave={handleImageCardMouseLeave}
            />
          </Link>
        </Grid>
        <Grid item className={classes.optionContainer}>
          <Link to={"./../my/cranesTable"}>
            <AnimatedImageCardButton
              className={clsx(classes.imageCardButton, "animatedCard")}
              imageSrc={cranesImages}
              imageAlt="pea"
              title="Cranes"
              shouldFade={shouldImageCardFade}
              onMouseEnter={handleImageCardMouseEnter}
              onMouseLeave={handleImageCardMouseLeave}
            />
          </Link>
        </Grid>
        <Grid item className={classes.optionContainer}>
          <Link to={"./../my/usersTable"}>
            <AnimatedImageCardButton
              className={clsx(classes.imageCardButton, "animatedCard")}
              imageSrc={userImage}
              imageAlt="loli"
              title="Users"
              shouldFade={shouldImageCardFade}
              onMouseEnter={handleImageCardMouseEnter}
              onMouseLeave={handleImageCardMouseLeave}
            />
          </Link>
        </Grid>

        <Grid item className={classes.optionContainer}>
          <Link to={"./../my/storeTable"}>
            <AnimatedImageCardButton
              className={clsx(classes.imageCardButton, "animatedCard")}
              imageSrc={storeImage}
              imageAlt="loli"
              title="Store"
              shouldFade={shouldImageCardFade}
              onMouseEnter={handleImageCardMouseEnter}
              onMouseLeave={handleImageCardMouseLeave}
            />
          </Link>
        </Grid>
      </Grid>
    </Paper>
  );
};

export { AdminHome };
