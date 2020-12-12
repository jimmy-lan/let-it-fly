import React, { Component, useEffect, useRef } from "react";
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
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { get } from "http";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

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

export default function Usertable({ columns, getData, title, expand }) {
  const { useState } = React;

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  }));
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
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              setData([...data, newData]);

              resolve();
            }, 1000);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              setData([...dataUpdate]);

              resolve();
            }, 1000);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataDelete = [...data];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              setData([...dataDelete]);

              resolve();
            }, 1000);
          }),
      }}
      detailPanel={(rowData) => {
        return (
          <div className={classes.root}>
            <Grid
              container
              spacing={2}
              justify="space-evenly"
              alignItems="center"
            >
              <Grid item xs>
                <TextField
                  id="1"
                  label="Join Date"
                  defaultValue={rowData.joindate}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs>
                <TextField
                  id="2"
                  label="Date of Birth"
                  defaultValue={rowData.dateofbirth}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth={10}
                  id="3"
                  label="Contact info"
                  multiline
                  defaultValue={rowData.contactinformation}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </div>
        );
      }}
    />
  );
}
