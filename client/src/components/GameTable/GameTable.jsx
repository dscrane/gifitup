import React from "react";
import { makeStyles } from "@material-ui/core";

import TableContainer from "./TableContainer";

const useStyles = makeStyles(() => ({
  gameTable: {
    height: "100vh",
  },
}));

const GameTable = () => {
  const classes = useStyles();

  return (
    <div className={classes.gameTable}>
      <TableContainer />
    </div>
  );
};

export default GameTable;
