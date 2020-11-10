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
import { useHistory } from "../../hooks/useHistory";

interface OwnProps {}

type Props = OwnProps;

const UserHome: FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const history = useHistory();

  // When one image card is being hovered over, I want to fade
  // other image cards to create the visual effect.
  const [shouldImageCardFade, setShouldImageCardFade] = useState(false);

  const handleImageCardMouseEnter = () => {
    setShouldImageCardFade(true);
  };

  const handleImageCardMouseLeave = () => {
    setShouldImageCardFade(false);
  };

  const handleEnterMySpaceClick = () => {
    history.push("/my/space/inbox");
  };

  const handleComposeClick = () => {
    history.push("/my/space/compose");
  };

  return (
    <FeatureContainer
      fullHeight
      className={clsx(classes.root, {
        [classes.rootFade]: shouldImageCardFade,
      })}
    >
      <Grid container className={classes.optionsGrid} spacing={0}>
        <Grid item md={1} />
        <Grid item md={5} sm={12} xs={12} className={classes.optionContainer}>
          <AnimatedImageCardButton
            className={clsx(classes.imageCardButton, "animatedCard")}
            imageSrc={paperCraneSpaceImage}
            imageAlt="Girl folding a paper crane in front of a work station"
            title="Enter My Space"
            shouldFade={shouldImageCardFade}
            onMouseEnter={handleImageCardMouseEnter}
            onMouseLeave={handleImageCardMouseLeave}
            onClick={handleEnterMySpaceClick}
          />
        </Grid>
        <Grid item md={5} sm={12} xs={12} className={classes.optionContainer}>
          <AnimatedImageCardButton
            className={clsx(classes.imageCardButton, "animatedCard")}
            imageSrc={paperCraneComposeImage}
            imageAlt="Smiling boy putting a paper crane into a mailbox"
            title="Compose Paper Crane"
            shouldFade={shouldImageCardFade}
            onMouseEnter={handleImageCardMouseEnter}
            onMouseLeave={handleImageCardMouseLeave}
            onClick={handleComposeClick}
          />
        </Grid>
        <Grid item md={1} />
      </Grid>
    </FeatureContainer>
  );
};

export { UserHome };
