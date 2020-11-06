/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-30
 * Description: Home page for regular user.
 */
import React, { FunctionComponent, useState } from "react";
import { Grid, Paper } from "@material-ui/core";

import { useStyles } from "./AdminHome.style";

import paperCraneComposeImage from "../../images/paper-crane-compose.jpg";
import paperCraneSpaceImage from "../../images/paper-crane-space.jpg";
import { AnimatedImageCardButton } from "./components/AnimatedImageCardButton";
import clsx from "clsx";
import { Link } from "../../common";

interface OwnProps { }

type Props = OwnProps;

const AdminHome: FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  // When one image card is being hovered over, I want to fade
  // other image cards to create the visual effect.
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
      <Grid container className={classes.optionsGrid} spacing={0}>
        <Grid item className={classes.optionContainer}>
          <Link to={"./../my/logTable"}>
            <AnimatedImageCardButton
              className={clsx(classes.imageCardButton, "animatedCard")}
              imageSrc={paperCraneSpaceImage}
              imageAlt="Girl folding a paper crane in front of a work station"
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
              imageSrc={paperCraneComposeImage}
              imageAlt="Smiling boy putting a paper crane into a mailbox"
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
              imageSrc={paperCraneSpaceImage}
              imageAlt="Girl folding a paper crane in front of a work station"
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
              imageSrc={paperCraneComposeImage}
              imageAlt="Smiling boy putting a paper crane into a mailbox"
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
