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
                  <Typography gutterBottom variant="subtitle1">
                    Blue Colored Cranes
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" gutterBottom>
                    Effective period: forever
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" color="textSecondary">
                    ID: 12138b
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Button className={classes.button}>Purchase</Button>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">500 Coins</Typography>
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
                  <Typography gutterBottom variant="subtitle1">
                    Red Colored Cranes
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" gutterBottom>
                    Effective period: forever
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" color="textSecondary">
                    ID: 12138r
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Button className={classes.button}>Purchase</Button>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">500 Coins</Typography>
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
                  <Typography gutterBottom variant="subtitle1">
                    Green Colored Cranes
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" gutterBottom>
                    Effective period: forever
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" color="textSecondary">
                    ID: 12138g
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Button className={classes.button}>Purchase</Button>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">500 Coins</Typography>
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
                  <Typography gutterBottom variant="subtitle1">
                    Yellow Colored Cranes
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" gutterBottom>
                    Effective period: forever
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" color="textSecondary">
                    ID: 12138y
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Button className={classes.button}>Purchase</Button>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">500 Coins</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default userStore;
