/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-30
 * Description: Home page for regular user.
 */
import React, { FunctionComponent, useState } from "react";
import { Grid } from "@material-ui/core";

import { useStyles } from "./UserHome.style";
import { FeatureContainer } from "../../common/components/FeatureContainer";
import paperCraneComposeImage from "../../images/paper-crane-compose.jpg";
import paperCraneSpaceImage from "../../images/paper-crane-space.jpg";
import { AnimatedImageCardButton } from "./components/AnimatedImageCardButton";
import clsx from "clsx";

interface OwnProps {}

type Props = OwnProps;

const UserHome: FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const [shouldImageCardFade, setShouldImageCardFade] = useState(false);

  const handleImageCardMouseEnter = () => {
    setShouldImageCardFade(true);
  };

  const handleImageCardMouseLeave = () => {
    setShouldImageCardFade(false);
  };

  return (
    <FeatureContainer
      fullHeight
      className={clsx(classes.root, {
        [classes.rootFade]: shouldImageCardFade,
      })}
    >
      <Grid container className={classes.optionsGrid} spacing={0}>
        <Grid item md={6} sm={12} xs={12} className={classes.optionContainer}>
          <AnimatedImageCardButton
            className={clsx(classes.imageCardButton, "animatedCard")}
            imageSrc={paperCraneSpaceImage}
            imageAlt="Girl folding a paper crane in front of a work station"
            title="Enter My Space"
            shouldFade={shouldImageCardFade}
            onMouseEnter={handleImageCardMouseEnter}
            onMouseLeave={handleImageCardMouseLeave}
          />
        </Grid>
        <Grid item md={6} sm={12} xs={12} className={classes.optionContainer}>
          <AnimatedImageCardButton
            className={clsx(classes.imageCardButton, "animatedCard")}
            imageSrc={paperCraneComposeImage}
            imageAlt="Smiling boy putting a paper crane into a mailbox"
            title="Compose a Paper Crane"
            shouldFade={shouldImageCardFade}
            onMouseEnter={handleImageCardMouseEnter}
            onMouseLeave={handleImageCardMouseLeave}
          />
        </Grid>
      </Grid>
    </FeatureContainer>
  );
};

export { UserHome };
