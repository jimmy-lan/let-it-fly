/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-30
 * Description: Home page for regular user.
 */
import React, { FunctionComponent } from "react";
import { Grid } from "@material-ui/core";

import { useStyles } from "./UserHome.style";
import { FeatureContainer } from "../../common/components/FeatureContainer";
import { ImageCardButton } from "./components/ImageCardButton";
import paperCraneComposeImage from "../../images/paper-crane-compose.jpg";
import paperCraneSpaceImage from "../../images/paper-crane-space.jpg";

interface OwnProps {}

type Props = OwnProps;

const UserHome: FunctionComponent<Props> = (props) => {
  const classes = useStyles();

  return (
    <FeatureContainer fullHeight className={classes.root}>
      <Grid container className={classes.optionsGrid} spacing={0}>
        <Grid item md={6} sm={12} xs={12} className={classes.optionContainer}>
          <ImageCardButton
            className={classes.imageCardButton}
            imageSrc={paperCraneSpaceImage}
            imageAlt="Image showing girl folding a paper crane in front of a work station"
            title="Enter My Space"
          />
        </Grid>
        <Grid item md={6} sm={12} xs={12} className={classes.optionContainer}>
          <ImageCardButton
            className={classes.imageCardButton}
            imageSrc={paperCraneComposeImage}
            imageAlt="Image showing girl folding a paper crane in front of a work station"
            title="Compose a Paper Crane"
          />
        </Grid>
      </Grid>
    </FeatureContainer>
  );
};

export { UserHome };
