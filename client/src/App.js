import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { Sidebar } from "./components/Sidebar";
import { AppBar } from "./components/AppBar";
import { GameTable } from "./components/GameTable";
import CssBaseline from "@material-ui/core/CssBaseline";

const useStyles = makeStyles((theme) => ({
  appContainer: {
    background: "red",
  },
}));

const params = {
  limit: 100,
  offset: 25,
  rating: "r",
  lang: "en",
};

const key = "KfcOPY2n2I7M8gglwTK5HkWkTS1bgFkH";
const key2 = "ENiNvfm90KcAX4An2sM8ajbvtg3R6v18";

const App = () => {
  const classes = useStyles();

  return (
    <div>
      hello world
      {/*      <CssBaseline />
      <Grid container className={classes.appContainer} spacing={2}>
        <Grid item xs={2} xl={2}>
          <AppBar />
        </Grid>
        <Grid item xs={10} xl={10}>
          <Sidebar />
        </Grid>
        <GameTable />
      </Grid>*/}
    </div>
  );
};

export default App;
