import React from "react";
import { makeStyles } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";

import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  appBar: {
    flexGrow: 1,
    height: 10,
  },
}));

const AppBar = () => {
  const classes = useStyles();
  return (
    <div className={classes.appBar}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6">Gif It Up!</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default AppBar;
