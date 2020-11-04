/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-03
 * Description: Account settings page for users using the app.
 */
import React, { ChangeEvent, FunctionComponent, useState } from "react";
import { FeatureContainer } from "../../common/components/FeatureContainer";
import { TabsContainer } from "./components/Tabs/TabsContainer";
import { TabPanel } from "./components/Tabs/TabPanel";
import { PersonalInfoPanel } from "./components/PersonalInfoPanel/PersonalInfoPanel";
import { AvatarButton } from "./components/AvatarButton/AvatarButton";
import { useStyles } from "./AccountSettings.style";

interface OwnProps {}

type Props = OwnProps;

enum AccountSettingsTabId {
  personalInfo,
  contactInfo,
  profileData,
  authentication,
}

const accountSettingsTabLabels = [
  "Personal Info",
  "Contact Info",
  "Profile Data",
  "Authentication",
];

const AccountSettings: FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const [displayId, setDisplayId] = useState<AccountSettingsTabId>(
    AccountSettingsTabId.personalInfo
  );

  const handleTabChange = (event: ChangeEvent<{}>, nextIndex: number) => {
    setDisplayId(nextIndex);
  };

  return (
    <FeatureContainer fullHeight className={classes.root}>
      <AvatarButton
        className={classes.avatarButton}
        avatarSrc="https://via.placeholder.com/150/0000FF/808080?Text=User"
      />
      <TabsContainer
        tabLabels={accountSettingsTabLabels}
        selectedIndex={displayId}
        onTabChange={handleTabChange}
        className={classes.tabsContainer}
      >
        <TabPanel id={AccountSettingsTabId.personalInfo} displayId={displayId}>
          <PersonalInfoPanel />
        </TabPanel>
        <TabPanel id={AccountSettingsTabId.contactInfo} displayId={displayId}>
          Contact Info
        </TabPanel>
        <TabPanel id={AccountSettingsTabId.profileData} displayId={displayId}>
          Profile Data
        </TabPanel>
        <TabPanel
          id={AccountSettingsTabId.authentication}
          displayId={displayId}
        >
          Authentication
        </TabPanel>
      </TabsContainer>
    </FeatureContainer>
  );
};

export { AccountSettings };
