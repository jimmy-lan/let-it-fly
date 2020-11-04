/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-04
 * Description:
 *    A disabled email field showing email address of the current user,
 *    along with an "update credentials" button.
 */
import React, { FunctionComponent } from "react";
import {
  Button,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";
import { InfoOutlined as InfoIcon } from "@material-ui/icons";
import clsx from "clsx";
import { useStyles } from "./FormDisabledEmailField.style";

interface OwnProps {
  onUpdateCredentialsClick?: () => void;
  className?: string;
}

type Props = OwnProps;

const FormDisabledEmailField: FunctionComponent<Props> = ({
  onUpdateCredentialsClick,
  className,
}: Props) => {
  const classes = useStyles();
  return (
    <FormControl disabled fullWidth variant="outlined" className={className}>
      <InputLabel htmlFor="outlined-email-field">Email Address</InputLabel>
      <OutlinedInput
        id="outlined-email-field"
        type="email"
        labelWidth={115}
        value="user@user.com"
        endAdornment={
          <InputAdornment position="end">
            <Button onClick={onUpdateCredentialsClick}>
              Update Credentials
            </Button>
          </InputAdornment>
        }
      />
      <div className={classes.infoHelperContainer}>
        <InfoIcon className={clsx(classes.helperIcon, classes.disabled)} />
        <FormHelperText className={classes.infoHelperText}>
          In this version of Let It Fly app, you cannot update your email
          address after sign up.
        </FormHelperText>
      </div>
    </FormControl>
  );
};

export { FormDisabledEmailField };
