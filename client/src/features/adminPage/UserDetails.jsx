import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
          },
        lexGrow: 1,
        width: "70%",
        marginLeft: "auto",
        marginRight: "auto"
    },
    parallel: {
        width: "50%",
        padding: 4,
    },
    buttons: {
        marginTop: theme.spacing(4),
        float: "right"
    }
  }));

export default function FormPropsTextFields() {
  const classes = useStyles();
  const [data, setData] = useState([]);

  return (
    <React.Fragment>
        <Typography variant="h6" gutterBottom>
            User Profile
        </Typography>
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <TextField
                    required
                    id="nickName"
                    name="nickName"
                    label="Nickname"
                    defaultValue={data.nickName}
                    fullWidth
                />
            </div>
            <div>
                <TextField
                    required
                    id="email"
                    name="email"
                    label="Email"
                    fullWidth
                    defaultValue="abc@mail.com"
                />
            </div>
            <div>
                <TextField
                    id="birthday"
                    name="birthday"
                    label="Birthday"
                    fullWidth
                    defaultValue=""
                />
            </div>
            <div>
                <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First name"
                    className={classes.parallel}
                />
                <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Last name"
                    className={classes.parallel}
                />
            </div>
            <div>
            <TextField
                id="descirption"
                label="Descirption"
                multiline
                rows={4}
                defaultValue="Default Value"
                variant="outlined"
                fullWidth
            />
            </div>
            <div>
            <TextField
                id="contact"
                label="Contact"
                multiline
                rows={4}
                defaultValue="Default Value"
                variant="outlined"
                fullWidth
            />
            </div>
            <div>
            <TextField
                id="interest"
                label="Interest"
                multiline
                rows={4}
                defaultValue="Default Value"
                variant="outlined"
                fullWidth
            />
            </div>
            <div className={classes.buttons}>
                <Button variant="outlined">Cancel</Button>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                >
                    Save
                </Button>
            </div>
        </form>

    </React.Fragment>
  );
}
