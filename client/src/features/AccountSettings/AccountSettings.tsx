/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-03
 * Description: Account settings page for users using the app.
 */
import React, { ChangeEvent, FunctionComponent, useState } from "react";
import { FeatureContainer } from "../../common/components/FeatureContainer";
import { TabsContainer } from "./components/Tabs/TabsContainer";
import { TabPanel } from "./components/Tabs/TabPanel";
import { PersonalInfoPanel } from "./components/tabPanels/PersonalInfoPanel";
import { AvatarButton } from "./components/AvatarButton/AvatarButton";
import { useStyles } from "./AccountSettings.style";
import { Container } from "@material-ui/core";
import { ContactInfoPanel } from "./components/tabPanels/ContactInfoPanel";
import { ProfilePanel } from "./components/tabPanels/ProfilePanel";

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
      <Container>
        <AvatarButton className={classes.avatarButton} avatarSrc="" />
        <TabsContainer
          tabLabels={accountSettingsTabLabels}
          selectedIndex={displayId}
          onTabChange={handleTabChange}
          className={classes.tabsContainer}
        >
          <TabPanel
            id={AccountSettingsTabId.personalInfo}
            displayId={displayId}
          >
            <PersonalInfoPanel />
          </TabPanel>
          <TabPanel id={AccountSettingsTabId.contactInfo} displayId={displayId}>
            <ContactInfoPanel />
          </TabPanel>
          <TabPanel id={AccountSettingsTabId.profileData} displayId={displayId}>
            <ProfilePanel />
          </TabPanel>
          <TabPanel
            id={AccountSettingsTabId.authentication}
            displayId={displayId}
          >
            Authentication
          </TabPanel>
        </TabsContainer>
      </Container>
    </FeatureContainer>
  );
};

export { AccountSettings };
