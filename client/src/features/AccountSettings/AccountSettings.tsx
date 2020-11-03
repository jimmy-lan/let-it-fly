/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-03
 * Description: Account settings page for users using the app.
 */
import React, { ChangeEvent, FunctionComponent, useState } from "react";
import { FeatureContainer } from "../../common/components/FeatureContainer";
import { TabsContainer } from "./components/Tabs/TabsContainer";
import { TabPanel } from "./components/Tabs/TabPanel";
import { useStyles } from "./AccountSettings.style";

interface OwnProps {}

type Props = OwnProps;

enum AccountSettingsTabId {
  authentication,
  personalInfo,
  contactInfo,
  profileData,
}

const accountSettingsTabLabels = [
  "Authentication",
  "Personal Info",
  "Contact Info",
  "Profile Data",
];

const AccountSettings: FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const [displayId, setDisplayId] = useState<AccountSettingsTabId>(
    AccountSettingsTabId.authentication
  );

  const handleTabChange = (event: ChangeEvent<{}>, nextIndex: number) => {
    setDisplayId(nextIndex);
  };

  return (
    <FeatureContainer fullHeight>
      <TabsContainer
        tabLabels={accountSettingsTabLabels}
        selectedIndex={displayId}
        onTabChange={handleTabChange}
        className={classes.tabsContainer}
      >
        <TabPanel
          id={AccountSettingsTabId.authentication}
          displayId={displayId}
        >
          Authentication
        </TabPanel>
        <TabPanel id={AccountSettingsTabId.personalInfo} displayId={displayId}>
          Personal Info
        </TabPanel>
        <TabPanel id={AccountSettingsTabId.contactInfo} displayId={displayId}>
          Contact Info
        </TabPanel>
        <TabPanel id={AccountSettingsTabId.profileData} displayId={displayId}>
          Profile Data
        </TabPanel>
      </TabsContainer>
    </FeatureContainer>
  );
};

export { AccountSettings };
