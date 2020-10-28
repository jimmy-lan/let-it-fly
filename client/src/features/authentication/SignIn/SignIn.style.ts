import { makeStyles } from "@material-ui/core/styles";
import { createStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100vw",
      height: "100vh",
      backgroundColor: "#1a2038",
    },
    card: {
      width: "100%",
      maxWidth: 800,
      borderRadius: 12,
      margin: theme.spacing(1),
    },
    signInForm: {
      display: "flex",
      alignItem: "center",
      justifyContent: "flex-start",
      flexDirection: "column",
    },
    signInFormContainer: {
      width: "100%",
      height: "100%",
      padding: theme.spacing(5),
    },
    emailField: {
      width: "100%",
      marginBottom: theme.spacing(2.5),
    },
    passwordField: {
      marginBottom: theme.spacing(2),
    },
    userAgreementCheckbox: {
      marginBottom: theme.spacing(2),
    },
    controlsContainer: {
      display: "flex",
      alignItem: "center",
      justifyContent: "flex-start",
      marginBottom: theme.spacing(1),
    },
    controlsContainerText: {
      alignSelf: "center",
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(1),
    },
    controlsContainerButton: {
      textTransform: "none",
    },
    forgotPasswordButton: {
      padding: theme.spacing(1),
    },
    mobileFormHeaderContainer: {
      marginBottom: theme.spacing(2.5),
    },
    mobileFormHeader: {
      marginBottom: theme.spacing(1.5),
    },
  })
);
