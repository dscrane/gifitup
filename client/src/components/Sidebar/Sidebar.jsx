import React from "react";
import { makeStyles } from "@material-ui/core";
import SidebarDrawer from "./SidebarDrawer";

const useStyles = makeStyles(() => ({
  sidebar: {
    width: "100%",
    height: "100vh",
  },
}));

const Sidebar = () => {
  const classes = useStyles();
  return (
    <div className={classes.sidebar}>
      <SidebarDrawer />
    </div>
  );
};

export default Sidebar;
