import React, { useEffect } from "react";
import { Button } from "@material-ui/core";
import { myStyles } from "./storeStyle";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { uid } from "uid";

export default function UserStoreItem({ getData }) {
  const { useState } = React;
  const [data, setData] = useState([]);

  useEffect(() => {
    getData()
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [getData]);

  const classes = myStyles();

  if (!data.length) return <span>loading...</span>;

  return data.map((entry) => (
    <Paper elevation={2} className={classes.paper} key={uid()}>
      <Grid container direction="row" spacing={2}>
        <Grid item>
          <SendOutlinedIcon className={classes[entry.color]}></SendOutlinedIcon>
        </Grid>
        <Grid item xs sm container>
          <Grid item xs container direction="column">
            <Grid item xs container direction="column">
              <Grid item>
                <Typography gutterBottom variant="h6">
                  {entry.itemName}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">{entry.itemDesc}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">{entry.price}</Typography>
            <Button className={classes.button}>Purchase</Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  ));
}
