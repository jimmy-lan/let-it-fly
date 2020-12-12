import React, { useEffect, useRef } from "react";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { isEmailPattern, isEqual } from "../../common/util";
import {
  updateUsersTable,
  signupUsersTale,
} from "../../services/serverApi/adminApi.ts";
const tableIcons = {
  Add: AddBox,
  Check: Check,
  Clear: Clear,
  Delete: DeleteOutline,
  DetailPanel: ChevronRight,
  Edit: Edit,
  Export: SaveAlt,
  Filter: FilterList,
  FirstPage: FirstPage,
  LastPage: LastPage,
  NextPage: ChevronRight,
  PreviousPage: ChevronLeft,
  ResetSearch: Clear,
  Search: Search,
  SortArrow: ArrowDownward,
  ThirdStateCheck: Remove,
  ViewColumn: ViewColumn,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  form: {
    "& .MuiTextField-root": {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    lexGrow: 1,
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  parallel: {
    width: "50%",
    padding: 4,
  },
}));
export default function Usertable({ columns, getData, title }) {
  const { useState } = React;

  const classes = useStyles();
  const [data, setData] = useState([]);
  useEffect(() => {
    if (getData) {
      (async () => {
        const { data: dataset } = await getData();
        setData(dataset);
      })();
    }
  }, [getData]);

  const ref = useRef();

  return (
    <MaterialTable
      icons={tableIcons}
      columns={columns}
      title={title}
      data={data}
      tableRef={ref}
      options={{ search: true }}
      editable={
        {
          // onRowAdd: (newData) =>
          //   new Promise((resolve, reject) => {
          //     setTimeout(() => {
          //       setData([...data, newData]);
          //       console.log(newData);
          //       resolve();
          //
          //     }, 1000);
          //   }),
          // onRowUpdate: (newData, oldData) =>
          //   new Promise((resolve, reject) => {
          //     setTimeout(() => {
          //       const dataUpdate = [...data];
          //       const index = oldData.tableData.id;
          //       dataUpdate[index] = newData;
          //       setData([...dataUpdate]);
          //       resolve();
          // let id = dataUpdate[index]['id'];
          // updateUsersTable(id, dataUpdate[index]);
          //   }, 1000);
          // }),
          // onRowDelete: (oldData) =>
          //   new Promise((resolve, reject) => {
          //     setTimeout(() => {
          //       const dataDelete = [...data];
          //       const index = oldData.tableData.id;
          //       dataDelete.splice(index, 1);
          //       setData([...dataDelete]);
          //
          //       resolve();
          //     }, 1000);
          //   }),
        }
      }
      detailPanel={(rowData) => {
        const handleChange = (event) => {
          const attr = event.target.name;
          const index = rowData.tableData.id;
          const newData = rowData;

          if (attr === "firstname") {
            const space = newData.name.search(" ");
            const lastName = newData.name.substring(space, newData.name.length);
            newData.name = event.target.value + lastName;
          }
          if (attr === "lastname") {
            const space = newData.name.search(" ");
            const firstName = newData.name.substring(0, space + 1);
            newData.name = firstName + event.target.value;
          }

          newData[attr] = event.target.value;
          const updateData = [...data];
          updateData[index] = newData;
          setData([...updateData]);
        };

        const error1 = !isEmailPattern(rowData.email);

        if (error1) {
          var emailValid = "Invalid email address";
        } else {
          emailValid = "";
        }

        return (
          <React.Fragment>
            <form className={classes.form} noValidate autoComplete="off">
              <div>
                <TextField
                  required
                  id="nickName"
                  name="nickname"
                  label="Nickname"
                  defaultValue={rowData.nickname}
                  fullWidth
                  onChange={handleChange}
                  error={isEqual(rowData.nickname, "")}
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
                  onChange={handleChange}
                  error={error1}
                  helperText={emailValid}
                />
              </div>
              <div>
                <TextField
                  id="birthday"
                  name="birthday"
                  label="Date Of Birth"
                  fullWidth
                  defaultValue={rowData.birthday}
                  onChange={handleChange}
                />
              </div>
              <div>
                <TextField
                  required
                  id="firstname"
                  name="firstname"
                  label="First name"
                  className={classes.parallel}
                  defaultValue={rowData.firstname}
                  onChange={handleChange}
                  error={isEqual(rowData.firstname, "")}
                />
                <TextField
                  required
                  id="lastname"
                  name="lastname"
                  label="Last name"
                  className={classes.parallel}
                  defaultValue={rowData.lastname}
                  onChange={handleChange}
                  error={isEqual(rowData.lastname, "")}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
                />
              </div>
            </form>
          </React.Fragment>
        );
      }}
      actions={[
        {
          icon: tableIcons.Export,
          tooltop: "save user",
          onClick: (event, rowData) => {
            if (isEqual(rowData.nickname, "")) {
              rowData.nickname = "";
            }
            if (
              isEqual(rowData.nickname, "") ||
              isEqual(rowData.firstname, "") ||
              isEqual(rowData.lastname, "") ||
              !isEmailPattern(rowData.email)
            ) {
              alert("failed");
            } else {
              alert("saved");
            }
          },
        },
      ]}
    />
  );
}
