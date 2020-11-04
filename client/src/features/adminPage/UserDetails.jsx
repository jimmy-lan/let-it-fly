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
                    defaultValue={rowdata.nickname}
                    fullWidth
                    onChange={event => {
                        console.log(event.target.value)
                        const index = rowData.tableData.id;
                        const newData = rowData;
                        newData.nickname = event.target.value;
                        const updateData = [...data];
                        updateData[index] = newData;
                        setData([...updateData]);
                    }}
                />
            </div>
            <div>
                <TextField
                    required
                    id="email"
                    name="email"
                    label="Email"
                    fullWidth
                    defaultValue={rowData.email}
                    onChange={event => {
                        console.log(event.target.value)
                        const index = rowData.tableData.id;
                        const newData = rowData;
                        newData.email = event.target.value;
                        const updateData = [...data];
                        updateData[index] = newData;
                        setData([...updateData]);
                    }}
                />
            </div>
            <div>
                <TextField
                    id="birthday"
                    name="birthday"
                    label="Birthday"
                    fullWidth
                    defaultValue={rowData.birthday}
                    onChange={event => {
                        console.log(event.target.value)
                        const index = rowData.tableData.id;
                        const newData = rowData;
                        newData.birthday = event.target.value;
                        const updateData = [...data];
                        updateData[index] = newData;
                        setData([...updateData]);
                    }}
                />
            </div>
            <div>
                <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First name"
                    className={classes.parallel}
                    defaultValue={rowData.firstname}
                    onChange={event => {
                        console.log(event.target.value)
                        const index = rowData.tableData.id;
                        const newData = rowData;
                        newData.firstname = event.target.value;
                        const updateData = [...data];
                        updateData[index] = newData;
                        setData([...updateData]);
                    }}
                />
                <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Last name"
                    className={classes.parallel}
                    defaultValue={rowData.lastname}
                    onChange={event => {
                        console.log(event.target.value)
                        const index = rowData.tableData.id;
                        const newData = rowData;
                        newData.lastname = event.target.value;
                        const updateData = [...data];
                        updateData[index] = newData;
                        setData([...updateData]);
                    }}
                />
            </div>
            <div>
            <TextField
                id="descirption"
                label="Descirption"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                defaultValue={rowData.description}
                onChange={event => {
                    console.log(event.target.value)
                    const index = rowData.tableData.id;
                    const newData = rowData;
                    newData.description = event.target.value;
                    const updateData = [...data];
                    updateData[index] = newData;
                    setData([...updateData]);
                }}
            />
            </div>
            <div>
            <TextField
                id="contact"
                label="Contact Information"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                defaultValue={rowData.contactinformation}
                onChange={event => {
                    console.log(event.target.value)
                    const index = rowData.tableData.id;
                    const newData = rowData;
                    newData.contactinformation = event.target.value;
                    const updateData = [...data];
                    updateData[index] = newData;
                    setData([...updateData]);
                }}
            />
            </div>
            <div>
            <TextField
                id="interest"
                label="Interest"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                defaultValue={rowData.interest}
                onChange={event => {
                    console.log(event.target.value)
                    const index = rowData.tableData.id;
                    const newData = rowData;
                    newData.interest = event.target.value;
                    const updateData = [...data];
                    updateData[index] = newData;
                    setData([...updateData]);
                }}
            />
            </div>
            {/*<div className={classes.buttons}>*/}
            {/*    <Button variant="outlined">Cancel</Button>*/}
            {/*    <Button*/}
            {/*        variant="contained"*/}
            {/*        color="primary"*/}
            {/*        startIcon={<SaveIcon />}*/}
            {/*    >*/}
            {/*        Save*/}
            {/*    </Button>*/}
            {/*</div>*/}
        </form>

    </React.Fragment>
  );
}
