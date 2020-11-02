import React, { Component, useEffect } from "react";
import { Button } from "@material-ui/core";
import { myStyles } from "./storeStyle";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const userStore = () => {
  const classes = myStyles();
  return (
    <div>
      <Paper elevation={2} className={classes.paper}>
        <Grid container direction="row" spacing={2}>
          <Grid item className="icon">
            <SendOutlinedIcon className={classes.blue}></SendOutlinedIcon>
          </Grid>
          <Grid item xs sm container>
            <Grid item xs container direction="column">
              <Grid item xs container direction="column">
                <Grid item>
                  <Typography gutterBottom variant="h6">
                    Blue Colored Cranes
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="p">
                    Chill with a blue colored crane after a busy day!
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">500 Coins</Typography>
              <Button className={classes.button}>Purchase</Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Paper elevation={2} className={classes.paper}>
        <Grid container direction="row" spacing={2}>
          <Grid item className="icon">
            <SendOutlinedIcon className={classes.red}></SendOutlinedIcon>
          </Grid>
          <Grid item xs sm container>
            <Grid item xs container direction="column">
              <Grid item xs container direction="column">
                <Grid item>
                  <Typography gutterBottom variant="h6">
                    Red Colored Cranes
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="p">
                    Ignite your passion with a bright red paper crane!
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">500 Coins</Typography>
              <Button className={classes.button}>Purchase</Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Paper elevation={2} className={classes.paper}>
        <Grid container direction="row" spacing={2}>
          <Grid item className="icon">
            <SendOutlinedIcon className={classes.green}></SendOutlinedIcon>
          </Grid>
          <Grid item xs sm container>
            <Grid item xs container direction="column">
              <Grid item xs container direction="column">
                <Grid item>
                  <Typography gutterBottom variant="h6">
                    Green Colored Cranes
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="p">
                    {" "}
                    Feel refreshed using a lime green paper crane!
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">500 Coins</Typography>
              <Button className={classes.button}>Purchase</Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Paper elevation={2} className={classes.paper}>
        <Grid container direction="row" spacing={2}>
          <Grid item className="icon">
            <SendOutlinedIcon className={classes.yellow}></SendOutlinedIcon>
          </Grid>
          <Grid item xs sm container>
            <Grid item xs container direction="column">
              <Grid item xs container direction="column">
                <Grid item>
                  <Typography gutterBottom variant="h6">
                    Yellow Colored Cranes
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="p">
                    Spread your joy with a luminous yellow paper crane!
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">500 Coins</Typography>
              <Button className={classes.button}>Purchase</Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default userStore;
