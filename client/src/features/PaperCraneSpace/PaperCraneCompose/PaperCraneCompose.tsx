/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-09
 */
import React, { FunctionComponent } from "react";
import { FeatureContainerWithHeader } from "../components/FeatureContainerWithHeader/FeatureContainerWithHeader";

interface OwnProps {}

type Props = OwnProps;

const PaperCraneCompose: FunctionComponent<Props> = (props) => {
  return (
    <FeatureContainerWithHeader headerTitle="Compose"></FeatureContainerWithHeader>
  );
};

export { PaperCraneCompose };
