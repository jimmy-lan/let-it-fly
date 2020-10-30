import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    signUpForm: {
      display: "flex",
      alignItem: "center",
      justifyContent: "flex-start",
      flexDirection: "column",
    },
    emailField: {
      width: "100%",
      marginBottom: theme.spacing(2.5),
    },
    passwordField: {
      marginBottom: theme.spacing(2.5),
    },
    confirmPasswordField: {
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
  })
);
